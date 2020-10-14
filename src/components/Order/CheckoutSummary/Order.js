import React from 'react';
import Classes from './Order.css';

const Order = (props) => {
    
    let ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

   const igOutput =  ingredients.map(ingredient => (
       <span className={Classes.Ingredients} 
       key={ingredient.name} >
           {ingredient.name}-{ingredient.amount}
           </span>
    ))
    return (
        <div className={Classes.Order}>
            <p >Ingredients:{igOutput}</p>
            <p>Price=<strong>{Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;