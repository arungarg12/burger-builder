import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (<div className={classes.BuildControl}>
        <label className={classes.Label}>{props.label}</label>
        <label className={classes.Label}>Item Price:{props.price}</label>
        <label className={classes.Label}>Qty:{props.ingQuantity}</label>
        <label className={classes.Label}>Total Price:{props.price*props.ingQuantity}</label>
        <button className={classes.Less}
            onClick={() => props.onRemoveIngredient(props.type)} disabled={props.ingQuantity===0}>
            Less</button>
            <button className={classes.More}
            onClick={() => props.onAddIngredient(props.type)}>
            More</button>
    </div>
    )
}

export default buildControl;