import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { checkReLogin } from './containers/store/actions/auth';

import asyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

const asyncOrder = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
class App extends Component {
  componentDidMount() {
    this.props.onRefreshLogin();
  }
  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="." />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrder} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="." />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
          {/* <BurgerBuilder></BurgerBuilder>
          <Checkout /> */}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRefreshLogin: () => dispatch(checkReLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));