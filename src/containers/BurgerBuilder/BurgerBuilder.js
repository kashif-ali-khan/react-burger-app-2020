import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axiosOrder';
import Loader from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalCost: 4,
        purchasable: false,
        purchase: false,
        isLoading: false,
        error: false
    }
    componentDidMount = () => {
        axios.get('/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data
            })
        }).catch(error => {
            this.setState({
                error: true
            })
        })
    }
    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Some error</p> : <Loader />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngridient={this.addIngredientHandler}
                        removeIngridient={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalCost}
                        purchasable={this.state.purchasable}
                        orderSummary={this.purchaseHandler}

                    />
                </Aux>
            );
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
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
        const queryParams = [];
        for (let item in this.state.ingredients) {
            queryParams.push(encodeURIComponent(item) + "=" + encodeURIComponent(this.state.ingredients[item]));

        }
        queryParams.push("totalPrice=" + this.state.totalCost);
        this.props.history.push({
            pathname: "/checkout",
            search: queryParams.join("&")
        });
        // const orderData = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalCost,
        //     customer: {
        //         name: 'Kashif ali khan',
        //         address: {
        //             street: 'Test stree',
        //             zipCode: '201009',
        //             country: 'Dubai'
        //         },
        //         email: 'kashif.7373@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // this.setState({
        //     isLoading: true
        // });
        // axios.post("orders.json", orderData)
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             isLoading: false,
        //             purchase: false
        //         })
        //     }).catch(error => {
        //         console.log(error);
        //         this.setState({
        //             isLoading: false,
        //             purchase: false
        //         })
        //     })
        // alert('continue')
    }



    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => ingredients[igKey] > 0)
            .reduce((sum, el) => sum + el, 0);
        this.setState({ purchasable: sum > 0 })

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

export default withErrorHandler(BurgerBuilder, axios);