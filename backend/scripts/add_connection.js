const { ethers, getNamedAccounts } = require("hardhat")

// source -> address
// destination -> address
async function add_connection(source, destination) {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    const transactionResponse = await powerx.add_connection(source, destination)
    await transactionResponse.wait()
    // console.log(transactionResponse)
}

module.exports = add_connection;