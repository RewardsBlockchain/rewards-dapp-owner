<template>
  <div>
    <b-row>
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">Recipient Address</label>
          <input type="text" class="form-control" v-model="address"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Vesting Amount</label>
          <input type="number" class="form-control" v-model="amount"/>
          <span class="form-control-right-box">RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="addToList">Add List >></b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Vesting Start</label>
          <datetime
            type="datetime" input-class="form-control" auto-continue auto-close
            v-model="vestingStart" moment-locale="es" input-format="DD-MM-YYYY HH:mm"
          ></datetime>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Vesting Cliff</label>
          <input type="number" class="form-control" v-model="vestingCliff"/>
          <span class="form-control-right-box">Hours</span>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Vesting Duration</label>
          <input type="number" class="form-control" v-model="vestingDuration"/>
          <span class="form-control-right-box">Hours</span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "defaultVesting",
    data() {
      return {
        address: null,
        amount: null,
        vestingStart: null,
        vestingCliff: null,
        vestingDuration: null
      }
    },
    methods: {
      addToList() {
        Vue.$emit('addDefaultVesting', {
          address: this.address,
          amount: this.amount,
          vestingStart: this.vestingStart,
          vestingCliff: this.vestingCliff,
          vestingDuration: this.vestingDuration
        });
      }
    }
  }
</script>

<style scoped>

</style>
