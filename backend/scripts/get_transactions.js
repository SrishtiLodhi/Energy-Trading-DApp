const { ethers, getNamedAccounts } = require("hardhat")

// index -> integer
async function get_transactions(index) {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    const transactionResponse = await powerx.transactions(index)
    //console.log(transactionResponse, "transactionResponse")
    return transactionResponse;
}

module.exports = get_transactions;