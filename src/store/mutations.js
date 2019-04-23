import pollWeb3 from '../utils/pollWeb3';

export const REGISTER_WEB3_INSTANCE = (state, payload) => {
  console.log('registerWeb3instance Mutation being executed', payload);
  let result = payload;
  let web3Copy = state.web3;
  web3Copy.coinbase = result.coinbase;
  web3Copy.networkId = result.networkId;
  web3Copy.balance = parseInt(result.balance, 10);
  web3Copy.isInjected = result.injectedWeb3;
  web3Copy.web3Instance = result.web3;
  web3Copy.timer = null;
  state.web3 = web3Copy;
  state.web3.timer = pollWeb3();
};

export const POLL_WEB3_INSTANCE = (state, payload) => {
  console.log('pollWeb3Instance mutation being executed', payload);
  state.web3.isInjected = payload.isInjected;
  state.web3.coinbase = payload.coinbase;
  state.web3.balance = parseInt(payload.balance, 10);
};

export const CLEAR_POLL_WEB3_INSTANCE = (state, payload) => {
  console.log('clearPollWeb3Instance mutation being executed');
  clearInterval(state.web3.timer);
};

export const UPDATE_TOKEN_ADDRESS = (state, address) => {
  console.log('updateTokenAddress mutation being executed');
  state.rewards.tokenContractAddress = address;
};

export const UPDATE_VESTING_ADDRESS = (state, address) => {
  console.log('updateVestingAddress mutation being executed');
  state.rewards.vestingContractAddress = address;
};

export const UPDATE_DISTRIBUTION_ADDRESS = (state, address) => {
  console.log('updateDistributionAddress mutation being executed');
  state.rewards.distributionContractAddress = address;
};

export const UPDATE_TOKEN_OWNER = (state, address) => {
  console.log('updateTokenOwnership mutation being executed');
  state.rewards.tokenOwnership = address;
};

export const UPDATE_VESTING_OWNER = (state, address) => {
  console.log('updateVestingOwnership mutation being executed');
  state.rewards.vestingOwnership = address;
};

export const UPDATE_GAS_LIMIT = (state, payload) => {
  console.log('updateGasLimit mutation being executed');
  state.gas.gasLimit = payload;
};

export const UPDATE_GAS_PRICE = (state, payload) => {
  console.log('updateGasPrice mutation being executed');
  state.gas.gasPrice = payload;
};
