import * as ActionTypes from './actionTypes';
import Axios from 'axios';

export const authenticationStart = () => {
    return {
        type: ActionTypes.AUTHENTICATE_START
    }
}

export const authenticationFail = (error) => {
    return {
        type: ActionTypes.AUTHENTICATE_FAIL,
        error: error
    }

}

export const authenticationSuccess = (idToken,localUserId) => {
    return {
        type: ActionTypes.AUTHENTICATE_SUCCESS,
        idToken: idToken,
        localUserId:localUserId
    }
}

export const checkAuthTimeOut = (expirationTime) =>{
    console.log('expirationTime=',expirationTime)
    return dispatch => (
        setTimeout(()=>dispatch(authenticationLogout())
            ,expirationTime * 1000)
    )
}

export const authenticationLogout = () => {
    return{
        type:ActionTypes.AUTHENTICATE_LOGOUT
    }
}

export const authenticate = (formData,isSignUp) => {
    return (dispatch) => {
        dispatch(authenticationStart());
        const userData = {
            email: formData.userName,
            password: formData.password,
            returnSecureToken: true
        }
       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCm71OzhF3QgR-bn8IzVPDyflBmZZnqUEI';
       if(!isSignUp){
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCm71OzhF3QgR-bn8IzVPDyflBmZZnqUEI';
       }
        Axios.post(url,userData)
            .then(response => {
                console.log(response.data)
                dispatch(authenticationSuccess(response.data.idToken,response.data.localId))
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error)
                dispatch(authenticationFail(error.response.data.error))
            })

    }
}