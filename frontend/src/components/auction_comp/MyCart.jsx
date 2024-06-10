import React from "react";
// import {eth, pngegg} from "../../assets/auction_assets/index";

const MyCart =(props)=>{

    const data = props.data
    // console.log(data)
    return (
      <>
        <div className="MyCard"> 

          {
            data.expiry!=="not found" &&

              <div className="hosted_by">End Date: {new Date(data.expiry).toISOString().slice(0, 19).replace('T', ' ')}</div>

          }

          {
            data.expiry==="not found" &&

              <div className="hosted_by">End Date: {data.expiry}</div>

          }
          
           <div className="listed_card_A">
            <div className="by_tag_A">Listed By - </div>
            <div className="wallet_A">Wallet Id: {data.bidder}</div>
           </div>
           <div className="energy_A">
            <div className="amount_energy"><span className="color_card_energy_A">Energy Amount: </span>{data.quantity} KWh</div>
            <div className="energy_image"><img crossOrigin="anonymous" src="https://drive.lienuc.com/uc?export=view&id=1J5D_8KKiCnBq0v3nnXq5_iPjr98t98iE" alt="err" height="60px"/></div>
           </div>
           <div className="current_bid_A">
           <div className="curr_bid"><span className="color_card_price_A">Unit Price: </span>{data.unit_price} ETH</div>
            <div className="energy_image"><img crossOrigin="anonymous" src="https://drive.lienuc.com/uc?export=view&id=1Ho7eCMwpHHOLmwhcAWZ3kcxPzZyfCmUq" alt="err" height="60px"/></div>
           </div>
           <div className="remaining">
           <button className="Bid_A" disabled={props.isFetching} onClick={() => props.handleClick(data.id, data.quantity, data.bidder, data.unit_price)}>
              {!props.isFetching && 
                  <>Buy</>
              }
              {props.isFetching && 
                  <>...</>
              }
            </button>
          </div>
        </div>
      </>
    )
}

export default MyCart;