require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RPC_URL_AMOY =
  process.env.RPC_URL_AMOY
const RPC_URL_MANTLE = 
  process.env.RPC_URL_MANTLE
const PRIVATE_KEY =
  process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: "polygon",
  networks: {
    Mantle : {
      url: RPC_URL_MANTLE,
      accounts: [PRIVATE_KEY],
      chainId: 5001,
    },
    polygon: {
      url: RPC_URL_AMOY,
      accounts: [PRIVATE_KEY],
      chainId: 80002,
    },
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  solidity: "0.8.8",
}
