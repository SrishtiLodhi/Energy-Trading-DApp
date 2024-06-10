import React from "react";
// import {runner} from "../../assets/auction_assets/index";

const OngoingAuctions = (props)=>{

  var data = props.data

    return (

    <>
      <div className="hello_A">
      <h1 className="back_text_decor_A">
        <span className="auctions_head_A">Ongoing Auctions</span>
        <img crossOrigin="anonymous" src="https://drive.lienuc.com/uc?export=view&id=1GEnAsvC5nxFEiS6PgN2ud3v4eeZKcnDm" alt="err" className="ongoing_img_A"/>
      </h1>
      </div>
      <div className="tab_A">
      <table className="table_A">
        <thead className="thead_A">
            <tr>
                <th>Qty (KWh)</th>
                <th>Unit Price (ETH)</th>
                <th>Listed By</th>
                <th>End Date</th>
                <th>Checkout</th>
            </tr>
        </thead>
        <tbody>
          {
            data.map((value,key)=>{
              return (
                <tr key={key}>
                  <td className="table_data_A">{value.quantity}</td>
                  <td className="table_data_A">{value.unit_price}</td>
                  <td className="table_data_A">{value.bidder}</td>
                  <td className="table_data_A">{  new Date(value.expiry).toISOString().slice(0, 19).replace('T', ' ') }</td>
                  <td className="table_data_A">
                    <button className="Bid_A" disabled={props.isFetching} onClick={() => props.handleClick(value.id, value.quantity, value.bidder, value.unit_price)}>
                      {!props.isFetching && 
                          <>Buy</>
                      }
                      {props.isFetching && 
                          <>...</>
                      }
                    </button>
                  </td>
                </tr>
              )
            })
          }

          {
            !data.length &&

              <tr>
                  <td className="td_p">Loading Auctions...</td>
              </tr>

          }

        </tbody>
      </table>
      </div>

    </>
    )
}

export default OngoingAuctions;