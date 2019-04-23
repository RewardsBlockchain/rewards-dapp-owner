<template>
  <div>
    <b-row class="ml-2">
      <b-col md="12">
        <p class="text-muted">It should be transferred ownerships of token and vesting contracts to distribution
          contract.</p>
      </b-col>
    </b-row>
    <b-row class="ml-2 mt-2">
      <b-col md="4">
        <b-button class="btn btn-success" @click="transferTokenOwnerShip">Transfer TokenOwnership</b-button>
      </b-col>
      <b-col md="8">
        <p>Owner : {{ownerOfRewardsToken}}
          <i class="fa ml-3"
             :class="{'fa-check-circle-o color-rw-active' : ownerOfRewardsToken === distribution,
                      'fa-times color-rw-error' : ownerOfRewardsToken !== distribution}"
             style="font-size: 20px"></i>
        </p>
      </b-col>
    </b-row>
    <b-row class="ml-2 mt-2">
      <b-col md="4">
        <b-button class="btn btn-success" @click="transferVestingOwnerShip">Transfer VestingVaultOwnership</b-button>
      </b-col>
      <b-col md="8">
        <p>Owner : {{ownerOfVestingVault}}
          <i class="fa ml-3"
             :class="{'fa-check-circle-o color-rw-active' : ownerOfVestingVault === distribution,
                      'fa-times color-rw-error' : ownerOfVestingVault !== distribution}"
             style="font-size: 20px"></i>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import RewardsToken from "../artifacts/RewardsToken";
  import VestingVault from "../artifacts/VestingVault";

  export default {
    name: "transferOwnerShip",
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
      transferTokenOwnerShip() {
        let vm = this;
        Utils.handler(RewardsToken.abi, vm.token).then(controller => {
          controller.handler.transferOwnership(vm.distribution, controller.base, (error, result) => {
            if (!error) {
              console.log(`transaction hash for transferownership of VestingVault: ${result}`);
            }
          })
        })
      },
      transferVestingOwnerShip() {
        let vm = this;
        Utils.handler(VestingVault.abi, vm.vesting).then(controller => {
          controller.handler.transferOwnership(vm.distribution, controller.base, (error, result) => {
            if (!error) {
              console.log(`transaction hash for transferownership of RewardsToken: ${result}`);
            }
          })
        })
      },
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
    },
  }
</script>

<style scoped>

</style>
