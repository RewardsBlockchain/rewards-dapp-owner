<template>
  <div class="animated fadeIn">
    <h2 class="my-4 color-rw-active">Contracts Deployment</h2>
    <b-card no-body>
      <b-card-body>
        <div class="mt-3">
          <h4 class="color-rw-primary">1. Token Contract Deployment</h4>
          <b-row class="ml-2 mt-4">
            <b-col md="5">
              <p>Token Name: Rewards Cash</p>
              <p>Token Symbol: RWRD</p>
              <p>Token Decimal: 18</p>
              <p>Token HardCap: 500 Millions</p>
            </b-col>
            <b-col md="7">
              <p>- ERC-20 Compliance and Ownable Token</p>
              <p>- Mintable Token (startMinting, finishMinting, mint)</p>
              <p>- Freezable Token (freeze, unfreeze)</p>
              <p>- Revocable Token (revoke)</p>
              <p>- Burnable Token (burn)</p>
            </b-col>
          </b-row>
          <b-row class="ml-2">
            <b-col md="12">
              <b-button class="btn btn-success" @click="deployTokenContract">Deploy</b-button>
              <span class="color-rw-primary ml-3" v-show="tokenContractAddress">Deployed At: {{tokenContractAddress}}</span>
            </b-col>
          </b-row>
        </div>
        <hr>
        <div class="mt-4">
          <h4 class="color-rw-primary">2. VestingVault Contract Deployment</h4>
          <b-row class="ml-2 mt-4">
            <b-col md="5">
              <div class="form-group">
                <label class="control-label">Token Contract Address</label>
                <input type="text" class="form-control" v-model="tokenAddressForVesting"/>
              </div>
            </b-col>
            <b-col md="7">
                <p>- Ownable Contract</p>
                <p>- Allocate Token (grant)</p>
                <p>- Claim Token (claim)</p>
                <p>- Burn Remaining Tokens (burnRemainingTokens)</p>
                <p>- Revoke Tokens from an address (revokeTokens) </p>
                <p>- Withdraw Remaining Tokens (withdraw) </p>
                <p>- Lock Vault (lockVault)</p>
            </b-col>
          </b-row>
          <b-row class="ml-2">
            <b-col md="12">
              <b-button class="btn btn-success" @click="deployVestingContract">Deploy</b-button>
              <span class="color-rw-primary ml-3" v-show="vestingContractAddress">Deployed At: {{vestingContractAddress}}</span>
            </b-col>
          </b-row>
        </div>
        <hr>
        <div class="mt-4">
          <h4 class="color-rw-primary">3. Distribution Contract Deployment</h4>
          <b-row class="ml-2 mt-4">
            <b-col md="5">
              <div class="form-group">
                <label class="control-label">Token Contract Address</label>
                <input type="text" class="form-control" v-model="tokenAddressForDistribution"/>
              </div>
              <div class="form-group">
                <label class="control-label">VestingVault Contract Address</label>
                <input type="text" class="form-control" v-model="vestingAddressForDistribution"/>
              </div>
            </b-col>
            <b-col md="7">
                <p>- Ownable Contract</p>
                <p>- Allocate Manual Tokens (allocNormalUser)</p>
                <p>- Allocate Vested Tokens (allocVestedUser)</p>
                <p>- Revoke Tokens from an vested user (revokeTokensFromVestedUser)</p>
                <p>- Transfer Back Token OwnerShip (transferBackTokenOwnership)</p>
                <p>- Transfer Back VestingVault OwnerShip (transferBackVestingVaultOwnership) </p>
                <p>- Finalize Distribution (finalize)</p>
            </b-col>
          </b-row>
          <b-row class="ml-2">
            <b-col md="12">
              <b-button class="btn btn-success" @click="deployDistributionContract">Deploy</b-button>
              <span class="color-rw-primary ml-3" v-show="distributionContractAddress">Deployed At: {{distributionContractAddress}}</span>
            </b-col>
          </b-row>
        </div>
      </b-card-body>
    </b-card>
    <b-modal id="deploy_modal" hide-header hide-footer no-close-on-backdrop centered
             v-model="modalShow"
    >
      <h3 class="mb-4">{{modalTitle}} Deployment</h3>
      <b-row>
        <b-col md="12">
          <p>
            Contract deployment in progress.
            <i class="fa ml-3"
               :class="{
               'fa-spinner fa-spin color-rw-active' : deployInProgress,
               'fa-check-circle-o color-rw-active' : !deployInProgress && !deployError,
               'fa-time color-rw-error' : deployError}"
               style="font-size: 20px"></i>
          </p>
          <p class="text-muted">It will take 3 ~ 5 minutes to be fully deployed.</p>
          <div v-show="deployError">
            <p>{{deployError}}</p>
          </div>
          <div v-show="!deployInProgress && !deployError">
            <p> Your contract has been deployed
              <a :href="deployedLink" class="color-rw-primary" target="_blank">here.</a>
            </p>
            <p>Contract Address: {{deployedAddress}}</p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-btn variant="link" class="color-rw-primary float-right"
                 style="font-size: 16px" @click="modalShow = !modalShow">
            Close
          </b-btn>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import {NETWORKS} from "../../utils/constants";
  import Distribution from "../artifacts/Distribution";
  import RewardsToken from "../artifacts/RewardsToken";
  import VestingVault from "../artifacts/VestingVault";

  export default {
    name: "deployment",
    data() {
      return {
        tokenAddressForVesting: "",
        tokenAddressForDistribution: "",
        vestingAddressForDistribution: "",
        modalTitle: "",
        modalShow: false,
        deployInProgress: true,
        deployedLink: "",
        deployedAddress: "",
        deployError: null
      }
    },
    methods: {
      initialModal(title) {
        this.modalTitle = title;
        this.modalShow = true;
        this.deployInProgress = true;
        this.deployError = null;
      },
      finalizeModal(address) {
        this.deployInProgress = false;
        this.deployedAddress = address;
        this.deployedLink = `http://${NETWORKS[this.$store.state.web3.networkId]}.etherscan.io/address/${address}`;
      },
      errorModal(error) {
        this.deployInProgress = false;
        this.deployError = error;
      },
      deployTokenContract() {
        let vm = this;
        this.initialModal("RewardsToken Contract");
        Utils.controller(RewardsToken.abi, RewardsToken.bytecode).then(controller => {
          controller.contract.new(controller.base,
            (err, result) => {
              if (err) {
                console.error(err);
                vm.errorModal(err.message);
              } else {
                console.log("transaction hash:", result.transactionHash);
                if (result.address) {
                  console.log(`deployed address ${result.address}`);
                  vm.tokenContractAddress = result.address;
                  vm.tokenAddressForVesting = result.address;
                  vm.tokenAddressForDistribution = result.address;
                  console.log('updateTokenAddress action dispatched from Deployment');
                  vm.finalizeModal(result.address);
                  this.$store.dispatch('updateTokenAddress', result.address);
                } else {
                  console.log("Waiting for a mined block to include your contract... currently in block ");
                }
              }
            }
          );
        }).catch(e => console.log(e));
      },
      deployVestingContract() {
        let vm = this;
        this.initialModal("VestingVault Contract");
        Utils.controller(VestingVault.abi, VestingVault.bytecode).then(controller => {
          controller.contract.new(this.tokenAddressForVesting, controller.base,
            (err, result) => {
              if (err) {
                console.error(err);
                vm.errorModal(err.message);
              } else {
                console.log("transaction hash:", result.transactionHash);
                if (result.address) {
                  console.log(`deployed address ${result.address}`);
                  vm.vestingContractAddress = result.address;
                  vm.vestingAddressForDistribution = result.address;
                  this.$store.dispatch('updateVestingAddress', result.address);
                  vm.finalizeModal(result.address);
                } else {
                  console.log("Waiting for a mined block to include your contract... currently in block ");
                }

              }
            }
          );
        }).catch(e => console.log(e));
      },
      deployDistributionContract() {
        let vm = this;
        this.initialModal("Distribution Contract");
        Utils.controller(Distribution.abi, Distribution.bytecode).then(controller => {
          controller.contract.new(this.tokenAddressForDistribution, this.vestingAddressForDistribution, controller.base,
            (err, result) => {
              if (err) {
                console.error(err);
                vm.errorModal(err.message);
              } else {
                console.log("transaction hash:", result.transactionHash);
                if (result.address) {
                  console.log(`deployed address ${result.address}`);
                  vm.distributionContractAddress = result.address;
                  this.$store.dispatch('updateDistributionAddress', result.address);
                  vm.finalizeModal(result.address);
                } else {
                  console.log("Waiting for a mined block to include your contract... currently in block ");
                }
              }
            }
          );
        }).catch(e => console.log(e));
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
    }
  }
</script>

<style scoped>
  /*.card {*/
    /*padding: 0 100px;*/
  /*}*/
</style>
