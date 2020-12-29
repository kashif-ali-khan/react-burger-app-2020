import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <p>Tasty burger</p>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.cancelled} btnType="Danger" >Cancel</Button>
            <Button clicked={props.contiued} btnType="Success">Continue</Button>
        </div>
    )

}

export default checkoutSummary;