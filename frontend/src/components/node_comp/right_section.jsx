import React, {useEffect, useState} from "react";
// import {connectImage} from "../../assets/node_assets/index"
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../contexts/AuthContext"

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { abi, contractAddress } from "../../contexts/constants"

const {REACT_APP_CP_KEY, REACT_APP_WALLET, REACT_APP_ADMIN_WALLET} = process.env

const RightN=()=>{

    const PK = "f41e951b8f989ceafed799b9e9fbde749f740c54d4450423130d8c156f687427"; // channel private key
    const Pkey = `0x${PK}`;
    const signer = new ethers.Wallet(Pkey);

    const { currentUser} = useAuth()

  const API_BASE = "http://localhost:5500";
    const [wallets, setWallets] = useState([])
    var selected = []

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isFetching, setIsFetching] = useState(false);
    const handleClose = () => setShowError(false);

    useEffect(() => {

        async function fetchData(){

            const data = await fetch(API_BASE + '/disconnected_nodes').then((res) => res.json())
    
            setWallets(data.arr)

            for(let i = 0; i<wallets.length; i++){
                selected.push(false)
            }

        }

        fetchData()

    }, [errorMessage]);

    function handleChange(index) {

        if(selected[index] === true){
            selected[index] = false
        }
        else{
            selected[index] = true
        }
        
    }

    async function send() {
        console.log(`Sending...`)
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          await provider.send('eth_requestAccounts', [])
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi, signer)
          try {
            const transactionResponse = await contract.sendViaCall("0xB7e9cD898838c0F8Fc331A431c7FaFCC1C3A176c", 1000000, {value: ethers.utils.parseEther('0.000000000001')})
            // await listenForTransactionMine(transactionResponse, provider)
            await transactionResponse.wait(1)
    
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log("install metamask first!!")
        }
    }

    // const sendNotification = async(address) => {
    //     try {
    //       const apiResponse = await PushAPI.payloads.sendNotification({
    //         signer,
    //         type: 1, // target
    //         identityType: 2, // direct payload
    //         notification: {
    //           title: `New connection established`,
    //           body: `A new connection was established between ${address} and ${currentUser.walletid}. Service charges may get reduced 💰.`
    //         },
    //         payload: {
    //           title: `New connection established`,
    //           body: `A new connection was established between ${address} and ${currentUser.walletid}. Service charges may get reduced 💰.`,
    //           cta: '',
    //           img: ''
    //         },
    //         // recipients: 'wallet_address', // recipient address
    //         channel: "eip155:5:0x24261832208AD8edaeC10B29584F816477F1dfa0", // your channel address
    //         env: 'staging'
    //       });
          
    //       // apiResponse?.status === 204, if sent successfully!
    //     //   console.log('API repsonse: ', apiResponse);
    //     } catch (err) {
    //       console.error('Error: ', err);
    //     }
    //   }

    async function handleSubmit(e) {
        setIsFetching(true);
        e.preventDefault()

        const arr = []

        console.log("wallets: ", wallets)
        console.log("selected: ", selected)

        for(let i=0; i<wallets.length; i++){
            if(selected[i] === true){
                arr.push(wallets[i])
            }
        }

        try {

            await send()
            await fetch(API_BASE + '/add_connections', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    arr: arr
                })
            }).then(res => res.json())

            // for (let i=0; i<arr.length; i++){
            //     await sendNotification(arr[i])
            // }

            setErrorMessage("Node(s) added successfully!!")
            setShowError(true)

        } catch(e) {
            setErrorMessage("Failed to add node(s)")
            setShowError(true)
            console.log(e)
        }
        finally{
            setIsFetching(false);
        }
    }

    return(
        <>
            <Modal show={showError} onHide={handleClose} id="error-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{errorMessage}</Modal.Title>
                </Modal.Header>
            </Modal>

            <div className="writt_N2">
                <h1 className="h1_right_N">Connect New Nodes</h1>
                <img crossOrigin='anonymous' src="https://drive.lienuc.com/uc?export=view&id=1XnEZbZ_iqqCQ_cDopsbwEemd2i2O4yQQ"  alt="err" style={{height: "15rem", width: "14rem", margin: "auto", marginTop: "2rem"}} ></img>
            </div>

            <div className="form_outer_N">
                <form style={{fontSize:"larger"}} onSubmit={handleSubmit}>

                    {
                        wallets.map((item, index) => 
                            <div className="input_connect_N">
                                <input type="checkbox" onChange={() => handleChange(index)} /> <span className="new-node_N">{item}</span>
                            </div>
                                
                        )
                    }

                    {
                        !wallets.length &&

                            <div>You are already connected with all your neighbouring nodes</div>
                    }

                    {
                        !!wallets.length &&

                            <div className="btn_Container_N">
                                <button className="btn_N" type="submit" disabled={isFetching}>
                                    {!isFetching && 
                                        <>Connect</>
                                    }
                                    {isFetching && 
                                        <>Connecting...</>
                                    }
                                </button>
                            </div>

                    }
                </form>
            </div>
        </>
    )
}

export default RightN;

