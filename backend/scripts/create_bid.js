const { ethers, getNamedAccounts } = require("hardhat")

// quantity -> integer
// price -> integer
// bidder -> address
// expiry -> integer
async function create_bid(quantity, price, bidder, expiry) {
    const { deployer } = await getNamedAccounts()
    const powerx = await ethers.getContract("powerx", deployer)
    // console.log(`Got contract PowerX at ${powerx.address}`)
    // console.log("Calling contract...")
    // , {gasLimit: 29970676}
    const transactionResponse = await powerx.create_bid(quantity, price, bidder, expiry)
    await transactionResponse.wait()
    // console.log(transactionResponse)
}

module.exports = create_bid;