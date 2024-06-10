import React from "react";
import {Menu, Profile, ConnectN, RightN} from "../components/node_comp";
import '../css/node_css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Node() {
    
    return (
        <>
          <div className="body_N">
              <div className="mnu_N">
                <Menu/>
              </div>

              <div className="mid_N">
                <div className="left_N">
                  <Profile/>
                  <ConnectN/>
                </div>
                <div className="right_N">
                  <RightN/>
                </div>
              </div>
          </div>
        </>
    )
}