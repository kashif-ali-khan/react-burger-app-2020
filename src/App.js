import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />

          <Route path="/checkout" component={Checkout} />
          {/* <BurgerBuilder></BurgerBuilder>
          <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;