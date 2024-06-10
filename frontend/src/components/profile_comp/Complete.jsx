import React, {useState, useEffect} from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const Complete =()=>{

  const API_BASE = "http://localhost:5500";

    const [buy, setBuy] = useState([]);
    const [sell, setSell] = useState([]);

    // console.log('inside complete')
    
    useEffect(() => {

        const fetchData = async () => {
          const response = await fetch(API_BASE + '/transactions_buy');
          const response2 = await fetch(API_BASE + '/transactions_sell');
          const data = await response.json();
          const data2 = await response2.json();
          setBuy(data.arr);
          setSell(data2.arr);
        };
  
        fetchData();

    }, []);


    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Buy', value: '1' },
        { name: 'Sell', value: '2' }
    ];

    return (
        <>
        
        <div className="hello_p">

            {radioValue === '1' && 
            
                <h1 className="prof-table-title">Buy History 💸</h1>
            }

            {radioValue === '2' && 
            
                <h1 className="prof-table-title">Sell History ⚡</h1>
            }

            <ButtonGroup className="buy-sell-btn">
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
          
          <div className="tab_p scrolling-x-prof">

            {radioValue === '1' && 
            
                <table className="table_p">
                    <thead className="common-table-head-P">
                        <tr>
                            <th className="th_p">Bought From</th>
                            <th className="th_p">Qty (KWh)</th>
                            <th className="th_p">Cost (ETH)</th>
                        </tr>
                    </thead>
                    <tbody  className="tbody_P">

                        { 
                            buy.map((value)=>{
                                return (
                                    <tr>
                                        <td className="td_p">{value.bidder}</td>
                                        <td className="td_p">{value.quantity}</td>
                                        <td className="td_p">{value.total_cost}</td>
                                    </tr>
                                )
                            })
                        }


                        {!buy.length && 

                            <tr>
                                <td className="td_p">No energy bought</td>
                            </tr>
                        }

                    </tbody>
                </table>
            }

            {radioValue === '2' && 
            
                <table className="table_p">
                    <thead className="common-table-head-P">
                        <tr>
                            <th className="th_p">Sold to</th>
                            <th className="th_p">Qty (KWh)</th>
                            <th className="th_p">Price (ETH)</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_P">

                        {
                           sell &&

                            sell.map((value)=>{
                                return (
                                    <tr>
                                        <td className="td_p">{value.buyer}</td>
                                        <td className="td_p">{value.quantity}</td>
                                        <td className="td_p">{value.total_cost}</td>
                                    </tr>
                                )
                            })
                        }

                        {
                            !sell.length && 

                                <tr>
                                    <td className="td_p">No energy sold</td>
                                </tr>
                        }

                    </tbody>
                </table>
            }

            
          </div>
        </>
        
    )
}


export default Complete;