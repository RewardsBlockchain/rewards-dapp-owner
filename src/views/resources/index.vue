<template>
  <div class="animated fadeIn mt-4">
    <h2 class="my-4 color-rw-active">Contracts Source</h2>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col md="7">
            <b-row>
              <b-col md="12">
                <span class="left-header color-rw-primary">Contracts Source</span>
                <b-button variant="link" class="px-0 color-rw-active float-right"
                          @click="copySourceCode">Copy Source
                </b-button>
              </b-col>
            </b-row>
            <hr>
            <pre id="contract_source" v-html="source"></pre>
          </b-col>
          <b-col md="5">
            <b-row>
              <b-col md="12">
                <span class="left-header color-rw-primary">RewardsToken Contract ABI</span>
                <b-button variant="link" class="px-0 color-rw-active float-right"
                          @click="copyTokenABI">Copy ABI
                </b-button>
              </b-col>
            </b-row>
            <hr>
            <pre id="token_abi_source" v-html="tokenABI"></pre>
            <b-row>
              <b-col md="12">
                <span class="left-header color-rw-primary">VestingVault Contract ABI</span>
                <b-button variant="link" class="px-0 color-rw-active float-right"
                          @click="copyVestingABI">Copy ABI
                </b-button>
              </b-col>
            </b-row>
            <hr>
            <pre id="vesting_abi_source" v-html="vestingABI"></pre>
            <b-row>
              <b-col md="12">
                <span class="left-header color-rw-primary">Distribution Contract ABI</span>
                <b-button variant="link" class="px-0 color-rw-active float-right"
                          @click="copyDistributionABI">Copy ABI
                </b-button>
              </b-col>
            </b-row>
            <hr>
            <pre id="distribution_abi_source" v-html="distributionABI"></pre>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import ContractSource from "./contract";
  import Token from "../artifacts/RewardsToken";
  import Vesting from "../artifacts/VestingVault";
  import Distribution from "../artifacts/Distribution";

  export default {
    name: "resources",

    data() {
      return {
        source: ContractSource,
        tokenABI: Token.abi,
        vestingABI: Vesting.abi,
        distributionABI: Distribution.abi
      }
    },

    methods: {
      copySourceCode(e) {
        let copyText = window.document.getElementById("contract_source").textContent;
        let textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.$notify({
          group: 'notification-br',
          type: 'success',
          text: 'Successfully copied contract code !'
        });
      },
      copyTokenABI() {
        let copyText = window.document.getElementById("token_abi_source").textContent;
        let textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.$notify({
          group: 'notification-br',
          type: 'success',
          text: 'Successfully copied RewardsToken ABI !'
        });
      },
      copyVestingABI() {
        let copyText = window.document.getElementById("vesting_abi_source").textContent;
        let textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.$notify({
          group: 'notification-br',
          type: 'success',
          text: 'Successfully copied VestingVault ABI !'
        })
      },
      copyDistributionABI() {
        let copyText = window.document.getElementById("distribution_abi_source").textContent;
        let textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.$notify({
          group: 'notification-br',
          type: 'success',
          text: 'Successfully copied Distribution ABI !'
        })
      }
    },

  }
</script>

<style scoped>
  .left-header {
    font-size: 20px;
  }
  #contract_source {
    max-height: 900px;
  }
  #token_abi_source {
    max-height: 200px;
  }
  #vesting_abi_source {
    max-height: 200px;
  }
  #distribution_abi_source {
    max-height: 200px;
  }
</style>
