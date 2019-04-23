<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-button class="btn" :class="{'btn-success': stop, 'btn-warn': !stop}" @click="startAllocation"
                  :disabled="!stop">
          Start Allocate
        </b-button>
        <b-button class="btn" :class="{'btn-success': !stop, 'btn-warn': stop}" @click="stopAllocation"
                  :disabled="stop">
          Stop Allocate
        </b-button>
        <div id="accept_batch" class="color-rw-active ml-3" @click="batchStatus = !batchStatus">
          <i class="fa" :class="batchStatus ? 'fa-check-circle' : 'fa-times'"></i>
          Accept Batch
        </div>
        <span class="ml-3" v-show="batchStatus">Size: <b-form-input id="batch_size" v-model="batchSize"></b-form-input></span>
      </b-col>
    </b-row>
    <div class="table-responsive mt-3">
      <b-table striped hover show-empty small head-class="txHead"
               :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"  :items="items" :fields="columns"
      >
        <template slot="amount" slot-scope="row">
          {{row.item.amount}}
          <small class="text-muted">RWRDs</small>
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
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  // import {NETWORKS} from "../../utils/constants";
  import Distribution from "../artifacts/Distribution";

  export default {
    name: "normalList",
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
          {key: 'allocated', label: 'Allocated', sortable: true},
          {key: 'remove', label: "Remove", sortable: false}
        ],
        pageOptions: [10, 20, 50],
        items: [],
        allocatedInvestors: 0,
        allocatedIndex: 0,
        stop: true,
        firstTime: true,
        batchStatus: false,
        batchSize: 5,
      }
    },
    methods: {
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
      allocateManualToken(data) {
        let vm = this;
        let address = data.address;
        let amount = data.amount;
        return new Promise(function (resolve, reject) {
          Utils.handler(Distribution.abi, vm.distribution).then(controller => {
            controller.handler.allocNormalUser(
              address, amount, controller.base,
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
      allocateManualBatchToken(data) {
        let vm = this;
        let addresses = data.addresses;
        let amounts = data.amounts;
        return new Promise(function (resolve, reject) {
          Utils.handler(Distribution.abi, vm.distribution).then(controller => {
            controller.handler.allocNormalUsers(
              addresses, amounts, controller.base,
              (error, result) => {
                if (!error) {
                  let log = controller.handler.TokenMinted();
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
        let batchAddresses = [];
        let batchAmounts = [];
        let batchIndexes = [];

        while (!this.stop && this.allocatedIndex < this.items.length) {
          try {
            let item = this.items[this.allocatedIndex];
            if (!item.allocated) {
              if (this.batchStatus) {
                batchAddresses.push(item.address);
                batchAmounts.push(Math.floor(item.amount * Math.pow(10, 18)));
                batchIndexes.push(this.allocatedIndex);
                if (this.batchSize <= batchAddresses.length || this.allocatedIndex === (this.items.length - 1)) {
                  await this.allocateManualBatchToken({
                    addresses: batchAddresses,
                    amounts: batchAmounts
                  });
                  batchIndexes.map((index) => {
                    this.items[index].allocated = true;
                  });
                  batchAddresses = [];
                  batchAmounts = [];
                  batchIndexes = [];
                }
              } else {
                await this.allocateManualToken({
                  address: item.address,
                  amount: Math.floor(item.amount * Math.pow(10, 18))
                });
                this.items[this.allocatedIndex].allocated = true;
              }
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
      addToList(item) {
        if (!this.isExistingAddress(item)) {
          return;
        }
        this.items.push({
          index: this.items.length === 0 ? 1 : this.items[this.items.length - 1].index + 1,
          address: item.address,
          amount: item.amount,
          allocated: false,
        });
      }
    },
    mounted() {
      this.getAllocateInvestors();
      Vue.$on('addManualAlloc', (payload) => {
        this.addToList(payload);
      });
      Vue.$on('addManualBatchAlloc', (payload) => {
        for (let i = 0; i < payload.addresses.length; i++) {
          this.addToList({address: payload.addresses[i], amount: payload.amounts[i]});
        }
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
      Vue.$off("addManualAlloc");
    }
  }
</script>

<style scoped>
  #accept_batch {
    display: inline-block;
    cursor: pointer;
  }

  #batch_size {
    display: inline-block;
    width: 80px;
  }
</style>
