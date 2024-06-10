import React, { useState } from "react";
import {  Menu, Details, Stats, Ongoing, Complete, BidModal } from '../components/profile_comp/index';
import '../css/profile_css/prof_index.css';
import { useNavigate } from "react-router-dom"
// import {eth} from "../assets/profile_assets/index"

export default function Profile() {

    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

    return (
        <div className="profile_back">
          <div>
            <img crossOrigin="anonymous" src="https://drive.lienuc.com/uc?export=view&id=1MJ2LFcL-GNz1g4044AeZj-9nEYhJD2Un" className="background-image-P" alt=""/>
          </div>
          <div className="mnu_p">
            <Menu/>
          </div>

          <div className="Main_p">
          <div className="profstat_p">
            <div className="prof_p"><Details/></div>
            <div className="stat_p"><Stats/></div>
          </div>

          <div className="btn_p">
            <div className="butn_p">
              <button className="button_p" onClick={() => navigate("/auction")}>Buy Energy ⚡</button>
              <button className="button_p" onClick={() => setModalShow(true)}>Sell Energy ⚡</button>
            </div>
          </div>

          <div className="auctions_p">
            <div className="complete_p"><Complete/></div>
            <div className="ongoing_p"><Ongoing/></div>
          </div>

          <BidModal show={modalShow} setModalShow = {setModalShow}/>
          
          </div>
        </div>
    );
}