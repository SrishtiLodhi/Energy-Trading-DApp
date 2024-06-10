const { ethers, getNamedAccounts } = require("hardhat")

// index -> integer
async function get_bids(index) {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    const transactionResponse = await powerx.bids(index)
    return transactionResponse
}

module.exports = get_bids;