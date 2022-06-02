import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from 'react-bootstrap';
import 'react-dropdown/style.css';
import Token from '../abis/Token.json'
import Web3 from 'web3';

const Wrap= styled.div`
    #btn{
        border-right: 2px solid black;
        margin: 0 auto;
        
    }
    .container{
        padding:1rem;
        background-color: #F0F0F0;
        
        
    }
    .head{
        max-width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .choose{
      max-width:70%;
      display: grid;
      margin: 0 auto;
      padding:2em;
    }
    .cinema{
        max-width:70%;
        display: grid;
        margin: 0 auto;
        grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
        
        list-style-type: none;
        li{
            background-color: #007bff;
            color:white;
            text-align:center;
            border: 2px solid black;
            cursor: pointer;
            :hover{
                background-color: #004692;
                
            }
        }
    }
`
export class Buy extends React.Component{
    
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData();
  }

  async loadWeb3(){
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
  

  async loadBlockchainData(dispatch) {
    const web3=window.web3
    const accounts=await web3.eth.getAccounts()
    this.setState({account:accounts[0]})

      //osigurat da je smart contract na odredjenom networku
    const myID=await web3.eth.net.getId()
    const networkData= Token.networks[myID]
    if(networkData){
      const abi=Token.abi
      const address=networkData.address
      const contract=new web3.eth.Contract(abi,address)
      this.setState({contract:contract})
      const ts= await contract.methods.totalSupply().call();
      this.setState({totalSupply:ts});
      for(var i=0;i<ts;i++){
        const film=await contract.methods.karte(i).call();
        this.setState({filmovi: [...this.state.filmovi, film.ime]})
        this.setState({rezervisano:[...this.state.rezervisano,film.sjediste]})
      }
      console.log(this.state.filmovi)
    }else{
      window.alert("Smart contract didnt deployed to network")
    }
    
  }

  
  mint=(film,seat)=>{
    var sjediste=(seat.charCodeAt(0)-65)*10+ seat.charCodeAt(1)-48
    if(seat.length>2) sjediste+=9
    console.log(film,sjediste)
    this.state.contract.methods.mint(film,sjediste).send({from:this.state.account})
    .once('receipt',(receipt)=>{
      this.setState({filmovi: [...this.state.filmovi, film]})
    })
  }
 

    constructor(props) {
        super(props);
        this.state={
            web3: 'undefined',
            account: '',
            totalSupply: null,
            contract: null,
            filmovi: [],
            rezervisano: [],
            novi_film: '',
            sjediste: null,
            matrix: [],
            movie: 'Inception',
            isActive: [],
            Seats: 'undefined',
            seat:''
        }
        var slovo='A';
        for(var i=0;i<5;i++){
            if(i==1) slovo='B';
            if(i==2) slovo='C';
            if(i==3) slovo='D';
            if(i==4) slovo='E';
            this.state.matrix.push([]);
            for(var j=0;j<10;j++){
                var k=j+1
                this.state.matrix[i].push(slovo+k)
                this.state.isActive.push(false)
            }
        }
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.chooseMovie = this.chooseMovie.bind(this);
    }
    handleClick(seat){
      var broj=(seat.charCodeAt(0)-65)*10+ seat.charCodeAt(1)-48
      if(seat.length>2) broj+=9
      for(var i=0;i<50;i++){
        this.state.isActive[i]=false
      }
      this.state.isActive[broj-1]=true
      this.setState({seat})
      
    }
    chooseMovie(movie){
        this.setState({movie:movie})
    }
    componentDidMount() {
      this.state.Seats=this.state.matrix.map((row) => (
        row.map( (seat) =>(
            <li key={seat} onClick={() => this.handleClick(seat)} >
            {seat}
            </li>
        ))
    ))
      
    } 


    render(){
        return(
            <Wrap>
                <div className='container'>
                    <div className='row justify-content-lg-left'>
                        
                      <div className='col-lg-12'>
                        <h2 className="d-flex justify-content-center">Movie choosed: {this.state.movie}</h2><hr/>
                      </div>
                      <div className="col-lg-auto">
                          <h4 >Select movie:</h4>
                      </div>
                      <div className="col col-lg-auto">
                          <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-button-dark-example1"  className="head">
                              {this.state.movie}
                          </Dropdown.Toggle>

                          <Dropdown.Menu >
                              <Dropdown.Item onClick={()=>this.chooseMovie("Inception")}>Inception</Dropdown.Item>
                              <Dropdown.Item onClick={()=>this.chooseMovie("The Silence of the Lambs")}>The Silence of the Lambs</Dropdown.Item>
                              <Dropdown.Item onClick={()=>this.chooseMovie("Interstellar")}>Interstellar</Dropdown.Item>
                          </Dropdown.Menu>
                          </Dropdown>
                          <br></br>
                      </div>
                      <div className="col-lg-12">    
                          <h4 >Select seat: {this.state.seat}</h4>
                          <br></br>
                      </div>
                      <div className='col-lg-12'>
                        <ul className="cinema">
                            {this.state.Seats}
                        </ul>
                        <br/>
                        <div className="col text-center">
                          <Button onClick={()=>this.mint(this.state.movie,this.state.seat)}>BUY NFT TICKET</Button>
                        </div>
                      </div>
                        
                        
                        
                        
                    </div>
                
                </div>
            </Wrap>
        );
    }
}