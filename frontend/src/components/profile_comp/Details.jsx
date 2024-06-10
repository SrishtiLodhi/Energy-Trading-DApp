import React from "react";
import { useAuth } from "../../contexts/AuthContext"
// import {profile_img} from "../../assets/profile_assets/index"

const Details=()=>{  
  
    const { currentUser} = useAuth()

    return (
        <>
        <div className="profff_p">
          {/* <img src={profile_img} className="image_p img_p" alt=""></img> */}
          <img crossOrigin="anonymous" src="https://drive.lienuc.com/uc?export=view&id=1zz36AKQwtJy-YDghcwlHIxrno7tEPCBK" className="image_p img_p" alt=""></img>
          </div>
          <div className="proff2_p">
            <div className="user-name-P">Hi {currentUser.name}. Welcome back!</div>
            <div className="details-email-wallet-P">Logged in: {currentUser.email}</div>
            <div className="details-email-wallet-P">Wallet_id: {currentUser.walletid}</div>
          </div>
        </>
    );
};

export default Details;