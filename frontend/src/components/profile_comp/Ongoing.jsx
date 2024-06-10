import React, {useState, useEffect} from "react";

const Ongoing =()=>{

    const [data, setData] = useState([]);

  const API_BASE = "https://energy-trading-dapp.onrender.com";

    // console.log("inside profile my live auctions")

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(API_BASE + '/user_auctions');
        const data = await response.json();
        setData(data.arr);
      };
  
      fetchData();
  
      const intervalId = setInterval(fetchData, 10000);
      return () => clearInterval(intervalId);
    }, []);

    return (
      <>

      <div className="hello_p">
      <h1 className="prof-table-title">My Live Entries 🏃‍♂️</h1>
      </div>
      <div className="tab_p scrolling-x-prof">
      <table className="table_p">
        <thead className="common-table-head-P">
            <tr>
                <th className="th_p">Qty (KWh)</th>
                <th className="th_p">Unit Price (ETH)</th>
                <th className="th_p">Expiry Date & Time</th>
            </tr>
        </thead>
        <tbody  className="tbody_P">
          {
            data.map((value,key)=>{
              return (
                <tr key={key}>
                  <td className="td_p">{value.quantity}</td>
                  <td className="td_p">{value.unit_price}</td>
                  <td className="td_p">{new Date(value.expiry).toISOString().slice(0, 19).replace('T', ' ')}</td>
                </tr>
              )
            })
          }

          {
            !data.length &&

              <tr>
                  <td className="td_p">No active entries found...</td>
              </tr>

          }

        </tbody>
      </table>
      </div>
      
    </>
    )
}

export default Ongoing;