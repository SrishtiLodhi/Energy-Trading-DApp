const { ethers, getNamedAccounts } = require("hardhat")

// source -> address
// destination -> array of address
async function add_node(source, connections) {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    const transactionResponse = await powerx.add_node(source, connections)
    await transactionResponse.wait()
    // console.log(transactionResponse)
}

module.exports = add_node;