import * as actionTypes from './actions';
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
const initialState = {
    ingredients: null,
    totalCost: 0,
    isLoading: false,
    orders: null,
    fetchOrders: null,
    error: null
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
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: actions.ingredients,
                error: false,
                isLoading: false,
                totalCost: 4
            }
        case actionTypes.SAVE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: actions.isLoading,
                orders: actions.orders
            }
        case actionTypes.SAVE_ORDER_FAILED:
            return {
                ...state
            }
        case actionTypes.IS_ORDER_SAVING:
            return {
                ...state,
                isLoading: actions.isLoading
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_ORDER_SUCESS:
            return {
                ...state,
                fetchOrders: actions.orders
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                error: actions.error
            }

        default:
            return state
    }
}

export default reducers;