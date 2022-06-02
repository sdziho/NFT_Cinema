import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import Token from '../abis/Token.json'
import Web3 from 'web3';
const Wrap= styled.div`
   ul{
    list-style-type: none;
   }
   .container{
    background-color: #F0F0F0;
    padding: 2rem;
    margin 0 auto;
   }
   h2{
       text-align:center;
   }
`

export default function MyTickets(){
    const [filmovi, setFilmovi] = useState([]);
    const [sjedista, setSjedista] = useState([]);
    const [account, setAccount] = useState('');
    
    const loadWeb3=async()=>{
        if(window.ethereum){
          window.web3=new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if(window.web3){
          window.web3=new Web3(window.web3.currentProvider)
        }
        else{
          window.alert("Use metamask")
        }
    }
    const loadBlockchainData=async()=>{
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const bal=await web3.eth.getBalance(accounts[0]);
        console.log(bal)
        const myID=await web3.eth.net.getId()
        const networkData= Token.networks[myID]
        console.log(networkData)
        if(networkData){
            const abi=Token.abi
            const address=networkData.address
            const contract=new web3.eth.Contract(abi,address)
            const ts= await contract.methods.totalSupply().call();
    
            
            for(var i=0;i<ts;i++){
                const film=await contract.methods.karte(i).call();
                const idT = await contract.methods.tokenByIndex(i).call();
                const owner = await contract.methods.ownerOf(idT).call();
                if(owner===accounts[0]){
                    var red=String.fromCharCode(film.sjediste/10+65)+film.sjediste
                    setFilmovi(filmovi=>[...filmovi, film.ime])
                    setSjedista(sjedista=>[...sjedista, red])
                }
                
            }
            
        }else{
            window.alert("Smart contract didnt deployed to network")
        }
    }
    useEffect(() => {
        loadWeb3()
        loadBlockchainData();
      },[]);

    return(
        <Wrap>
            <div className="container">
                <h2>My Tickets</h2>
                <div className="row justify-content-sm-center">
                    <ul class="list-group">
                        <li className="list-group-item"><b>Movie</b></li>
                        {filmovi.map((film) => (
                            <li className="list-group-item">{film}</li>
                        ))}
                    </ul>
                    <ul class="list-group">
                        <li className="list-group-item"><b>Seat</b></li>
                        {sjedista.map((sjedista) => (
                            <li className="list-group-item">{sjedista}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Wrap>
    )
}