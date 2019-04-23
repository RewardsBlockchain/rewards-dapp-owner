<template>
  <div>
    <br>
    <b-row>
      <b-col md="12">
        <b-button variant="success" @click="startMinting">Start Minting</b-button>
        <b-button variant="success" @click="finishMinting">Finish Minting</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">Wallet Address</label>
          <input type="text" class="form-control" v-model="mintAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Token Amount</label>
          <input type="number" class="form-control" v-model="mintAmount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button variant="success" class="mt-b" @click="mint">Mint Tokens</b-button>
      </b-col>
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
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button variant="success" class="mt-b" @click="revoke">Revoke Tokens</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col md="12">
        <b-button variant="success" @click="freeze">Freeze Tokens</b-button>
        <b-button variant="success" @click="unfreeze">Unfreeze Tokens</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import RewardsToken from "../artifacts/RewardsToken";

  export default {
    name: "ownerManagement",

    props: {
      token: {
        type: String
      }
    },

    data() {
      return {
        mintAddress: null,
        mintAmount: null,
        revokeAddress: null,
        revokeAmount: null
      }
    },
    methods: {
      startMinting() {
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.startMinting(controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },
      finishMinting() {
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.finishMinting(controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },
      mint() {
        let to = this.mintAddress;
        let amount = Math.floor(this.mintAmount * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.mint(to, amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },
      revoke() {
        let to = this.revokeAddress;
        let amount = Math.floor(this.revokeAmount * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.revoke(to, amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },
      freeze() {
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.freeze(controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },
      unfreeze() {
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.unfreeze(controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      }
    }
  }
</script>

<style scoped>

</style>
