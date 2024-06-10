import React, {useState} from 'react';
import { OnboardingButton } from './setupMetamask';
import { useAuth } from "../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
// import { useWeb3React } from "@web3-react/core";

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

import { abi, contractAddress } from "../../contexts/constants"

const {REACT_APP_CP_KEY, REACT_APP_WALLET, REACT_APP_ADMIN_WALLET} = process.env

function MyVerticallyCenteredModal(props) {

  const PK = "f41e951b8f989ceafed799b9e9fbde749f740c54d4450423130d8c156f687427"; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  // const { library } = useWeb3React();

  const [errorMessage, setErrorMessage] = useState("");

  const [signName, setSignName] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const { signup } = useAuth()

  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const { login } = useAuth()

  const [wallet, setWallet] = useState("wallet unavailable");
  const navigate = useNavigate()

  const [showError, setShowError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleClose = () => setShowError(false);
  // var { account, library, chainId } = useWeb3React();
  // console.log('--------library------------------->')
  // console.log(library)

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

  // const sendNotification = async() => {
  //   try {
  //     const apiResponse = await PushAPI.payloads.sendNotification({
  //       signer,
  //       type: 1, // target
  //       identityType: 2, // direct payload
  //       notification: {
  //         title: `New node added in network`,
  //         body: `If you have connection with node: ${wallet}, then pair-up via connections page.`
  //       },
  //       payload: {
  //         title: `New node added in network`,
  //         body: `If you have connection with node: ${wallet}, then pair-up via connections page.`,
  //         cta: '',
  //         img: ''
  //       },
  //       channel: "eip155:5:0x24261832208AD8edaeC10B29584F816477F1dfa0", // your channel address
  //       env: 'staging'
  //     });
      
  //     // apiResponse?.status === 204, if sent successfully!
  //     // console.log('API repsonse: ', apiResponse);
  //   } catch (err) {
  //     console.error('Error: ', err);
  //   }
  // }
  
  
  async function handleSignSubmit(e) {
    setIsFetching(true);
    e.preventDefault()

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()

    try {

      await send()
      await signup(signEmail, signPassword, signName, wallet)
      await PushAPI.channels.subscribe({
        signer: signer,
        channelAddress: "eip155:5:0x24261832208AD8edaeC10B29584F816477F1dfa0", // channel address in CAIP
        userAddress: `eip155:5:${wallet}`, // user address in CAIP
        onSuccess: () => {
         console.log('opt in success');
        },
        onError: () => {
          console.error('opt in error');
        },
        env: 'staging'
      })

      // await sendNotification()

      navigate("/profile")
    } catch(e) {
      setErrorMessage(e.message)
      setShowError(true)
    }
    finally{
      setIsFetching(false);
    }
  }

  async function handleLogSubmit(e) {
    setIsFetching(true);
    e.preventDefault()

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // await provider.send('eth_requestAccounts', [])
    // const signer = provider.getSigner()

    console.log(signer)
    try {
      await login(logEmail, logPassword, wallet)

      // await PushAPI.channels.subscribe({
      //   signer: signer,
      //   channelAddress: `eip155:5:${REACT_APP_WALLET}`, // channel address in CAIP
      //   userAddress: `eip155:5:${wallet}`, // user address in CAIP
      //   onSuccess: () => {
      //    console.log('opt in success');
      //   },
      //   onError: () => {
      //     console.error('opt in error');
      //   },
      //   env: 'staging'
      // })

      navigate("/profile")
    } catch(e) {
      setErrorMessage(e.message)
      setShowError(true)
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
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Sign-in to PowerX
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body_h'>
            <div>
    
                <OnboardingButton handleClick={setWallet}/>
    
            </div>
    
            <div className="main">  	
                <input type="checkbox" id="chk" aria-hidden="true" />
    
                <div className="signup">
                    <form style={{marginBottom: "5rem"}} 
                        onSubmit={handleSignSubmit}
                    // action="/login" method="POST"
                    >
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className="wallet-id" type="text" name="walletid" readOnly required value={wallet} />
                        <input type="text" name="name" placeholder="Name" required value={signName} onChange={(e) => setSignName(e.target.value)}/>
                        <input type="email" name="email" placeholder="Email" required value={signEmail} onChange={(e) => setSignEmail(e.target.value)}/>
                        <input type="password" name="password" placeholder="Password" required value={signPassword} onChange={(e) => setSignPassword(e.target.value)}/>
                        <button type='submit' disabled={isFetching}>
                          {!isFetching && 
                            <>Sign Up</>
                          }
                          {isFetching && 
                              <>Loading</>
                          }
                        </button>
                    </form>
                </div>
    
                <div className="login">
                    <form action="/login" 
                      // method="POST" 
                      onSubmit={handleLogSubmit}
                    >
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input className="wallet-id" type="text" name="walletid" readOnly value={wallet} required onChange={(e) => setWallet(e.target.value)}/>
                        <input type="email" name="email" placeholder="Email" required value={logEmail} onChange={(e) => setLogEmail(e.target.value)}/>
                        <input type="password" name="password" placeholder="Password" required value={logPassword} onChange={(e) => setLogPassword(e.target.value)}/>
                        <button type='submit' disabled={isFetching}>
                          {!isFetching && 
                            <>Login</>
                          }
                          {isFetching && 
                              <>Loading</>
                          }
                        </button>
                    </form>
                </div>
            </div>

          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
}

export default MyVerticallyCenteredModal;