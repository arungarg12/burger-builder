import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
    <h1>Hope you like the burger!</h1>
    <div className={classes.CheckoutSummaryBurger}>
    <Burger burgerIngredients={props.burgerIngredients}/>
    </div>
    <Button btnType='Danger' onClick={props.checkoutCancelled}>CANCEL</Button>
    <Button btnType='Success' onClick={props.checkoutContinued}>CONTINUE</Button>
    </div>
)

export default CheckoutSummary;