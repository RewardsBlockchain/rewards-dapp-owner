<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter } from '../components/'
import axios from 'axios';

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
  },
  data () {
    return {
      nav: nav.items
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
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
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
