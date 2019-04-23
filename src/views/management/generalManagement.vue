<template>
  <div>
    <b-row class="mb-4">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">To User Wallet Address</label>
          <input type="text" class="form-control" v-model="transferToAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Token Amount</label>
          <input type="number" class="form-control" v-model="transferTokenAmount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="transferTokens">
          Transfer Tokens
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <b-row class="mb-1">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">From User Wallet Address</label>
          <input type="text" class="form-control" v-model="transferFromAddress"/>
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">To User Wallet Address</label>
          <input type="text" class="form-control" v-model="transferFromToAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Token Amount</label>
          <input type="number" class="form-control" v-model="transferFromTokenAmount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="transferTokensFrom">
          Transfer Tokens From
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <b-row class="mb-4">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">User Wallet Address</label>
          <input type="text" class="form-control" v-model="approveAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Approve Token Amount</label>
          <input type="number" class="form-control" v-model="approveTokenAmount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="approveTokens">
          Approve Tokens
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">User Wallet Address</label>
          <input type="text" class="form-control" v-model="increaseAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Increase Token Amount</label>
          <input type="number" class="form-control" v-model="increaseTokenAmount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="increaseApproval">
          Increase Approval
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">User Wallet Address</label>
          <input type="text" class="form-control" v-model="decreaseAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Decrease Token Amount</label>
          <input type="number" class="form-control" v-model="decreaseTokenAmount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="decreaseApproval">
          Decrease Approval
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">Burn Token Amount</label>
          <input type="number" class="form-control" v-model="burnAmount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="burnTokens">
          Burn Tokens
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">User Address</label>
          <input type="text" class="form-control" v-model="userAddress"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">User Balance</label>
          <input type="number" class="form-control" v-model="userBalance" disabled/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="balanceOf">
          Balance
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import RewardsToken from "../artifacts/RewardsToken";

  export default {
    name: "general-management",

    props: {
      token: {
        type: String
      }
    },

    data() {
      return {
        transferToAddress: null,
        transferTokenAmount: null,
        transferFromAddress: null,
        transferFromToAddress: null,
        transferFromTokenAmount: null,
        approveAddress: null,
        approveTokenAmount: null,
        increaseAddress: null,
        increaseTokenAmount: null,
        decreaseAddress: null,
        decreaseTokenAmount: null,
        burnAmount: null,
        userAddress: null,
        userBalance: null,
      }
    },

    methods: {

      transferTokens() {
        let to = this.transferToAddress;
        let amount = Math.floor(this.transferTokenAmount * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.transfer(to, amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },

      transferTokensFrom() {
        let from = this.transferFromAddress;
        let to = this.transferFromToAddress;
        let amount = Math.floor(Number(this.transferFromTokenAmount) * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.transferFrom(from, to, amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },

      approveTokens() {
        let to = this.approveAddress;
        let amount = Math.floor(Number(this.approveTokenAmount) * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.approve(to, amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },

      increaseApproval() {
        let to = this.increaseAddress;
        let amount = Math.floor(Number(this.increaseTokenAmount) * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.increaseApproval(to, amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },

      decreaseApproval() {
        let to = this.decreaseAddress;
        let amount = Math.floor(Number(this.decreaseTokenAmount) * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.decreaseApproval(to, amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },

      burnTokens() {
        let amount = Math.floor(Number(this.burnAmount) * Math.pow(10, 18));
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.burn(amount, controller.base,
            (error, result) => {
              if (!error) {
                console.log(result);
              }
            });
        });
      },

      balanceOf() {
        let vm = this;
        let to = this.userAddress;
        Utils.handler(RewardsToken.abi, this.token).then(controller => {
          controller.handler.balanceOf(to,
            (error, result) => {
              if (!error) {
                vm.userBalance = Number(result) / Math.pow(10, 18)
              }
            });
        });
      }
    }
  }
</script>
<style scoped>

</style>
