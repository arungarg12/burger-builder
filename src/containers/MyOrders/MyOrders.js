import React, { Component } from 'react';
import Order from '../../components/Order/CheckoutSummary/Order';
import Axios from '../../axiosInstance';
import WithErrorHandling from '../../hoc/withErrorHandling';
import * as ActionCreators from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class MyOrders extends Component {


    componentDidMount() {
        console.log('authToken===',this.props.authToken)
        this.props.onFetchOrders(this.props.authToken);
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
           orders =( this.props.orders.map(order => (
                <Order
                    totalPrice={order.price}
                    key={order.id}
                    ingredients={order.burgerIngredients}
                    order={order}
                />

            )));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        authToken: state.authenticate.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (authToken) => dispatch(ActionCreators.fetchedOrders(authToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandling(MyOrders, Axios));