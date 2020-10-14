import * as actionTypes from '../actions/actionTypes';
import { utilityMethod } from '../utility';

const INGRIDIENT_PRICES = {
    cheese: 1,
    bacon: 2,
    meat: 3,
    salad: 4
}

const initialState = {
    burgerIngredients: null,
    totalPrice: 4.00,
    error: false
}

const setIngredient = (state, action) => {
    return utilityMethod(state, {
        burgerIngredients: action.burgerIngredients,
        totalPrice: 4,
        error: false
    });
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.burgerIngredients[action.ingredientName] + 1 };
    const updatedIngredients = utilityMethod(state.burgerIngredients, updatedIngredient);
    const updatedState = {
        burgerIngredients: updatedIngredients,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingredientName]
    }
    return utilityMethod(state, updatedState);
}


const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.burgerIngredients[action.ingredientName] - 1 };
    const updatedIngs = utilityMethod(state.burgerIngredients, updatedIng);
    const updatedSt = {
        burgerIngredients: updatedIngs,
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingredientName]
    }
    return utilityMethod(state, updatedSt);
}

const fetchIngredientFailed = (state, action) => {
    return utilityMethod(state, { error: true });
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action)
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action)
        default: return state;
    }

}

export default burgerBuilderReducer;