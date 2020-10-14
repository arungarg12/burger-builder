import React from 'react';
import { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-form');
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.burgerIngredients) {
                const burgerPurchased = this.props.purchased? <Redirect to="/" /> :null
            summary = (
                <div>
                    {burgerPurchased}
                    <CheckoutSummary
                        burgerIngredients={this.props.burgerIngredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path='/checkout/contact-form' component={ContactForm} />
                </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        burgerIngredients: state.burgerBuilder.burgerIngredients,
        purchased: state.order.purchased
    };
}



export default connect(mapStateToProps)(Checkout);