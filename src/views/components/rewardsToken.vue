<template>
  <div>
    <b-row>
      <b-col md="12">
        <div class="form-group">
          <label class="control-label">RewardsToken Contract Address</label>
          <input type="text" class="form-control" v-model="token"/>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="12">
        <p>Name: <span class="float-right">{{tokenName}}</span></p>
        <p>Symbol: <span class="float-right">{{tokenSymbol}}</span></p>
        <p>Total Supply: <span class="float-right">{{totalSupply}} <small class="text-muted">RWRDs</small></span></p>
        <p>HardCap: <span class="float-right">{{hardCap}} <small class="text-muted">RWRDs</small></span></p>
        <p>Decimals: <span class="float-right">{{tokenDecimal}}</span></p>
        <hr>
        <p>Owner: <span class="float-right">{{owner}}</span></p>
        <p>Mintable: <span class="float-right">{{mintable}}</span></p>
        <p>Frozen: <span class="float-right">{{frozen}}</span></p>
        <hr>
        <p>Your Balance: <span class="float-right">{{balance}} <small class="text-muted">RWRDs</small></span></p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import RewardsToken from "../artifacts/RewardsToken";

  export default {
    name: "rewardsToken",
    props: {
      token: {
        type: String,
      }
    },
    data() {
      return {
        tokenName: null,
        tokenSymbol: null,
        tokenDecimal: null,
        totalSupply: null,
        hardCap: null,
        owner: null,
        mintable: null,
        frozen: null,
        balance: null,
        timer: null,
      }
    },
    methods: {
      getTokenInfo() {
        let vm = this;
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.name((error, result) => {
            if (!error) {
              vm.tokenName = result;
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.symbol((error, result) => {
            if (!error) {
              vm.tokenSymbol = result;
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.decimals((error, result) => {
            if (!error) {
              vm.tokenDecimal = Number(result);
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.totalSupply((error, result) => {
            if (!error) {
              vm.totalSupply = Math.round(Number(result) / Math.pow(10, 18));
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.hardCap((error, result) => {
            if (!error) {
              vm.hardCap = Math.round(Number(result) / Math.pow(10, 18));
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.mintingFinished((error, result) => {
            if (!error) {
              vm.mintable = !result;
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.frozen((error, result) => {
            if (!error) {
              vm.frozen = result;
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.owner((error, result) => {
            if (!error) {
              vm.owner = result;
            }
          });
        });
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.balanceOf(vm.$store.state.web3.coinbase, (error, result) => {
            if (!error) {
              vm.balance = Math.round(Number(result) / Math.pow(10, 18));
            }
          });
        });
      },
    },
    mounted() {
      let vm = this;
      if (this.token) {
        this.getTokenInfo();
      }
      this.timer = setInterval(function () {
        if (vm.token) {
          vm.getTokenInfo();
        }
      }, 5000)
    },
    watch: {
      token() {
        if (this.token) {
          this.getTokenInfo();
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
