PowerX is a Peer-2-Peer Energy trading DApp built on polygon blockchain, that facilitates sharing of locally generated electricity. This platform leverages blockchain technology to create a transparent and efficient marketplace for energy exchange.

## The problem PowerX solves
In 2023, 80% of the electricity is generated through non-renewable sources of energy. Even though we know what harm we are doing when it comes to adapting renewable sources, we all step back due to the investment it demands. So this can be done away with if we find a way to build a new marketplace in this renewable energy domain. Here we are, team PowerX, with the solution.

After the initial investment in Solar Panels, Wind Mills, and transmission infrastructure, the users can connect themselves with neighbors (Nodes) in the network and start trading excess stored energy.

PowerX comes into play as an intermediary portal for executing transactions, which decentralizes the system and does not require any middleman.

Through our application, the user creates a free account, connects Metamask wallet & activates Push Protocol for notifications.

Once the bid is created, all users of the App will receive a Push notification, about the entry details. This energy sale is now available to be bought. A transaction takes place between the entry creator and some other user who buys energy from an entry.

The buyer and seller must have some connection between them. This is necessary for both physical connections between homes and within the smart contract.

Thus PowerX allows peer-2-peer energy sharing between nodes (houses), in turn removing dependency on a central authority.

## FrontEnd Deployment

The Decentralized Energy Trading Platform is deployed at [powerX-UI](https://energy-trading-dapp.vercel.app/).

## Smart Contract

The smart contract is deployed on the Amoy Testnet of the Polygon blockchain. You can check it out here [powerX-smartContract](https://amoy.polygonscan.com/address/0x6352e17AcC9158A7b20ea421E21d6BedD578e3bB).

## Backend Deployment

-> Backend of PowerX - Techstack

* [Node JS](https://nodejs.org/en/)
* [Mongo DB](https://www.mongodb.com/)
* [Hardhat](https://hardhat.org/)
* [Solidity](https://soliditylang.org/)

-> About Backend

This is a Node.js app. Express is used for routing and creating API endpoints in server. We have used Mongo DB as our database. 
Smart contract is created in Solidity and deployed on Polygon Mumbai Testnet.

## Getting Started

How to set up the project locally:-

### Prerequisites

1. Clone the repo
   ```sh
   git clone https://github.com/SrishtiLodhi/Energy-Trading-DApp
   ```
2. Install NPM packages
   ```sh
   npm install --force
   ```
3. Update .env file
4. Use npm run start





