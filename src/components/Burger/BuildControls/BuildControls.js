import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }

];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((item) => {
            return <BuildControl
                key={item.type}
                label={item.label}
                add={() => props.addIngridient(item.type)}
                remove={() => props.removeIngridient(item.type)}
                disabled={props.disabledInfo[item.type]}
            />
        })
        }
        <button disabled={!props.purchasable} onClick={props.orderSummary} className={classes.OrderButton}>
           {props.isAuth?'Order Now' : 'Signin to order'} 
            </button>
    </div>
)


export default buildControls;