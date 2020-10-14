import * as ActionTypes from '../actions/actionTypes';
import { utilityMethod } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {

    const purchaseBurgerInit = (state, action) => {
        return utilityMethod(state, { purchased: false });
    }

    const purchaseBurgerSuccess = (state, action) => {
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        return utilityMethod(state, {
            loading: false,
            orders: state.orders.concat(newOrder),
            purchased: true
        });
    }

    const purchaseBurgerStart = (state, action) => {
        return utilityMethod(state, { loading: true });
    }

    const purchaseBurgerFailure = (state, action) => {
        return utilityMethod(state, { loading: false, error: true });
    }

    const fetchOrderStart = (state, action) => {
        return utilityMethod(state, { loading: true });
    }

    const fetchOrderFail = (state, action) => {
        return utilityMethod(state, { loading: false, error: action.error });
    }


    const fetchOrderSuccess = (state, action) => {
        return utilityMethod(state, { loading: false, orders: action.orders });
    }

    switch (action.type) {
        case ActionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state, action)
        case ActionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
        case ActionTypes.PURCHASE_BURGER_FAILURE: return purchaseBurgerFailure(state, action)
        case ActionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case ActionTypes.FETCH_ORDER_START: return fetchOrderStart(state, action)
        case ActionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state, action)
        case ActionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action)
        default: return state;
    }
}

export default orderReducer;