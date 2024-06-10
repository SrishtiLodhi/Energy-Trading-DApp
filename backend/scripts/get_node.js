const { ethers, getNamedAccounts } = require("hardhat")

// node -> address
async function get_node(node) {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    const transactionResponse = await powerx.get_node_by_address(node)
    // console.log(transactionResponse)
    return transactionResponse
}

module.exports = get_node;