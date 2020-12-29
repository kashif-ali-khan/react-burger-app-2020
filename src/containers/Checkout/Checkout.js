import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Aux from './../../hoc/Auxilary';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

    state = {
        ingredients: null,
        totalprice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let item of query.entries()) {
            if (item[0] === 'totalPrice') {
                price = item[1];
                console.log(price);
            } else {
                ingredients[item[0]] = +item[1];
            }
        }
        console.log(price);

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
    }
    cancelHandler = () => {
        this.props.history.goBack();
    }
    continueHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }
    render() {
        return (
            <Fragment>
                { this.state.ingredients ?
                    <CheckoutSummary
                        cancelled={this.cancelHandler}
                        contiued={this.continueHandler}
                        ingredients={this.state.ingredients}
                    /> : null}
                <Route
                    path={this.props.match.url + "/contact-data"}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}   />) }
                />
            </Fragment>
        );
    }
}

export default Checkout;