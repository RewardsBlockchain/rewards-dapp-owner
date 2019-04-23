<template>
  <div class="app">
    <header class="app-header navbar">
      <div class="container">
        <b-link class="navbar-brand" to="/"></b-link>
      </div>
    </header>
    <div class="app-body">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <metamask-info class="float-right mt-3"/>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { Header as AppHeader, Footer as AppFooter } from '../components/'
  import axios from 'axios';
  import MetamaskInfo from '../components/MetamaskInfo';

  export default {
    name: 'blank',
    components: {
      AppHeader,
      AppFooter,
      MetamaskInfo
    },
    data () {
      return {

      }
    },
    mounted() {
      axios.get('static/data/constants.json')
        .then(res => res.data)
        .then(constants => {
          this.$store.dispatch('updateTokenAddress', constants[constants.env].token_address);
          this.$store.dispatch('updateVestingAddress', constants[constants.env].vesting_address);
          this.$store.dispatch('updateDistributionAddress', constants[constants.env].distribution_address);
          this.$store.dispatch('updateGasLimit', constants['gas'].gasLimit);
          this.$store.dispatch('updateGasPrice', constants['gas'].gasPrice * Math.pow(10, 9));
        });
    },
    methods: {

    },
    beforeCreate() {
      console.log('registerWeb3 Action dispatched from ContractsContainer.vue');
      this.$store.dispatch('registerWeb3');
    },

    beforeDestroy() {
      console.log('clearPollWeb3 Action dispatched from ContractsContainer.vue');
      this.$store.dispatch('clearPollWeb3');
    }
  }
</script>
