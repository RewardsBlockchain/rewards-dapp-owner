import Web3 from 'web3';
import Distribution from "../views/artifacts/Distribution";
import RewardsToken from "../views/artifacts/RewardsToken";
import VestingVault from "../views/artifacts/VestingVault";

const controller = (abi, bytecode) => new Promise(function (resolve, reject) {
  try {
    let web3 = new Web3(window.web3.currentProvider);
    let contract = web3.eth.contract(abi);
    let base = {
      gas: Vue.$store.state.gas.gasLimit,
      gasPrice: Vue.$store.state.gas.gasPrice,
      from: Vue.$store.state.web3.coinbase,
      data: bytecode
    };
    let result = {contract: contract, base: base};
    resolve(result);
  } catch (e) {
    reject(e);
  }
});

const handler = (abi, address) => new Promise(function (resolve, reject) {
  try {
    let web3 = new Web3(window.web3.currentProvider);
    let contract = web3.eth.contract(abi);
    let handler = contract.at(address);
    let base = {
      gas: Vue.$store.state.gas.gasLimit,
      gasPrice: Vue.$store.state.gas.gasPrice,
      from: Vue.$store.state.web3.coinbase,
    };
    let result = {handler: handler, base: base};
    resolve(result);
  } catch (e) {
    reject(e);
  }
});

const isAddress = (address) => {
  let web3 = new Web3(window.web3.currentProvider);
  return web3.isAddress(address);
};

const tokenOwnerShip = (address) => new Promise(function (resolve, reject) {
  handler(RewardsToken.abi, address).then(controller => {
    controller.handler.owner((error, result) => {
      if (!error) {
        resolve(result);
      }
    });
  }).catch(e => reject(e));
});

const vestingOwnerShip = (address) => new Promise(function (resolve, reject) {
  handler(VestingVault.abi, address).then(controller => {
    controller.handler.owner((error, result) => {
      if (!error) {
        resolve(result);
      }
    });
  }).catch(e => reject(e));
});

export default {
  controller,
  handler,
  isAddress,
  tokenOwnerShip,
  vestingOwnerShip
}
