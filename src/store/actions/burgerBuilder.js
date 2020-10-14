
import * as ActionTypes from './actionTypes';
import Axios from '../../axiosInstance';

export const addIngredient = (ingName) => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: ActionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredient = (burgerIngredients) => {
    return {
        type: ActionTypes.SET_INGREDIENT,
        burgerIngredients: burgerIngredients
    }
}

export const fetchIngredient = () => {
    console.log('fetching ingredients from databse');
    return dispatch => {
        Axios.get('https://create-sim-burger.firebaseio.com/ingredients.json')
            .then(response => {
                console.log('fetched ingredients from databse', response.data);
                dispatch(setIngredient(response.data));
            }
            )
            .catch(error => {
                dispatch(fetchIngredientFailed());
            })

    }
}

export const fetchIngredientFailed = () => {
    return {
        type: ActionTypes.FETCH_INGREDIENT_FAILED
    }
}