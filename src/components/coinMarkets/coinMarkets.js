import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { withRouter } from 'react-router-dom';
import './coinMarkets.css';

class CoinMarkets extends Component{
  constructor (props) {
    super(props);
    this.state={
      items: [],
      DataisLoaded: false,
      per_page: 10,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state, prevState);
    if (prevState?.currentPage !== this.state?.currentPage) {
      this.getData();
    }
  }

   getData() {
    console.log(this.state);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=${this.state?.per_page}&page=${this.state?.currentPage}&sparkline=false`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json, "id");
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  handleClick(item,e) {
    console.log("items",item)
    localStorage.setItem("coinData", JSON.stringify(item))
    this.props.history.push('/coins')
  }
  
  prev() {
    console.log("prev");
    if (this.state.currentPage - 1 === 0) return;
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  }

  next() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  }

  render() {
    const{DataisLoaded,items} = this.state;
    if(!DataisLoaded)
    return( 
    <div>
      <div className="coinGecko-logo">CoinGecko</div>
        <div className="table-coin">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Current Price</th>
                <th>High 24 hour Price</th>
                <th>Low 24 hour Price</th>
              </tr>
            </thead>
            <tbody>       
              {items.map((item,id) => (
                <tr key={id} onClick={(event) => this.handleClick(item, event)}>
                  <td>
                    <img className="img-coins" src={item.image} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.symbol}</td>
                  <td className="current-price">{item.current_price}</td>
                  <td className="high-hour">{item.high_24h}</td>
                  <td className="low-hour">{item.low_24h}</td>
                </tr>
              ))}        
            </tbody>
          </Table>
          <div className="row display">
            <div className='col-md-9'></div>
            <div className='col-md-3'>
              <div className="pagination-button">
                <button type="button" className="btn prev-button" onClick={() => this.prev()}>
                  Previous
                </button>
                <button type="button" className="btn next-button" onClick={() => this.next()}>
                  Next
                </button>
              </div> 
            </div>
          </div>         
        </div>
      </div>
    )
  }
} 

export default withRouter(CoinMarkets); 