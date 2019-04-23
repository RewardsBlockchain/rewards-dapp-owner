<template>
  <div>
    <b-row>
      <b-col md="12">
        <div class="form-group">
          <label class="control-label">Distribution Contract Address</label>
          <input type="text" class="form-control" v-model="distribution"/>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="12">
        <p>Finished: <span class="float-right">{{finish}}</span></p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Utils from "../../utils/contract";
  import Distribution from "../artifacts/Distribution";

  export default {
    name: "distributionContract",
    props: {
      distribution: {
        type: String,
      }
    },
    data() {
      return {
        finish: null,
        timer: null
      }
    },
    methods: {
      getFinishedInfo() {
        let vm = this;
        Utils.handler(Distribution.abi, vm.distribution).then(controller => {
          controller.handler.finished((error, result) => {
            if (!error) {
              vm.finish = result;
            }
          });
        });
      }
    },
    mounted() {
      let vm = this;
      if (this.distribution) {
        this.getFinishedInfo();
      }
      this.timer = setInterval(function () {
        if (vm.distribution) {
          vm.getFinishedInfo();
        }
      }, 5000)
    },
    watch: {
      distribution() {
        if (this.distribution) {
          this.getFinishedInfo();
        }
      }
    },
  }
</script>

<style scoped>

</style>
