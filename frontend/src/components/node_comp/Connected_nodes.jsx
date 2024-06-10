import React, {useState, useEffect} from "react";
// import {linkImg} from "../../assets/node_assets/index"

const ConnectN=()=>{

    const [wallets, setWallets] = useState([]);

  const API_BASE = "http://localhost:5500";

    // console.log("inside connected nodes")

    useEffect(() => {

        fetch(API_BASE + '/connected_nodes')
            .then(res => res.json())
            .then(data => setWallets(data.arr))

    }, []);

    return (
        <>
          <div className="leftLow_N">
            <div className="writt_N">
                <h1 className="header-intro2_N">Connected Nodes</h1>
            </div>
            <div className="WalletLists_N">
                    {
                        !wallets.length &&
    
                            <div className="list-item-N list_N">No connected nodes found</div>
                    }
                <div className="list_N">
                {wallets.map(ids => 
                    <div className="WIds_N">
                        <img crossOrigin="anonymous" src="https://drive.lienuc.com/uc?export=view&id=1gvB9AL9ZhXy0fsPyJ7u8OHqhSqmn6Pkz"  alt="err" className="energy-connect_N"/>
                        <div className="list-item-N">{ids}</div>
                    </div>)}
                </div>

            </div>
          </div>
        </>
    )
}

export default ConnectN;