import * as ActionTypes from './actionTypes';
import Axios from '../../axiosInstance';

export const burgerPurchaseStart = () =>{
    return{
        type: ActionTypes.PURCHASE_BURGER_START
    }
}

export const burgerPurchase = (order,authToken) => {
    console.log('authToken=====',authToken)
    return (dispatch) => { 
        dispatch(burgerPurchaseStart());
        console.log('after burger purchase start');
    Axios.post('/orders.json?auth='+ authToken, order)
            .then(response => {
                console.log('response data',response.data);
                dispatch(burgerPurchaseSuccess(response.data.name,order));
            })
            .catch(error => {
                dispatch(burgerPurchaseFailure());
            });
}
}

export const burgerPurchaseFailure = () =>{
    return{
        type:ActionTypes.PURCHASE_BURGER_FAILURE,
        error:true,
        loading:false
    }
}

export const burgerPurchaseSuccess = (id,order) =>{
    return{
        type:ActionTypes.PURCHASE_BURGER_SUCCESS,
        error:false,
        loading:false,
        orderId:id,
        orderData:order
    }
}

export const burgerInit = () => {
    return{
        type:ActionTypes.PURCHASE_BURGER_INIT
    }
}

export const  fetchOrderInit = () => {
    return{
    type:ActionTypes.FETCH_ORDER_START
    }
}

export const  fetchOrderSuccess = (orders) => {
    return{
    type:ActionTypes.FETCH_ORDER_SUCCESS,
    orders:orders
    }
}

export const  fetchOrderFail = (error) => {
    return{
    type:ActionTypes.FETCH_ORDER_FAIL,
    error:error
    }
}

export const fetchedOrders = (authToken) => {
    console.log('authToken===',authToken)
    return dispatch => {
        dispatch(fetchOrderInit());
        Axios.get('/orders.json?auth=' + authToken)
        .then(response => {
            const fetchedOrders = [];
            console.log('response.data',response.data);
            for (let key in response.data) {
                console.log('key',key);
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                }
                )
            }
           dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrderFail(err));
        })
    }
    }