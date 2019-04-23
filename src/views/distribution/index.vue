<template>
  <div class="animated fadeIn">
    <h2 class="my-4 color-rw-active">Token Distribution</h2>
    <b-row>
      <b-col md="8">
        <b-card no-body>
          <b-card-body>
            <b-row class="mt-3">
              <b-col md="4">
                <div class="form-group">
                  <label class="control-label">RewardsToken Contract Address</label>
                  <input type="text" class="form-control" v-model="tokenContractAddress"/>
                </div>
              </b-col>
              <b-col md="4">
                <div class="form-group">
                  <label class="control-label">VestingVault Contract Address</label>
                  <input type="text" class="form-control" v-model="vestingContractAddress"/>
                </div>
              </b-col>
              <b-col md="4">
                <div class="form-group">
                  <label class="control-label">Distribution Contract Address</label>
                  <input type="text" class="form-control" v-model="distributionContractAddress"/>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
        <b-card no-body>
          <b-card-body>
            <b-row class="mt-4">
              <b-col md="12">
                <h4 class="color-rw-primary">1. Start Distribution</h4>
                <start-distribution :token="tokenContractAddress" :vesting="vestingContractAddress"
                                    :distribution="distributionContractAddress"/>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
        <b-card no-body>
          <b-card-body>
            <div class="mt-4">
              <h4 class="color-rw-primary">2. Vested Allocation</h4>
              <b-row class="ml-2 mt-3">
                <b-col md="12">
                  <h5 class="text-center">Default Vesting</h5>
                  <default-vesting :token="tokenContractAddress" :vesting="vestingContractAddress"
                                   :distribution="distributionContractAddress"/>
                </b-col>
              </b-row>
              <b-row class="ml-2 mt-3">
                <b-col md="12">
                  <h5 class="text-center">Scheduled Vesting</h5>
                  <scheduled-vesting :token="tokenContractAddress" :vesting="vestingContractAddress"
                                     :distribution="distributionContractAddress"/>
                </b-col>
              </b-row>
              <hr>
              <b-row class="ml-2 mt-5">
                <b-col md="12">
                  <h5 class="text-center">Vested Allocation List</h5>
                  <vested-list :token="tokenContractAddress" :vesting="vestingContractAddress"
                               :distribution="distributionContractAddress"/>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
        <b-card no-body>
          <b-card-body>
            <div class="mt-4">
              <h4 class="color-rw-primary">3. Manual Allocation</h4>
              <b-row class="ml-2 mt-3">
                <b-col md="12">
                  <manual-allocation class="mt-5" :token="tokenContractAddress" :vesting="vestingContractAddress"
                                     :distribution="distributionContractAddress"/>
                </b-col>
              </b-row>
              <b-row class="ml-2 mt-5">
                <b-col md="12">
                  <h5 class="text-center">Manual Allocation List</h5>
                  <normal-list :token="tokenContractAddress" :vesting="vestingContractAddress"
                               :distribution="distributionContractAddress"/>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
        <b-card no-body>
          <b-card-body>
            <b-row class="mt-4">
              <b-col md="12">
                <h4 class="color-rw-primary">4. Finalize Distribution</h4>
                <finalize-distribution :token="tokenContractAddress" :vesting="vestingContractAddress"
                                       :distribution="distributionContractAddress"/>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card no-body>
          <b-card-body>
            <rewards-token :token="tokenContractAddress"/>
          </b-card-body>
        </b-card>
        <b-card no-body class="mt-4">
          <b-card-body>
            <vesting-vault :vesting="vestingContractAddress"/>
          </b-card-body>
        </b-card>
        <b-card no-body class="mt-4">
          <b-card-body>
            <distribution-contract :distribution="distributionContractAddress"/>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import DefaultVesting from "./defaultVesting";
  import ScheduledVesting from "./scheduledVesting";
  import StartDistribution from "./startDistribution";
  import VestedList from "./vestedList";
  import ManualAllocation from "./manualAllocation";
  import NormalList from "./normalList";
  import FinalizeDistribution from "./finalizeDistribution";
  import RewardsToken from "../components/rewardsToken";
  import VestingVault from "../components/vestingVault";
  import DistributionContract from "../components/distributionContract";

  import Utils from "../../utils/contract";

  export default {
    name: "distribution",
    components: {
      StartDistribution,
      DefaultVesting,
      ScheduledVesting,
      VestedList,
      ManualAllocation,
      NormalList,
      FinalizeDistribution,
      RewardsToken,
      VestingVault,
      DistributionContract
    },
    mounted() {
      let vm = this;
      this.timer = setInterval(async function () {
        if (!_.isNil(vm.tokenContractAddress)) {
          let tokenOwner = await Utils.tokenOwnerShip(vm.tokenContractAddress);
          if (_.isNil(vm.$store.state.rewards.tokenOwnership) || vm.$store.state.rewards.tokenOwnership !== tokenOwner) {
            vm.$store.dispatch('updateTokenOwnership', tokenOwner);
          }
        }
        if (!_.isNil(vm.vestingContractAddress)) {
          let vestingOwner = await Utils.vestingOwnerShip(vm.vestingContractAddress);
          if (_.isNil(vm.$store.state.rewards.vestingOwnership) || vm.$store.state.rewards.vestingOwnership !== vestingOwner) {
            vm.$store.dispatch('updateVestingOwnership', vestingOwner);
          }
        }
      }, 3000)
    },
    data() {
      return {
        timer: null,
      }
    },
    computed: {
      tokenContractAddress: {
        get() {
          if (!_.isNil(this.$store.state.rewards.tokenContractAddress)) {
            return this.$store.state.rewards.tokenContractAddress;
          }
        },
        set(value) {
          this.$store.dispatch('updateTokenAddress', value);
        }
      },
      vestingContractAddress: {
        get() {
          if (!_.isNil(this.$store.state.rewards.vestingContractAddress)) {
            return this.$store.state.rewards.vestingContractAddress;
          }
        },
        set(value) {
          this.$store.dispatch('updateVestingAddress', value);
        }
      },
      distributionContractAddress: {
        get() {
          if (!_.isNil(this.$store.state.rewards.distributionContractAddress)) {
            return this.$store.state.rewards.distributionContractAddress;
          }
        },
        set(value) {
          this.$store.dispatch('updateDistributionAddress', value);
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
