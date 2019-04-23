import getWeb3 from '../utils/getWeb3';

export const registerWeb3 = ({ commit }) => {
  console.log('registerWeb3 Action being executed');
  getWeb3.then(result => {
    console.log('committing result to registerWeb3Instance mutation');
    commit('REGISTER_WEB3_INSTANCE', result);
  }).catch(e => {
    console.log('error in action registerWeb3', e);
    swal({
      title: "Metamask Error",
      text: `Please check your Metamask on your browser.\n
                   Please refresh this page after install or unlock.`,
      icon: "warning",
    });
  })
};

export const pollWeb3 = ({commit}, payload) => {
  console.log('pollWeb3 action being executed');
  commit('POLL_WEB3_INSTANCE', payload);
};

export const clearPollWeb3 = ({commit}) => {
  console.log('clearPollWeb3 action being executed');
  commit('CLEAR_POLL_WEB3_INSTANCE');
};

export const updateTokenAddress = ({commit}, address) => {
  console.log('updateTokenAddress action being executed');
  commit('UPDATE_TOKEN_ADDRESS', address);
};

export const updateVestingAddress = ({commit}, address) => {
  console.log('updateVestingAddress action being executed');
  commit('UPDATE_VESTING_ADDRESS', address);
};

export const updateDistributionAddress = ({commit}, address) => {
  console.log('updateDistributionAddress action being executed');
  commit('UPDATE_DISTRIBUTION_ADDRESS', address);
};

export const updateTokenOwnership = ({commit}, address) => {
  console.log('updateTokenOwnership action being executed');
  commit('UPDATE_TOKEN_OWNER', address);
};

export const updateVestingOwnership = ({commit}, address) => {
  console.log('updateVestingOwnership action being executed');
  commit('UPDATE_VESTING_OWNER', address);
};

export const updateGasPrice = ({commit}, payload) => {
  console.log('updateGasPrice action being executed');
  commit('UPDATE_GAS_PRICE', payload);
};

export const updateGasLimit = ({commit}, payload) => {
  console.log('updateGasLimit action being executed');
  commit('UPDATE_GAS_LIMIT', payload);
};
