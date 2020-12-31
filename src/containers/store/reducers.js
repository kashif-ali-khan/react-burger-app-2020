import * as actionTypes from './actions';
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalCost: 4
}
const reducers = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName]: state.ingredients[actions.ingredientName] + 1
                },
                totalCost: state.totalCost + INGREDIENT_PRICES[actions.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName]: state.ingredients[actions.ingredientName] - 1
                },
                totalCost: state.totalCost - INGREDIENT_PRICES[actions.ingredientName]

            }
        default:
            return state
    }
}

export default reducers;