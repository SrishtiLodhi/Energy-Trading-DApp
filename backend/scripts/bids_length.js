const { ethers, getNamedAccounts } = require("hardhat")

async function get_bids_length() {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    const transactionResponse = await powerx.get_bid_length()
    return transactionResponse
}

module.exports = get_bids_length;