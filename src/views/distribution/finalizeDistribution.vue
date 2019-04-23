<template>
  <div class="ml-2">
    <b-row>
      <b-col md="12">
        <p class="text-muted">After finishing distribution, you will not be able to allocate tokens anymore by using
          distribution contract.</p>
        <b-button class="btn btn-success" @click="finalizeDistribution">Finalize Distribution</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col md="12">
        <p class="text-muted">After finishing distribution, it should be transferred ownerships of token and vesting
          contracts to owner address.</p>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col md="4">
        <b-button class="btn btn-success" @click="transferBackTokenOwnerShip">Transfer Back TokenOwnership</b-button>
      </b-col>
      <b-col md="8">
        <p>Owner : {{ownerOfRewardsToken}}
          <i class="fa ml-3"
             :class="{'fa-check-circle-o color-rw-active' : ownerOfRewardsToken === owner,
                      'fa-times color-rw-error' : ownerOfRewardsToken !== owner}"
             style="font-size: 20px"></i>
        </p>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col md="4">
        <b-button class="btn btn-success" @click="transferBackVestingOwnerShip">Transfer Back VestingVaultOwnership
        </b-button>
      </b-col>
      <b-col md="8">
        <p>Owner : {{ownerOfVestingVault}}
          <i class="fa ml-3"
             :class="{'fa-check-circle-o color-rw-active' : ownerOfVestingVault === owner,
                      'fa-times color-rw-error' : ownerOfVestingVault !== owner}"
             style="font-size: 20px"></i>
        </p>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col md="12">
        <p class="text-muted">After lock vault, you will not be able to allocate tokens anymore.</p>
        <b-button class="btn btn-success" @click="lockVestingVault">Lock Vesting Vault</b-button>
        <p class="text-muted mt-3">After burn, the balance of vesting vault will be become zero.</p>
        <b-button class="btn btn-success" @click="burnVestingVault">Burn Remaining Tokens</b-button>
        <p class="text-muted mt-3">After withdraw, remaining tokens will be transferred to owner address</p>
        <b-button class="btn btn-success" @click="withdrawVestingVault">Withdraw Remaining Tokens</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import Distribution from "../artifacts/Distribution";
  import VestingVault from "../artifacts/VestingVault";

  export default {
    name: "finalizeDistribution",
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
      return {}
    },
    methods: {
      async transferBackTokenOwnerShip() {
        Utils.handler(Distribution.abi, this.distribution).then(controller => {
          controller.handler.transferBackTokenOwnership(controller.base,
            (error, result) => {
              if (!error) {
                return result;
              }
            });
        }).catch(e => console.log(e));
      },
      async transferBackVestingOwnerShip() {
        Utils.handler(Distribution.abi, this.distribution).then(controller => {
          controller.handler.transferBackVestingVaultOwnership(controller.base,
            (error, result) => {
              if (!error) {
                return result;
              }
            });
        }).catch(e => console.log(e));
      },
      finalizeDistribution() {
        Utils.handler(Distribution.abi, this.distribution).then(controller => {
          controller.handler.finalize(controller.base,
            (error, result) => {
              if (!error) {
                return result
              }
            });
        }).catch(e => console.log(e));
      },
      lockVestingVault() {
        Utils.handler(VestingVault.abi, this.vesting).then(controller => {
          controller.handler.lockVault(controller.base,
            (error, result) => {
              if (!error) {
                return result
              }
            });
        }).catch(e => console.log(e));
      },
      burnVestingVault() {
        Utils.handler(VestingVault.abi, this.vesting).then(controller => {
          controller.handler.burnRemainingTokens(controller.base,
            (error, result) => {
              if (!error) {
                return result
              }
            });
        }).catch(e => console.log(e));
      },
      withdrawVestingVault() {
        Utils.handler(VestingVault.abi, this.vesting).then(controller => {
          controller.handler.withdraw(controller.base,
            (error, result) => {
              if (!error) {
                return result
              }
            });
        }).catch(e => console.log(e));
      }
    },
    computed: {
      ownerOfRewardsToken() {
        if (!_.isNil(this.$store.state.rewards.tokenOwnership)) {
          return this.$store.state.rewards.tokenOwnership;
        }
      },
      ownerOfVestingVault() {
        if (!_.isNil(this.$store.state.rewards.vestingOwnership)) {
          return this.$store.state.rewards.vestingOwnership;
        }
      },
      owner() {
        if (!_.isNil(this.$store.state.web3.coinbase)) {
          return this.$store.state.web3.coinbase;
        }
      }
    },
  }
</script>

<style scoped>

</style>
