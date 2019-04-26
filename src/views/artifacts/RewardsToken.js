export default {
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_burnAmount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseApproval",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "finishMinting",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "freeze",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseApproval",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "revoke",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "startMinting",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "unfreeze",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "NewToken",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_burner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_burnedAmount",
          "type": "uint256"
        }
      ],
      "name": "Burned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Revoke",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "MintFinished",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "MintStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Freeze",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Unfreeze",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "frozen",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "hardCap",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "mintingFinished",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "60806040526002805461ffff191661010017905534801561001f57600080fd5b5060008054600160a060020a0319163317815560405130917f0f53e2a811b6fd2d6cd965fd6c27b44fb924ca39f7a7f321115705c22366d62391a2611149806100696000396000f3fe608060405234801561001057600080fd5b506004361061016a576000357c0100000000000000000000000000000000000000000000000000000000900480636a28f000116100e0578063a9059cbb11610099578063a9059cbb14610393578063d73dd623146103bf578063dd62ed3e146103eb578063eac449d914610419578063f2fde38b14610445578063fb86a4041461046b5761016a565b80636a28f0001461032957806370a08231146103315780637d64bcb4146103575780638da5cb5b1461035f57806395d89b41146103835780639a65ea261461038b5761016a565b806323b872dd1161013257806323b872dd14610256578063313ce5671461028c57806340c10f19146102aa57806342966c68146102d657806362a5af3b146102f557806366188463146102fd5761016a565b8063054f7d9c1461016f57806305d2035b1461018b57806306fdde0314610193578063095ea7b31461021057806318160ddd1461023c575b600080fd5b610177610473565b604080519115158252519081900360200190f35b610177610481565b61019b61048a565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101d55781810151838201526020016101bd565b50505050905090810190601f1680156102025780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101776004803603604081101561022657600080fd5b50600160a060020a0381351690602001356104c1565b610244610527565b60408051918252519081900360200190f35b6101776004803603606081101561026c57600080fd5b50600160a060020a0381358116916020810135909116906040013561052d565b610294610791565b6040805160ff9092168252519081900360200190f35b610177600480360360408110156102c057600080fd5b50600160a060020a038135169060200135610796565b6102f3600480360360208110156102ec57600080fd5b503561091f565b005b6102f36109ba565b6101776004803603604081101561031357600080fd5b50600160a060020a038135169060200135610a20565b6102f3610b10565b6102446004803603602081101561034757600080fd5b5035600160a060020a0316610b73565b610177610b8e565b610367610bf2565b60408051600160a060020a039092168252519081900360200190f35b61019b610c01565b610177610c38565b610177600480360360408110156103a957600080fd5b50600160a060020a038135169060200135610c9a565b610177600480360360408110156103d557600080fd5b50600160a060020a038135169060200135610e5b565b6102446004803603604081101561040157600080fd5b50600160a060020a0381358116916020013516610ef4565b6101776004803603604081101561042f57600080fd5b50600160a060020a038135169060200135610f1f565b6102f36004803603602081101561045b57600080fd5b5035600160a060020a031661102b565b6102446110bf565b600254610100900460ff1681565b60025460ff1681565b60408051808201909152600c81527f5265776172647320436173680000000000000000000000000000000000000000602082015281565b336000818152600460209081526040808320600160a060020a038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60015481565b60008054600160a060020a031633148061054f5750600254610100900460ff16155b15156105a5576040805160e560020a62461bcd02815260206004820152601f60248201527f546f6b656e7320636f756c64206e6f74206265207472616e7366657272656400604482015290519081900360640190fd5b600160a060020a0383161515610605576040805160e560020a62461bcd02815260206004820152601a60248201527f416464726573732073686f756c64206e6f74206265207a65726f000000000000604482015290519081900360640190fd5b600160a060020a038416600090815260036020526040902054821115610675576040805160e560020a62461bcd02815260206004820152601460248201527f496e73756666696369656e742042616c616e6365000000000000000000000000604482015290519081900360640190fd5b600160a060020a03841660009081526004602090815260408083203384529091529020548211156106f0576040805160e560020a62461bcd02815260206004820152601660248201527f496e73756666696369656e7420416c6c6f77616e636500000000000000000000604482015290519081900360640190fd5b600160a060020a038085166000908152600360205260408082208054869003905591851681522054610728908363ffffffff6110cf16565b600160a060020a03848116600081815260036020908152604080832095909555928816808252600484528482203383528452908490208054879003905583518681529351919390926000805160206110fe83398151915292918290030190a35060019392505050565b601281565b60008054600160a060020a031633146107ae57600080fd5b60025460ff1615610809576040805160e560020a62461bcd02815260206004820152601c60248201527f4d696e74696e672077617320616c72656164792066696e697368656400000000604482015290519081900360640190fd5b600160a060020a0383161515610869576040805160e560020a62461bcd02815260206004820152601a60248201527f416464726573732073686f756c64206e6f74206265207a65726f000000000000604482015290519081900360640190fd5b6001546b019d971e4fe8401e740000009061088a908463ffffffff6110cf16565b111561089557600080fd5b6001546108a8908363ffffffff6110cf16565b600155600160a060020a0383166000908152600360205260409020546108d4908363ffffffff6110cf16565b600160a060020a03841660008181526003602090815260408083209490945583518681529351929391926000805160206110fe8339815191529281900390910190a350600192915050565b3360009081526003602052604090205481111561093b57600080fd5b3360009081526003602052604090205461095b908263ffffffff6110e816565b3360009081526003602052604090205560015461097e908263ffffffff6110e816565b60015560408051828152905133917f696de425f79f4a40bc6d2122ca50507f0efbeabbff86a84871b7196ab8ea8df7919081900360200190a250565b600054600160a060020a031633146109d157600080fd5b600254610100900460ff16156109e657600080fd5b6002805461ff0019166101001790556040517f615acbaede366d76a8b8cb2a9ada6a71495f0786513d71aa97aaf0c3910b78de90600090a1565b336000908152600460209081526040808320600160a060020a038616845290915281205480831115610a7557336000908152600460209081526040808320600160a060020a0388168452909152812055610aaa565b610a85818463ffffffff6110e816565b336000908152600460209081526040808320600160a060020a03891684529091529020555b336000818152600460209081526040808320600160a060020a0389168085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b600054600160a060020a03163314610b2757600080fd5b600254610100900460ff161515610b3d57600080fd5b6002805461ff00191690556040517f2f05ba71d0df11bf5fa562a6569d70c4f80da84284badbe015ce1456063d0ded90600090a1565b600160a060020a031660009081526003602052604090205490565b60008054600160a060020a03163314610ba657600080fd5b60025460ff1615610bb657600080fd5b6002805460ff191660011790556040517fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0890600090a150600190565b600054600160a060020a031681565b60408051808201909152600481527f5257524400000000000000000000000000000000000000000000000000000000602082015281565b60008054600160a060020a03163314610c5057600080fd5b60025460ff161515610c6157600080fd5b6002805460ff191690556040517f452a344f03203071e1daf66e007976c85cb2380deabf1c91f3c4fb1fca41204990600090a150600190565b60008054600160a060020a0316331480610cbc5750600254610100900460ff16155b1515610d12576040805160e560020a62461bcd02815260206004820152601f60248201527f546f6b656e7320636f756c64206e6f74206265207472616e7366657272656400604482015290519081900360640190fd5b600160a060020a0383161515610d72576040805160e560020a62461bcd02815260206004820152601a60248201527f416464726573732073686f756c64206e6f74206265207a65726f000000000000604482015290519081900360640190fd5b33600090815260036020526040902054821115610dd9576040805160e560020a62461bcd02815260206004820152601460248201527f496e73756666696369656e742062616c616e6365000000000000000000000000604482015290519081900360640190fd5b3360009081526003602052604080822080548590039055600160a060020a0385168252902054610e0f908363ffffffff6110cf16565b600160a060020a0384166000818152600360209081526040918290209390935580518581529051919233926000805160206110fe8339815191529281900390910190a350600192915050565b336000908152600460209081526040808320600160a060020a0386168452909152812054610e8f908363ffffffff6110cf16565b336000818152600460209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a03918216600090815260046020908152604080832093909416825291909152205490565b60008054600160a060020a03163314610f3757600080fd5b600160a060020a038316600090815260036020526040902054821115610f5c57600080fd5b600160a060020a038316600090815260036020526040902054610f85908363ffffffff6110e816565b600160a060020a038416600090815260036020526040902055600154610fb1908363ffffffff6110e816565b600155604080518381529051600160a060020a038516917fec9ab91322523c899ede7830ec9bfc992b5981cdcc27b91162fb23de5791117b919081900360200190a2604080518381529051600091600160a060020a038616916000805160206110fe8339815191529181900360200190a350600192915050565b600054600160a060020a0316331461104257600080fd5b600160a060020a038116151561105757600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6b019d971e4fe8401e7400000081565b6000828201838110156110e157600080fd5b9392505050565b6000828211156110f757600080fd5b5090039056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa165627a7a723058207c29754f565560b9c68a0b6d119f6a28aee7abb0dd9a340e697911355e778d7e0029",
};
