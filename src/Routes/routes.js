import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CoinMarkets from '../components/coinMarkets/coinMarkets';
import Coins from '../components/coins/coins'

class Routes extends Component {
   state = {};
   render() {
	return (
	  <BrowserRouter>
	    <Switch>
		  <Route path="/" component={CoinMarkets} exact />
          <Route path="/coins">
            <Coins />
          </Route>
		</Switch>
	   </BrowserRouter>
	);
   }
}

export default Routes;