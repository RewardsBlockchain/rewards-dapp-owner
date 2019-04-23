<template>
  <div>
    <b-row>
      <b-col md="12">
        <div class="form-group">
          <label class="control-label">VestingVault Contract Address</label>
          <input type="text" class="form-control" v-model="vesting"/>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="12">
        <p>Vested Tokens : <span class="float-right">{{totalVestedTokens}}  <small class="text-muted">RWRDs</small></span></p>
        <p>Locked : <span class="float-right">{{locked}}</span></p>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="6">
        <b-button variant="success" @click="fetchVestedAddresses">Load Addresses</b-button>
      </b-col>
      <b-col md="6">
        <input type="text" class="form-control float-right" v-model="filter"
               placeholder="Search..." style="max-width: 350px"
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <div class="table-responsive mt-3">
          <b-table striped hover show-empty small head-class="txHead" caption-top
                   :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy"
                   :sort-desc.sync="sortDesc" :items="items" :fields="columns"
          >
            <template slot="show_details" slot-scope="row">
              <b-button variant="link" class="px-0 color-fractional-primary" size="sm"
                        @click.stop="toggleRowDetails(row)">
                {{ row.detailsShowing ? 'Hide' : 'Show'}}
              </b-button>
            </template>
            <template slot="row-details" slot-scope="row">
              <b-card>
                <div>
                  <p class="my-0">Total Amounts: {{row.item.value}}
                    <small class="text-muted">RWRDs</small>
                  </p>
                  <p class="my-0">Transferred Amounts: {{row.item.transferred}}
                    <small class="text-muted">RWRDs</small>
                  </p>
                  <div v-if="row.item.level === 1">
                    <p class="my-0">Vesting Start : {{row.item.vestingStart}}</p>
                    <p class="my-0">Vesting Cliff : {{row.item.vestingCliff}} hrs</p>
                    <p class="my-0">Vesting Duration : {{row.item.vestingDuration}} hrs</p>
                  </div>
                  <div v-else>
                    <div v-for="(item, index) in row.item.scheduleTimes" :key="index">
                      <p class="my-0">Vesting Time : {{item}}</p>
                      <p class="my-0">Vesting Amount : {{row.item.scheduleValues[index]}}
                        <small class="text-muted">RWRDs</small>
                      </p>
                    </div>
                  </div>
                </div>
              </b-card>
            </template>
          </b-table>
        </div>
        <div class="form-group float-left">
          <b-form-select :options="pageOptions" v-model="perPage"/>
        </div>
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="justify-content-center"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import VestingVault from "../artifacts/VestingVault";

  export default {
    name: "vestingVault",
    props: {
      vesting: {
        type: String,
      }
    },
    data() {
      return {
        timer: null,
        totalVestedTokens: null,
        locked: null,
        sortBy: 'holderIndex',
        sortDesc: false,
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        filter: '',
        columns: [
          {key: 'index', label: 'No', sortable: true},
          {key: 'address', label: 'Address', sortable: true},
          {key: 'show_details', label: 'Details', sortable: false}
        ],
        pageOptions: [10, 20, 50],
        items: []
      }
    },

    methods: {
      getVestingInfo() {
        let vm = this;
        Utils.handler(VestingVault.abi, vm.vesting).then(controller => {
          controller.handler.totalVestedTokens((error, result) => {
            if (!error) {
              vm.totalVestedTokens = Math.round(Number(result) / Math.pow(10, 18));
            }
          });
        });
        Utils.handler(VestingVault.abi, vm.vesting).then(controller => {
          controller.handler.locked((error, result) => {
            if (!error) {
              vm.locked = result;
            }
          });
        });
      },
      fetchVestedAddresses() {
        let vm = this;
        vm.items = [];
        Utils.handler(VestingVault.abi, vm.vesting).then(controller => {
          controller.handler.returnVestedAddresses((error, result) => {
            if (!error) {
              _.forEach(result, function (address, index) {
                vm.items.push(
                  {
                    index: index + 1,
                    address: address,
                    value: null,
                    level: null,
                    transferred: null,
                    scheduleTimes: [],
                    scheduleValues: [],
                    vestingDuration: null,
                    vestingCliff: null,
                    vestingStart: null,
                  }
                );
              });
              vm.totalRows = vm.items.length;
            }
          });
        });

      },
      fetchGrantInfo(row) {
        let vm = this;
        Utils.handler(VestingVault.abi, vm.vesting).then(controller => {
          controller.handler.returnGrantInfo(row.item.address, (error, result) => {
            if (!error) {
              row.item.value = Math.round(Number(result[0]) / Math.pow(10, 18));
              row.item.vestingStart = moment.unix(Number(result[1])).format('DD-MM-YYYY HH:mm');
              row.item.vestingCliff = Number(result[2]) / 3600;
              row.item.vestingDuration = Number(result[3]) / 3600;
              if (result[4].length > 0) {
                row.item.scheduleTimes = [];
                row.item.scheduleValues = [];
                for (let i = 0; i < result[4].length; i++) {
                  row.item.scheduleTimes.push(moment.unix(Number(result[4][i])).format('DD-MM-YYYY HH:mm'));
                  row.item.scheduleValues.push(Math.round(Number(result[5][i]) / Math.pow(10, 18)));
                }
              }
              row.item.level = Number(result[6]);
              row.item.transferred = Math.round(Number(result[7]) / Math.pow(10, 18));
            }
          });
        });
      },
      toggleRowDetails(row) {
        row.toggleDetails();
        this.fetchGrantInfo(row);
      }
    },
    mounted() {
        let vm = this;
      if (this.vesting) {
        this.getVestingInfo();
      }
        this.timer = setInterval(function () {
          if (vm.vesting) {
            vm.getVestingInfo();
          }
        }, 5000)
    },
    watch: {
      vesting() {
        if (this.vesting) {
          this.getVestingInfo();
        }
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    }
  }
</script>

<style scoped>

</style>
