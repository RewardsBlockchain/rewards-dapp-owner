<template>
  <aside class="aside-menu">
    <div class="gas">
      <metamask-info/>
      <h5 class="mt-5">Gas Price</h5>
      <input type="text" class="form-control" v-model="gasPrice"/>
      <span class="form-control-right-box">GWEI</span>
      <br>
      <h5>Gas Limit</h5>
      <input type="text" class="form-control" v-model="gasLimit"/>
      <!--<span class="form-control-right-box">GWEI</span>-->
    </div>
  </aside>
</template>

<script>
  import MetamaskInfo from './MetamaskInfo';

  export default {
    name: 'c-aside',

    components: {
      MetamaskInfo
    },

    data() {
      return {
      }
    },
    computed: {
      gasLimit: {
        get() {
          if(!_.isNil(this.$store.state.gas.gasLimit)) {
            return this.$store.state.gas.gasLimit;
          }
        },
        set: _.debounce(function (limit) {
          console.log('updateGasLimit Action dispatched from Aside.vue');
          this.$store.dispatch('updateGasLimit', limit);
        }, 500)
      },
      gasPrice: {
        get() {
          if(!_.isNil(this.$store.state.gas.gasPrice)) {
            return this.$store.state.gas.gasPrice / Math.pow(10, 9);
          }
        },
        set: _.debounce(function (price) {
          console.log('updateGasPrice Action dispatched from Aside.vue');
          this.$store.dispatch('updateGasPrice', price * Math.pow(10, 9));
        }, 500)
      }
    }
  }
</script>
<style scoped>
  .gas{
    padding: 30px;
  }
</style>
