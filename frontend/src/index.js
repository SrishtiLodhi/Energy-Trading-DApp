import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home, Profile, Auction, Node } from './page';

import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./page/PrivateRoute"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route 
              exact path = "/profile"
              element = {
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />

            <Route 
              exact path = "/auction"
              element = {
                <PrivateRoute>
                  <Auction />
                </PrivateRoute>
              } 
            />

            <Route 
              exact path = "/node"
              element = {
                <PrivateRoute>
                  <Node />
                </PrivateRoute>
              } 
            />
            
          </Routes>
        </AuthProvider>
      </Router>
    </>
  </React.StrictMode>
);
