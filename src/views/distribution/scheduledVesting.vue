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
          <label class="control-label">Total Vesting Amount</label>
          <input type="number" class="form-control" disabled v-model="amount"/>
          <span class="form-control-right-box">RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="addToList">Add List >></b-button>
      </b-col>
    </b-row>
    <b-row v-for="(schedule, index) in scheduledList" :key="index">
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">Vesting Time</label>
          <datetime type="datetime" input-class="form-control" auto-continue auto-close
            v-model="schedule.time" moment-locale="es" input-format="DD-MM-YYYY HH:mm"
          ></datetime>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Vesting Amount</label>
          <input type="number" class="form-control" v-model="schedule.amount"/>
          <span class="form-control-right-box" >RWRDs</span>
        </div>
      </b-col>
      <b-col md="1">
        <b-button variant="link" class="p-0 color-rw-active mt-b" @click="removeRow(index)">
           <i class="fa fa-times-circle"></i>
            Remove
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-button variant="link" class="p-0 color-rw-primary" @click="addRow">
          <i class="fa fa-plus-circle"></i>
          Add Another Schedule
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "scheduledVesting",
    data() {
      return {
          address: null,
          amount: null,
          scheduledList: [
            {time: null, amount: null}
          ]
      }
    },
    methods: {
      removeRow(index) {
          this.scheduledList.splice(index, 1);
      },
      addRow() {
        this.scheduledList.push({
          time: null,
          amount: null,
        });
      },
      addToList() {
        Vue.$emit('addScheduledVesting', {
          address: this.address,
          amount: this.amount,
          scheduledList: this.scheduledList,
        });
      }
    },
    watch: {
      scheduledList: {
        handler: _.debounce(function (rows) {
          let vm = this;
          let totalAmount = 0;
          _.forEach(rows, function (row, index) {
            totalAmount += Number(row.amount);
            vm.amount = totalAmount;
          });
        }, 500),
        deep: true
      },
    },
  }
</script>

<style scoped>

</style>
