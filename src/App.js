import React, { Component, Suspense } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { checkReLogin } from './containers/store/actions/auth';

//import asyncComponent from './hoc/AsyncComponent/AsyncComponent';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})
class App extends Component {
  componentDidMount() {
    this.props.onRefreshLogin();
  }
  render() {

    let routes = (
      <Switch>
        <Route path="/auth" render={(props)=> <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="." />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" render={(props)=><Orders {...props}/>} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" render={(props)=><Checkout {...props}/>} />
          <Route path="/auth" render={(props)=><Auth {...props}/>} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="." />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading ....</p>}>
          {routes}
          </Suspense>
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