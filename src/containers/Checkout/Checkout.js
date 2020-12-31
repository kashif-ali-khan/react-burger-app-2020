import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {

    state = {
        ingredients: null,
        totalprice: 0
    }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let item of query.entries()) {
    //         if (item[0] === 'totalPrice') {
    //             price = item[1];
    //             console.log(price);
    //         } else {
    //             ingredients[item[0]] = +item[1];
    //         }
    //     }
    //     console.log(price);

    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price
    //     })
    // }
    cancelHandler = () => {
        this.props.history.goBack();
    }
    continueHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }
    render() {
        return (
            <Fragment>
                { this.props.ings ?
                    <CheckoutSummary
                        cancelled={this.cancelHandler}
                        contiued={this.continueHandler}
                        ingredients={this.props.ings}
                    /> : null}
                <Route
                    path={this.props.match.url + "/contact-data"}
                    component={ContactData}
                />
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);