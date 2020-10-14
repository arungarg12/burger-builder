import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControl/BuildControl';
import { BURGER_INGREDIENTS } from '../../../Reusable/Constants';

const buildControls = (props) => {

    return <div className={classes.BuildControls}>
        <div><strong>Current Price : {props.burgerPrice}</strong></div>
        {BURGER_INGREDIENTS.map((ctls) => (
            <BuildControl key={ctls.label}
                label={ctls.label}
                type={ctls.type}
                price={(BURGER_INGREDIENTS.find(burIng => burIng.type === ctls.type)).price}
                onAddIngredient={props.onAddIngredient}
                onRemoveIngredient={props.onRemoveIngredient}
                ingQuantity={props.buildControls[ctls.type]}
            />
        ))
        }
        <button className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.orderSummaryDisplay}
        >{props.isAuthenticated ? 'ORDER NOW' : 'Sign Up to Order'}</button>
    </div>

}

export default buildControls;