import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DismissButton from '../../../src/assets/dismissButton.svg';
import './coins.css'

class Coins extends Component{
  constructor (props) {
    super(props);
    this.state={
      items: [],
      isLoaded: false,
      description: {},
    };
  }

  goBack = () =>{
    this.props.history.push('/');
  }

  componentDidMount(){
    var coinData=localStorage.getItem("coinData")
    var parseCoinData=JSON.parse(coinData)
    console.log("from_component",coinData)
    fetch(`https://api.coingecko.com/api/v3/coins/${parseCoinData.id}`)     
    .then((response) => response.json())       
    .then (json => { 
      console.log(json,"id")
      this.setState({
        isLoaded:true,
        items: json,
        description: json.description
      })
    });      
  }
    
  render(){
    const{items,description} = this.state;
    return(
      <div>
        <div onClick={()=>this.goBack()} className="previous-button"><img src={DismissButton} alt="" /></div>
          <ul>
            <ol className="name-content">Name: {items.name}</ol>
            <ol className="name-content">Symbol: {items.symbol}</ol>
            <ol className="name-content">Hashing algorithm: {items.hashing_algorithm}</ol>
            <ol className="description-content">Description: {description.en} </ol>
            <ol className="name-content">Market cap in Euro: {items.market_cap}</ol>
            <ol className="name-content">Homepage: {items.homepage}</ol>
            <ol className="name-content">Genesis Date: {items.genesis_date}</ol>             
          </ul>            
      </div>
    )
  }
}

export default withRouter(Coins);
