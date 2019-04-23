<template>
  <div class="animated fadeIn">
    <h2 class="my-4 color-rw-active">Token Management</h2>
    <b-row>
      <b-col md="8">
        <b-card no-body>
          <b-card-body>
            <b-tabs>
              <b-tab title="General" active>
                <br>
                <general-management :token="tokenContractAddress"/>
              </b-tab>
              <b-tab title="Owner">
                <owner-management :token="tokenContractAddress"/>
              </b-tab>
            </b-tabs>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card no-body>
          <b-card-body>
            <rewards-token :token="tokenContractAddress"/>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import GeneralManagement from "./generalManagement";
  import OwnerManagement from "./ownerManagement";
  import RewardsToken from "../components/rewardsToken";

  export default {
    name: "management",
    components: {
      GeneralManagement,
      OwnerManagement,
      RewardsToken
    },
    data() {
      return {}
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
    }
  }
</script>

<style scoped>

</style>
