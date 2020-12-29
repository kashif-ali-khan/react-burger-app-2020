import React from 'react';
import Aux from './../../../hoc/Auxilary';
import Button from "./../../UI/Button/Button";
const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients).map((igKey) => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}: {props.ingredients[igKey]}</span></li>
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger wirh following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseCancelHandler} btnType="Danger">Cancel</Button>
            <Button clicked={props.purchaseContinueHandler} btnType="Success">Continue</Button>
        </Aux>

    );

}

export default orderSummary;