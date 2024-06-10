const { Wallet } = require("ethers")
const { ethers, getNamedAccounts } = require("hardhat")

// quantity -> integer
// buyer -> address
// bid_id -> integer
// path -> array of {<charge>, <node address>}
// total_value -> value in ether
async function execute_transaction(quantity, buyer, bid_id, service_providers, total_value) {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    const transactionResponse = await powerx.execute_transaction(quantity, buyer, bid_id, service_providers, {value: ethers.utils.parseEther(`${total_value}`)})
    await transactionResponse.wait()
    // console.log(transactionResponse)
}

module.exports = execute_transaction;