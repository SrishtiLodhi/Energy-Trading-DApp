if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5500 || process.env.PORT
const saltRounds = 10;

const add_connection = require ("./scripts/add_connection");
const add_node = require ("./scripts/add_node");
const create_bid = require("./scripts/create_bid");
const get_bids = require("./scripts/get_bids");
const get_node = require("./scripts/get_node");
const get_transactions = require("./scripts/get_transactions");
const get_bids_length = require("./scripts/bids_length");
const shortest_path = require("./scripts/shortest_path");
const get_transactions_length = require("./scripts/transaction_length");
const execute_transaction = require("./scripts/execute_transaction");

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use(express.static(__dirname + "/public"));

var connected = false;
var walletid = 'wallet unavailable';
var email = '';
var name = '';

var path = []
var current_bid_id = 0;

const uri = `${process.env.MONGO_URI}`;

mongoose.set("strictQuery", false);
 
console.log(uri,"URL")
async function mongoose_connect() {
  console.log(uri,"URL")
  await mongoose.connect(uri);
}

mongoose_connect().catch(err => console.log(err));

const accountSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  walletid: String,
});

const Account = mongoose.model('Account', accountSchema);

async function push_user_bids() {

  var length = await get_bids_length()
  length = length.toNumber()
  var arr = [];
  var bid;
  var unit_price, expiry, quantity, bidder;

  for (let index = 0; index < length; index++) {

    bid = await get_bids(index)

    bidder = bid.bidder.toString().toLowerCase()
    expiry = bid.expiry.toNumber()
    unit_price = (bid.unit_price.toNumber()) / (10 ** 18)
    quantity = bid.quantity.toNumber()

    if (bidder === walletid && expiry > Date.now() && quantity > 0){

      // console.log('in')
      arr.push({unit_price: unit_price, expiry: expiry, quantity: quantity});
    }

  }

  return arr

}

async function push_bids() {

  var length = await get_bids_length()
  length = length.toNumber()
  var arr = [];
  var bid;
  var unit_price, expiry, quantity, bidder;

  for (let index = 0; index < length; index++) {

    bid = await get_bids(index)

    bidder = bid.bidder.toString().toLowerCase()
    expiry = bid.expiry.toNumber()
    unit_price = (bid.unit_price.toNumber() / (10 ** 18))
    quantity = bid.quantity.toNumber()

    if (bidder !== walletid && expiry > Date.now() && quantity > 0){

      // console.log('in')
      arr.push({id: index, unit_price: unit_price, expiry: expiry, quantity: quantity, bidder: bidder});   //also pass the bid id
    }

  }

  return arr
}

async function push_buy_transactions() {

  var length = await get_transactions_length()
  length = length.toNumber()
  var transaction;
  var total_cost, bid, id, quantity, bidder;

  var arr = [];
  var buy = 0;

  for (let index = 0; index < length; index++) {

    transaction = await get_transactions(index);
    if (transaction.buyer.toString().toLowerCase() === walletid){
      id = transaction.auctioned_bid.toNumber()
      bid = await get_bids(id)
      bidder = bid.bidder.toString().toLowerCase()
      console.log(transaction, 'transaction')
      console.log(transaction.total_cost, 'transaction.total_cost')
      console.log(transaction.total_cost.toString(), 'transaction.total_cost'); // Print the BigNumber as a string
console.log(Number(transaction.total_cost.toString()), 'transaction.total_cost as Number'); // Convert BigNumber to Number
     
      // total_cost = (transaction.total_cost.toNumber())/(10 ** 18)
      const totalCostStr = transaction.total_cost.toString(); // Convert to string

if (totalCostStr.length > 25) {
  console.log("Total cost is too large to safely convert to a Number");
  // Handle the situation where the total cost is too large
} else {
  const totalCostNum = Number(totalCostStr); // Convert to Number

  if (!isNaN(totalCostNum)) {
    var total_cost = totalCostNum / 1e18; // Convert to Ether

  } else {
    console.log("Total cost is not a valid number");
    
    // Handle the situation where the total cost is not a valid number
  }
}

      console.log(total_cost, 'total_cost')
      quantity = transaction.quantity.toNumber()
      console.log(quantity, 'quantity')
      buy+=quantity
      console.log(buy, 'buy')
      arr.push({total_cost: total_cost, quantity: quantity, bidder: bidder});

    }

  }
  console.log(arr, "arr atlast")
  return [arr, buy]
}

async function push_sell_transactions() {


  var length = await get_transactions_length()
  length = length.toNumber()
  var transaction;
  var total_cost, bid, id, quantity, seller, buyer;

  var arr = [];
  var sell = 0

  for (let index = 0; index < length; index++) {

    transaction = await get_transactions(index);
    id = transaction.auctioned_bid.toNumber()
    bid = await get_bids(id)
    seller = bid.bidder.toString().toLowerCase()

    if (seller === walletid){
      buyer = transaction.buyer.toString().toLowerCase()
       // total_cost = (transaction.total_cost.toNumber())/(10 ** 18)
       const totalCostStr = transaction.total_cost.toString(); // Convert to string

       if (totalCostStr.length > 25) {
         console.log("Total cost is too large to safely convert to a Number");
         // Handle the situation where the total cost is too large
       } else {
         const totalCostNum = Number(totalCostStr); // Convert to Number
       
         if (!isNaN(totalCostNum)) {
           var total_cost = totalCostNum / 1e18; // Convert to Ether
       
         } else {
           console.log("Total cost is not a valid number");
           // Handle the situation where the total cost is not a valid number
         }
       }
     // total_cost = (transaction.total_cost.toNumber())/(10 ** 18)
      quantity = transaction.quantity.toNumber()
      sell+=quantity

      arr.push({total_cost: total_cost, quantity: quantity, buyer: buyer});

    }

  }

  return [arr, sell]
}

async function get_connected_nodes(wallet) {

  const arr = []
  //console.log(wallet, "wallet")
  const data = await get_node(wallet)

  for (let i=0; i<data.length; i++){
    arr.push(data[i].toString().toLowerCase())
  }

  return arr
}

async function push_nodes(wallet, arr) {

  for (let i=0; i<arr.length; i++){
    await add_connection(wallet, arr[i])
  }

  return {}
}

app.get('/profile', (req, res) => {
  if(connected === false){
    res.json({error: "Not signed in"})
  }
  else{
    res.json({walletid: walletid, email: email, name: name});
  }
})

app.post('/profile', (req, res) => {

  // do not allow anyone to login without connecting wallet
  const data = JSON.parse(JSON.stringify(req.body))
  if (data.walletid == 'wallet unavailable'){
    res.json({error: 'Wallet is not connected!'});  //MUST CONNECT TO METAMASK FIRST!, send Alert
  }
  else{

    var len = Object.keys(data).length;
// console.log(len, "len")
    if(len === 4){
      //req for new signin
      Account.findOne({ email: data.email }, function (err, acc) {
        if (err) return console.log(err);

        if (acc === null) {

          Account.findOne({ walletid: data.walletid }, function (err, acc) {
            if (err) return console.log(err);
    
            if (acc === null) {

                connected = true;
                email = data.email;
                name = data.name;
                walletid = data.walletid;

                bcrypt.hash(data.password, saltRounds).then((hashed) => {
          
                  const newUser = new Account({ 
                      name: name,
                      email: email,
                      password: hashed,     //save the hash
                      walletid: walletid 
                  });
                
                  const func = async () => {
                    await newUser.save();
                    add_node(walletid, [])        //
                  }
            
                  func();

                })

                res.json({walletid: walletid, email: email, name: name});
            }
            else{
              res.json({error: 'Wallet registered with another account!'})
            }
          });

        }
        else{
          res.json({error: 'Email already exists!'})     //Email already exists
        }

      });

    }
    else{
      //req for login
    
      Account.findOne({ email: data.email }, function (err, acc) {
        if (err) return console.log(err);

        if (acc === null) {
          // doc may be null if no document matched

          res.json({error: 'Email not found!'});     //Email could not be found!
        }
        else if (acc.walletid.toLowerCase() !== data.walletid.toLowerCase()){

          res.json({error: 'Wrong wallet address!'});     //Wrong wallet address
        }
        else{
          bcrypt.compare(data.password, acc.password).then(function (result) {
            
            if(result === true){
              
                //passwords match

                connected = true;
                email = data.email;
                name = acc.name;
                walletid = data.walletid;

                res.json({walletid: walletid, email: email, name: name});
            }
            else{

                res.json({error: 'Wrong password!'});     //passwords don't match
            }

          })

        }
      });


    }
  }

})

app.post('/logout', (req, res) => {

  connected = false;
  email = '';
  name = '';
  walletid = 'wallet unavailable';

  res.json({});
})

app.listen(port, () => {
  console.log(`App running on ${port}`)
})


app.get('/auctions', (req, res) => {

  push_bids().then((arr) => {
    // console.log(arr)
    res.json({arr: arr});
  })

})

app.post('/auctions', (req, res) => {
  // quantity, price, bidder, expiry
  const data = JSON.parse(JSON.stringify(req.body))

  quantity = data.quantity
  price = data.price * (10 ** 18)            //converted to Wei
  bidder = walletid             //string
  expiry = data.expiry          //convert to UNIX time

  create_bid(quantity, price, bidder, expiry)

  res.json({})
})


app.get('/user_auctions', (req, res) => {

  push_user_bids().then((arr) => {
    // console.log(arr)
    res.json({arr: arr});
  })

})

app.get('/transactions_buy', (req, res) => {

  //send seller info
  push_buy_transactions().then((arr) => {
    res.json({arr: arr[0], amt: arr[1]});
  })

})

app.get('/transactions_sell', (req, res) => {

  //send buyer info
  push_sell_transactions().then((arr) => {
     console.log(arr, "sell")
    res.json({arr: arr[0], amt: arr[1]});
  })

})

app.get('/connected_nodes', (req, res) => {
 // console.log(walletid, "walletid")
  get_connected_nodes(walletid).then((arr) => {
//console.log(arr, "arr")
    res.json({arr: arr})
  })
  //res.json({arr: []})
})

app.get('/disconnected_nodes', (req, res) => {
  
  get_node(walletid).then((arr) => {

    // res.json({arr: arr})
console.log(arr, "arr")
    Account.find({}, function (err, docs) {

      const nodes = []
      for(let i=0; i<arr.length; i++){
        nodes.push(arr[i].toString().toLowerCase())
      }

      const answer = []

      for(let i=0; i<docs.length; i++){
        if((!nodes.includes(docs[i].walletid)) && (walletid !== docs[i].walletid)){

          answer.push(docs[i].walletid)
        }
      }
      console.log(arr, "final connected arr arr")
      res.json({arr: answer})
    })
  })

})


app.post('/add_connections', (req, res) => {
  
  const data = JSON.parse(JSON.stringify(req.body))

  const arr = data.arr

  console.log(arr, walletid)

  push_nodes(walletid, arr).then((data) => res.json({}))

})

app.get('/get_graph/:bidder/:bid_id', (req, res) => {
  
  current_bid_id = req.params.bid_id
  const destination = req.params.bidder
  const source = walletid
  
  var graph = {}
  
  Account.find({}, async function (err, docs) {
    
    for(let index=0; index<docs.length; index++){
      
      var nodes = await get_connected_nodes(docs[index].walletid)
      graph[docs[index].walletid] = nodes
      
    }
    
    // console.log(graph)
    
    shortest_path(graph, source, destination).then((data) => {

      if(data === null || data.length === 0){
        
        res.json({error: "No connection between you and seller"})
      }
      else{
        
        path = data.slice(1, -1)
        res.json({path: path})
      }

    })

  })

})

app.post('/transaction', (req, res) => {
  
  const data = JSON.parse(JSON.stringify(req.body))
  const energy = data.energy
  const provider = []

  get_bids(current_bid_id).then((bid) => {

    var totalCost = energy * (bid.unit_price.toNumber())
    
    for(let i = 0; i<path.length; i++){
      var currentNode = []
      serviceCharge = 100000000
      currentNode.push(serviceCharge)
      totalCost += serviceCharge
      currentNode.push(path[i])
      //console.log(currentNode)
      provider.push(currentNode)
    }

    totalCost = (totalCost) / (10 ** 18)

    execute_transaction(energy, walletid, current_bid_id, provider, totalCost)
    res.json({})

  })

})
