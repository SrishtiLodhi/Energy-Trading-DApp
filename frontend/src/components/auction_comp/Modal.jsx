import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../contexts/AuthContext"

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

import { abi, contractAddress } from "../../contexts/constants"

const {REACT_APP_CP_KEY, REACT_APP_WALLET, REACT_APP_ADMIN_WALLET} = process.env

function Example(props) {

  const PK = "f41e951b8f989ceafed799b9e9fbde749f740c54d4450423130d8c156f687427"; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);
  
  const [energy, setEnergy] = useState("");
  const { currentUser} = useAuth()

  const [isFetching, setIsFetching] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

const API_BASE = "http://localhost:5500";

  const handleClose = () => {
    setShowError(false);
    props.setSmShow(false)
  }

  function net_price() {
    var total = 0.000000000001;
    var serviceCharge = 0.0000000001;

    console.log(energy)
    console.log(props.modal_unit_price.current)
    
    total += (energy * props.modal_unit_price.current)

    for(let i = 0; i<props.path.current.length; i++){
      total += serviceCharge
    }

    console.log(total)
    return total

  }

  async function send() {
    console.log(`Sending...`)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.sendViaCall("0xB7e9cD898838c0F8Fc331A431c7FaFCC1C3A176c", net_price()*(10**18), {value: ethers.utils.parseEther(`${net_price()}`)})
        // await listenForTransactionMine(transactionResponse, provider)
        await transactionResponse.wait(1)

      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("install metamask first!!")
    }
  }

  // const sendNotification = async() => {
  //   try {
  //     const apiResponse = await PushAPI.payloads.sendNotification({
  //       signer,
  //       type: 1, // target
  //       identityType: 2, // direct payload
  //       notification: {
  //         title: `Transaction Completed`,
  //         body: `${currentUser.walletid} bought ${energy} KWh from ${props.modal_bidder.current}`
  //       },
  //       payload: {
  //         title: `Transaction Completed`,
  //         body: `${currentUser.walletid} bought ${energy} KWh from ${props.modal_bidder.current}`,
  //         cta: '',
  //         img: ''
  //       },
  //       // recipients: 'eip155:5:wallet_address', // recipient address
  //       channel: "eip155:5:0x24261832208AD8edaeC10B29584F816477F1dfa0", // your channel address
  //       env: 'staging'
  //     });
      
  //     // apiResponse?.status === 204, if sent successfully!
  //     // console.log('API repsonse: ', apiResponse);
  //   } catch (err) {
  //     console.error('Error: ', err);
  //   }
  // }

  async function handleSubmit(e) {
    setIsFetching(true);
    e.preventDefault()

    try {

        await send()
        await fetch(API_BASE + '/transaction', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                energy: energy
            })
        }).then(res => res.json())

        //await sendNotification()
        
        setShowError(true)
        setErrorMessage("Transaction completed")

    } catch {
      setErrorMessage("Failed transaction")
    }
    finally{
      setIsFetching(false);
    }
}

  return (
    <>
      <Modal show={showError} onHide={handleClose} id="error-modal">
        <Modal.Header closeButton>
          <Modal.Title>{errorMessage}</Modal.Title>
        </Modal.Header>
      </Modal>
      <Modal
        size="lg"
        show={props.smShow}
        onHide={() => props.setSmShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Buy Energy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="body-modal-auction">

            Maximum Qty of Energy available: {props.modal_max.current} KWh

            <br/>
            Energy Source node: {props.modal_bidder.current}
            <br/>
            Energy Destination node: You {` (${currentUser.walletid}) `}
            <br/>
            In-Between Nodes:
            {
              !props.path.current.length &&

                <span> None</span>
            }
            <br/>
            {
              props.path.current.map((address) => <div> {address} --- 0.001 MATIC</div>)
            }
            <br/>

          <form onSubmit={handleSubmit}>

            {/* DO NOT ALLOW MORE THAN THRESHOLD */}
            <input type="number" placeholder='Energy in KWH' className="input_box_a" min={0} max={props.modal_max.current} required value={energy} onChange={(e) => setEnergy(e.target.value)}/>
            <br />

            <div className="inpBtn_p">
                <button className="model-btn_p" type="submit" disabled={isFetching}>
                  {!isFetching && 
                      <>Buy</>
                  }
                  {isFetching && 
                      <>Processing...</>
                  }
                </button>
            </div>

          </form>

          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
