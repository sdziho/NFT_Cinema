import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import Web3 from 'web3';
import './App.css';
import { Header } from './Header';
import {Home} from './Home'
import styled from 'styled-components';
import {Route, BrowserRouter as Router, Link, Routes} from "react-router-dom"
import {Buy} from './Buy'
import MyTickets from './MyTickets';
//h0m3w0rk - add new tab to check accrued interest
const Wrap= styled.div`
   
`

function App(){
  
    return (
      <Wrap>
        <Header/>
        
        <Router>
        <Routes>
        <Route path="/buy" element={<Buy />}/>
        <Route path="/home"  element={<Home />}/>
        <Route path="/myTickets"  element={<MyTickets />}/>
        <Route path="/" exact element={<Home />}/>
        </Routes>
        </Router>
      </Wrap>
    );
    
}

export default App;