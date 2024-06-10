const { network } = require("hardhat")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = 5001

    log("----------------------------------------------------")
    log("Deploying PowerX and waiting for confirmations...")
    console.log(`deployer: ${deployer.address}`)
    const powerxDeploy = await deploy("powerx", {
        from: deployer,
        log: true,
    })
    log(`PowerX deployed at ${powerxDeploy.address}`)
}

module.exports.tags = ["all", "powerx"]