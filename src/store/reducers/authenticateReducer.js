import * as ActionTypes from '../actions/actionTypes';
import { utilityMethod } from '../utility';

const initialState = {
    loading: false,
    idToken: null,
    error:null,
    userId:null
}


const authenticationStart = (state, action) => {
    return utilityMethod(state, { loading: true, error: false });
}

const authenticationSuccess = (state, action) => {
    return utilityMethod(
        state,
        {
            loading: false,
            idToken: action.idToken,
            userId: action.localUserId,
            error:false
        }
    );
}


const authenticationFail = (state, action) => {
    return utilityMethod(state, { loading: false, error: action.error });
}

const authenticationLogout = (state,action) => {
    return utilityMethod(state,{loading:false,error:null,idToken:null,userId:null})
}

const authenticateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTHENTICATE_SUCCESS: return authenticationSuccess(state, action);
        case ActionTypes.AUTHENTICATE_START: return authenticationStart(state, action);
        case ActionTypes.AUTHENTICATE_FAIL: return authenticationFail(state, action);
        case ActionTypes.AUTHENTICATE_LOGOUT: return authenticationLogout(state,action);
        default: return state;
    }
}

export default authenticateReducer;

