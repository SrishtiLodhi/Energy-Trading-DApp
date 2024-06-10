const { ethers, getNamedAccounts } = require("hardhat")

async function get_transactions_length() {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    const transactionResponse = await powerx.get_transactions_length()
    return transactionResponse
}

module.exports = get_transactions_length;