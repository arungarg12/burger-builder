import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.burgerIngredients)
        .map((burIng) => {
            return <li key={burIng}>
                <span style={{ textTransform: 'capitalize' }}>
                    {burIng}
                </span>
                        :{props.burgerIngredients[burIng]}
            </li>
        })
        console.log('ingredients=', ingredients);
    return (
        <Aux>
            <h3>Your Order</h3>
            <p> Your delicious burger with following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total Price:{parseFloat(props.burgerPrice).toFixed(2)}</strong></p>
            <Button btnType='Success' onClick={props.purchaseContinueHandler}>Continue</Button>
            <Button btnType='Danger' onClick={props.closeOrderSummary}>Cancel</Button>
        </Aux>
    )

};

export default orderSummary;