// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract powerx{
    address payable public /* immutable */ i_owner;

    constructor() {
        i_owner = payable(msg.sender);
    }

    // schema for bids
    struct bid{
        uint256 quantity;
        uint256 unit_price;
        address payable bidder;
        uint256 expiry;
    }
    // schema for transactions
    struct transaction{
        uint256 service_charge;
        uint256 energy_cost;
        uint256 total_cost;
        uint256 quantity;
        uint256 auctioned_bid;
        address payable buyer;
    }

    // schema for service charge
    struct service_provider{
        uint service_charge;
        address payable node;
    }

    // adjacency list for nodes graph connections
    mapping(address => address[]) public nodes_adj_list;
    // checker if a node exists in the network 
    mapping(address => bool) private nodes;
    // list of all bids
    bid[] public bids;
    // list of all executed transactions
    transaction[] public transactions;

    // function to get length of bids array
    function get_bid_length() public view returns (uint256 length) {
        return bids.length;
    }

    // function to get length of transactions array 
    function get_transactions_length() public view returns (uint256) {
        return transactions.length;
    }

    // function to get the connected nodes to a node 
    function get_node_by_address(address val) public view returns (address[] memory){
        require (nodes[val] == true);
        return nodes_adj_list[val];
    }

    // function to add a node 
    function add_node(address val, address[] memory connected_nodes) public {
        for(uint i=0;i<connected_nodes.length;i++){
            require(nodes[connected_nodes[i]] == true);
        }
        nodes_adj_list[val] = connected_nodes;
        nodes[val] = true;
        for(uint i=0;i<connected_nodes.length;i++){
            nodes_adj_list[connected_nodes[i]].push(val);
        }
    }

    // function to add a new connection between two existing nodes
    function add_connection(address val1, address val2) public {
        require(nodes[val1] == true);
        require(nodes[val2] == true);
        nodes_adj_list[val1].push(val2);
        nodes_adj_list[val2].push(val1);
    }

    // function to create a bid
    function create_bid(uint256 qty, uint256 price, address payable bidder, uint expiry) public {
        require(nodes[bidder] == true);
        bids.push(bid(qty, price, bidder, expiry));
    }

    // send eth function
    // TODO REMOVE PUBLIC
    function sendViaCall(address payable _to, uint256 value) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call{value: value}("");
        require(sent, "Failed to send Ether");
    }

    // function to execute a transaction
    function execute_transaction(uint256 qty, address payable buyer, uint256 bid_id, service_provider[] memory service_providers) public payable {
        require(nodes[buyer] == true);
        require(bids[bid_id].quantity >= qty);
        require(bids[bid_id].expiry >= block.timestamp);
        uint256 service = 0;
        for(uint256 i=0;i<service_providers.length;i++){
            service += service_providers[i].service_charge;
        }
        uint256 energy_cost = qty * bids[bid_id].unit_price;
        require(msg.value >= service + energy_cost);
        sendViaCall(bids[bid_id].bidder, energy_cost);
        for(uint256 i=0;i<service_providers.length;i++){
            sendViaCall(service_providers[i].node, service_providers[i].service_charge);
        }
        bids[bid_id].quantity -= qty;
        transactions.push(transaction(service, energy_cost, service + energy_cost, qty, bid_id, buyer));
    }

    function withdraw_profit() public payable {
        require (msg.sender == i_owner);
        sendViaCall(i_owner, address(this).balance);
    }
}