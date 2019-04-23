<template>
  <div>
    <b-row style="margin-top:35px">
      <b-col md="12">
        <b-button class="btn" :class="{'btn-success': stop, 'btn-warn': !stop}" @click="startAllocation"
                  :disabled="!stop">
          Start Allocate
        </b-button>
        <b-button class="btn" :class="{'btn-success': !stop, 'btn-warn': stop}" @click="stopAllocation"
                  :disabled="stop">
          Stop Allocate
        </b-button>
        <!--<b-button class="btn btn-success float-right">Import from CSV</b-button>-->
      </b-col>
    </b-row>
    <div class="table-responsive mt-3">
      <b-table striped hover show-empty small head-class="txHead"
               :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"  :items="items" :fields="columns"
      >
        <template slot="amount" slot-scope="row">{{row.item.amount}}
          <small class="text-muted">RWRDs</small>
        </template>
        <template slot="level" slot-scope="row">{{row.item.level === 1 ? "Default" : "Scheduled"}}</template>
        <template slot="show_details" slot-scope="row">
          <b-button variant="link" class="px-0 color-fractional-primary" size="sm" @click.stop="toggleRowDetails(row)">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <div>
              <b-row v-if="row.item.level == 1">
                <b-col md="4"><p class="my-0">Vesting Duration : {{row.item.vestingStart}}</p></b-col>
                <b-col md="4"><p class="my-0">Vesting Cliff : {{row.item.vestingCliff}} hrs</p></b-col>
                <b-col md="4"><p class="my-0">Vesting Start : {{row.item.vestingDuration}} hrs</p></b-col>
              </b-row>
              <div v-else>
                <b-row v-for="(item, index) in row.item.scheduledList" :key="index">
                  <b-col md="6"><p class="my-0">Vesting Time : {{item.time}}</p></b-col>
                  <b-col md="6">
                    <p class="my-0">Vesting Amount : {{item.amount}}
                      <small class="text-muted">RWRDs</small>
                    </p>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-card>
        </template>
        <template slot="allocated" slot-scope="row">
          <i class="fa ml-3"
             :class="{'fa-check-circle-o color-rw-active' : row.item.allocated,
                      'fa-times color-rw-error' : !row.item.allocated}"
             style="font-size: 20px"></i>
        </template>
        <template slot="remove" slot-scope="row">
          <b-button variant="link" @click="remove(row.item.index)">remove</b-button>
        </template>
      </b-table>
    </div>
    <b-progress :max="items.length" show-progress animated class="my-3">
      <b-progress-bar :value="allocatedInvestors"
                      :label="Number(allocatedInvestors * 100/ items.length ).toFixed(2) + '%'">
      </b-progress-bar>
    </b-progress>
    <div class="form-group float-left">
      <b-form-select :options="pageOptions" v-model="perPage"/>
    </div>
    <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="justify-content-center"/>
    <b-row class="mt-5">
      <b-col md="12"><h6 class="color-rw-error"> * Revoke tokens from vested user </h6></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">Revoke Address</label>
          <input type="text" class="form-control" v-model="revokeAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Revoke Amount</label>
          <input type="number" class="form-control" v-model="revokeAmount"/>
          <span class="form-control-right-box">RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="revokeTokens">Revoke</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  // import {NETWORKS} from "../../utils/constants";
  import Distribution from "../artifacts/Distribution";

  export default {
    name: "vestedList",
    props: {
      vesting: {
        type: String,
      },
      token: {
        type: String,
      },
      distribution: {
        type: String
      }
    },
    data() {
      return {
        sortBy: 'index',
        sortDesc: false,
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        filter: '',
        columns: [
          {key: 'index', label: 'No', sortable: true},
          {key: 'address', label: 'Address', sortable: true},
          {key: 'amount', label: 'Amount', sortable: true},
          {key: 'level', label: 'Type', sortable: true},
          {key: 'show_details', label: 'Show Details', sortable: false},
          {key: 'allocated', label: 'allocated', sortable: true},
          {key: 'remove', label: "Remove", sortable: false}
        ],
        pageOptions: [10, 20, 50],
        items: [],
        allocatedInvestors: 0,
        allocatedIndex: 0,
        stop: true,
        revokeAddress: '',
        revokeAmount: 0,
      }
    },
    methods: {
      toggleRowDetails(row) {
        row.toggleDetails();
      },
      isExistingAddress(item) {
        if (_.indexOf(_.map(this.items, 'address'), item.address) > -1) {
          swal({
            title: "Parse Error",
            text: `Address ${item.address} already exists in the list.`,
            icon: "warning",
          });
          return false;
        }
        return true;
      },
      getAllocateInvestors() {
        this.allocatedInvestors = this.items.reduce(function (count, row) {
          if (row.allocated) {
            return count + 1;
          }
          return count;
        }, 0)
      },
      allocateVestedToken(data) {
        let vm = this;
        let address = data.address;
        let amount = data.amount;
        let start = data.start;
        let duration = data.duration;
        let cliff = data.cliff;
        let scheduleTimes = data.scheduleTimes;
        let scheduleValues = data.scheduleValues;
        let level = data.level;
        return new Promise(function (resolve, reject) {
          Utils.handler(Distribution.abi, vm.distribution).then(controller => {
            controller.handler.allocVestedUser(
              address, amount, start, duration, cliff, scheduleTimes, scheduleValues, level, controller.base,
              (error, result) => {
                if (!error) {
                  let log = controller.handler.TokenMinted({_to: address});
                  log.watch(function (error, res) {
                    if (!error) {
                      console.log(res);
                      resolve();
                    }
                  })
                }
              });

          }).catch(e => reject(e));
        });
      },
      async allocate() {
        this.allocatedIndex = 0;
        while (!this.stop && this.allocatedIndex < this.items.length) {
          try {
            let item = this.items[this.allocatedIndex];
            if (!item.allocated) {
              let data = {
                address: item.address,
                amount: 0,
                start: 0,
                duration: 0,
                cliff: 0,
                scheduleTimes: [],
                scheduleValues: [],
                level: Number(item.level),
              };

              if (item.level === 1) {
                data.amount = Math.floor(item.amount * Math.pow(10, 18));
                data.start = moment(item.vestingStart).unix();
                data.duration = Number(item.vestingDuration) * 3600;
                data.cliff = Number(item.vestingCliff) * 3600;
              } else {
                _.forEach(item.scheduledList, function (schedule) {
                  data.scheduleTimes.push(moment(schedule.time).unix());
                  data.scheduleValues.push(Math.floor(schedule.amount * Math.pow(10, 18)));
                })
              }

              await this.allocateVestedToken(data);
              this.items[this.allocatedIndex].allocated = true;
            }
            this.allocatedIndex++;
          } catch (e) {
            console.log(e);
            swal({
              title: "Transaction Failed",
              text: `Please check the failed transaction manually .`,
              icon: "warning",
            });
          }
        }
      },
      startAllocation() {
        this.stop = false;
        this.allocate();
      },
      stopAllocation() {
        this.stop = true;
      },
      remove(index) {
        index = _.indexOf(_.map(this.items, 'index'), index);
        if (index > -1) {
          this.items.splice(index, 1);
        }
      },
      revokeTokens() {
        let address = this.revokeAddress;
        let amount = Math.floor(this.revokeAmount * Math.pow(10, 18));

        Utils.handler(Distribution.abi, this.distribution).then(controller => {
          controller.handler.revokeTokensFromVestedUser(address, amount, controller.base,
            (error, result) => {
              if (!error) {
                let log = controller.handler.RevokeTokens({_from: address});
                log.watch(function (error, res) {
                  if (!error) {
                    console.log(res);
                  }
                })
              }
            });
        }).catch(e => console.log(e));
      }
    },
    mounted() {
      this.getAllocateInvestors();
      Vue.$on('addDefaultVesting', (item) => {
        if (!this.isExistingAddress(item)) {
          return;
        }
        this.items.push({
          index: this.items.length === 0 ? 1 : this.items[this.items.length - 1].index + 1,
          address: item.address,
          amount: item.amount,
          vestingStart: item.vestingStart,
          vestingCliff: item.vestingCliff,
          vestingDuration: item.vestingDuration,
          level: 1,
          allocated: false,
        });
      });
      Vue.$on('addScheduledVesting', (item) => {
        if (!this.isExistingAddress(item)) {
          return;
        }
        this.items.push({
          index: this.items.length + 1,
          address: item.address,
          amount: item.amount,
          vestingStart: '',
          vestingCliff: '',
          vestingDuration: '',
          scheduledList: item.scheduledList,
          level: 2,
          allocated: false,
        });
      });
    },
    watch: {
      items: {
        handler: function () {
          this.getAllocateInvestors();
        },
        deep: true
      },
    },
    beforeDestroy() {
      Vue.$off("addDefaultVesting");
      Vue.$off("addScheduledVesting");
    }
  }
</script>

<style scoped>

</style>
