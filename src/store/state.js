// Set the key we'll use in local storage.
// Go to Chrome dev tools, application tab, click "Local Storage" and "http://localhost:8080"
// and you'll see this key set below (if logged in):
export const STORAGE_KEY = 'rewards';

let syncedData = {
};

const notSyncedData = {
  // web3
  web3: {
    isInjected: null,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null,
    timer: null,
  },

  gas: {
    gasLimit: null,
    gasPrice: null
  },
  rewards: {
    tokenContractAddress: null,
    vestingContractAddress: null,
    distributionContractAddress: null,
    tokenOwnership: null,
    vestingOwnership: null,
  }
};

// Sync with local storage.
if (localStorage.getItem(STORAGE_KEY)) {
  syncedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// Merge data and export it.
export const state = Object.assign(syncedData, notSyncedData);
