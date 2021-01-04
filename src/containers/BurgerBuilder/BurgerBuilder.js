import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axiosOrder';
import Loader from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler';

import { connect } from 'react-redux';
import { addIngredient, removeIngredient,initIngredient } from './../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchase: false,
        isLoading: false,
        error: false
    }
    componentDidMount = () => {
        this.props.initIngredient();
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     })
        // }).catch(error => {
        //     this.setState({
        //         error: true
        //     })
        // })
    }
    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Some error</p> : <Loader />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngridient={this.props.addIngredient}
                        removeIngridient={this.props.removeIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.totalCost}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        orderSummary={this.purchaseHandler}

                    />
                </Aux>
            );
            orderSummary = (<OrderSummary
                ingredients={this.props.ings}
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}

            />);
        }



        if (this.state.isLoading) {
            orderSummary = <Loader />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchase} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
    purchaseHandler = () => {
        this.setState({
            purchase: true
        })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchase: false
        })
    }
    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let item in this.props.ings) {
        //     queryParams.push(encodeURIComponent(item) + "=" + encodeURIComponent(this.props.ings[item]));

        // }
        // queryParams.push("totalPrice=" + this.props.totalCost);
        this.props.history.push("/checkout");

    }



    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => ingredients[igKey] > 0)
            .reduce((sum, el) => sum + el, 0);
        // this.setState({ purchasable: sum > 0 })
        return sum > 0;
    }
    addIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type];
        const newIngredient = oldIngredient + 1;
        const oldPrice = this.state.totalCost;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newIngredient
        this.setState({
            totalCost: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);

    }
    removeIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type];
        if (oldIngredient <= 0) {
            return;
        }
        const newIngredient = oldIngredient - 1;
        const oldPrice = this.state.totalCost;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newIngredient
        this.setState({
            totalCost: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalCost: state.totalCost,
        error:state.error
    }

}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch(addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(removeIngredient(ingName)),
        initIngredient: (ingName) => dispatch(initIngredient()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));