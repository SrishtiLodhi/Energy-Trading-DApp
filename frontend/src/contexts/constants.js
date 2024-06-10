export const contractAddress = "0x6352e17AcC9158A7b20ea421E21d6BedD578e3bB";
export const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "val1",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "val2",
          "type": "address"
        }
      ],
      "name": "add_connection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "val",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "connected_nodes",
          "type": "address[]"
        }
      ],
      "name": "add_node",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bids",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "unit_price",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "bidder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "qty",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "bidder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        }
      ],
      "name": "create_bid",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "qty",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "bid_id",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "service_charge",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "node",
              "type": "address"
            }
          ],
          "internalType": "struct powerx.service_provider[]",
          "name": "service_providers",
          "type": "tuple[]"
        }
      ],
      "name": "execute_transaction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_bid_length",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "length",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "val",
          "type": "address"
        }
      ],
      "name": "get_node_by_address",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_transactions_length",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "i_owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "nodes_adj_list",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "sendViaCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "service_charge",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "energy_cost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "total_cost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "auctioned_bid",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "buyer",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw_profit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
];