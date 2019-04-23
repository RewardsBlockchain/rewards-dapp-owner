<template>
    <div class="metamask-info">
        <div v-if="isInjected" id="has-metamask">
            <h5>Network: {{ network }}</h5>
            <h5>Balance: {{ balance }} ETH </h5>
        </div>
        <p v-else id="no-metamask">Metamask not found</p>

    </div>
</template>

<script>
    import {NETWORKS} from '../utils/constants';

    export default {
        name: 'metamask-info',
        computed: {
          isInjected() {
            if (!_.isNil(this.$store.state.web3.isInjected)) {
              if(!this.$store.state.web3.isInjected) {
                swal({
                  title: "Metamask Error",
                  text: `Please check your Metamask on your browser.\n
                   Please refresh this page after install or unlock.`,
                  icon: "warning",
                });
              }
              return this.$store.state.web3.isInjected;
            }
          },
          network() {
            if (!_.isNil(this.$store.state.web3.networkId)) {
              return NETWORKS[this.$store.state.web3.networkId];
            }
          },
          coinbase() {
            if (!_.isNil(this.$store.state.web3.coinbase)) {
              return this.$store.state.web3.coinbase;
            }
          },
          balance() {
            if (!_.isNil(this.$store.state.web3.balance)) {
              return (this.$store.state.web3.balance / Math.pow(10, 18)).toFixed(4);
            }
          }
        }
    }
</script>

<style scoped>
    #no-metamask {
        color: red;
    }
</style>
