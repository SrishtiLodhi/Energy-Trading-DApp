import React, {useState, useEffect, useRef} from "react";
import {MyCart, Menu, OngoingAuctions, Example} from "../components/auction_comp";
import Modal from 'react-bootstrap/Modal';
import '../css/auction_css/index.css';
import '../css/auction_css/modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {back_auction} from "../assets/auction_assets/index";

export default function Auction() {
    
    const [data, setData] = useState([]);
  const API_BASE = "http://localhost:5500";

    const [smShow, setSmShow] = useState(false);

    const modal_bid_id = useRef(0)
    const modal_max = useRef(0)
    const modal_bidder = useRef('')
    const modal_unit_price = useRef(0)
    const path = useRef([])

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isFetching, setIsFetching] = useState(false);

    // console.log("inside ongoing auctions")

    const handleClose = () => {
      setShowError(false);
    }

    async function handleClick(bid_id, threshold, bidder, unit_price) {

      //loading button.............

      if(bid_id === -1){
        setShowError(true)
        setErrorMessage("Auction not present!")
        return;
      }

      setIsFetching(true);

      modal_bid_id.current = bid_id;      //maybe not needed to pass to modal
      modal_max.current = threshold;
      modal_bidder.current = bidder;
      modal_unit_price.current = unit_price;
      
      const data = await fetch(API_BASE + `/get_graph/${bidder}/${bid_id}`).then((res) => res.json())
      // const data = {error: "error occurred"}

      if(data.hasOwnProperty('error')){
        //display modal
        setShowError(true)
        setErrorMessage(data.error)
      }
      else{
        path.current = data.path
        setSmShow(true)
      }

      // console.log(path)
      setIsFetching(false);

    }

    useEffect(() => {

        const fetchData = async () => {
          const response = await fetch(API_BASE + '/auctions');
          const data = await response.json();
          setData(data.arr);
        };
  
        fetchData();
  
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
        
    }, []);

    
    if(data.length>0){
        var data0 = data[0]
    }
    else{
        data0 = {expiry: "not found", bidder: "not found", quantity: "null", unit_price: "not found", id: -1}
    }

    if(data.length>1){
        var data1 = data[1]
    }
    else{
        data1 = {expiry: "not found", bidder: "not found", quantity: "null", unit_price: "not found", id: -1}
    }

    if(data.length>2){
        var data2 = data[2]
    }
    else{
        data2 = {expiry: "not found", bidder: "not found", quantity: "null", unit_price: "not found", id: -1}
    }
    
    return (
        <>
        <Modal show={showError} onHide={handleClose} id="error-modal">
            <Modal.Header closeButton>
            <Modal.Title>{errorMessage}</Modal.Title>
            </Modal.Header>
        </Modal>
        <div className="body_A">
            <div>
                <img crossOrigin="anonymous" src="https://drive.lienuc.com/uc?export=view&id=17o9LevTlkOewpJMS4-8Q6oIM4X97s_UQ" alt="" className="back_auction_A"/>
            </div>
            <div className="mnu_A">
                <Menu/>
            </div>

            <div className="mid_A">
                <div className="top_auctions">
                <h2 className="top_head_A"> Top 3 Entries</h2>
                </div>
                <div className="top3_A">
                  <MyCart data={data0} setSmShow={setSmShow} smShow={smShow} handleClick={handleClick} isFetching={isFetching}/>
                  <MyCart data={data1} setSmShow={setSmShow} smShow={smShow} handleClick={handleClick} isFetching={isFetching}/>
                  <MyCart data={data2} setSmShow={setSmShow} smShow={smShow} handleClick={handleClick} isFetching={isFetching}/>
                </div>
            </div>

            <div className="bottom_A">
              <div className="ongoing_A">
               <OngoingAuctions data={data} handleClick={handleClick} isFetching={isFetching}/>
              </div>
            </div>
        </div>

        <Example setSmShow={setSmShow} smShow={smShow} modal_bid_id={modal_bid_id} modal_max = {modal_max} modal_bidder = {modal_bidder} path = {path} modal_unit_price = {modal_unit_price}/>

        </>
    )
}