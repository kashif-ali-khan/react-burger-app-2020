
import axios from './../../axiosOrder';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const INIT_INGREDIENT = 'INIT_INGREDIENT';
export const FETCH_INGREDIENT_FAILED = 'FETCH_INGREDIENT_FAILED';
export const SET_INGREDIENT = 'SET_INGREDIENT';

export const SET_FETCH_INGREDIENT = 'SET_FETCH_INGREDIENT';

export const SAVE_ORDER = 'SAVE_ORDER';
export const SAVE_ORDER_FAILED = 'SAVE_ORDER_FAILED';
export const SAVE_ORDER_SUCCESS = 'SAVE_ORDER_SUCCESS';
export const IS_ORDER_SAVING = 'IS_ORDER_SAVING';

export const FETCH_ORDER_SUCESS = 'FETCH_ORDER_SUCESS';
export const FETCH_ORDER_START = 'FETCH_ORDER_START';
export const FETCH_ORDER_FAIL = 'FETCH_ORDER_FAIL';





export const addIngredient = (name) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredient = (ings) => {
    return {
        type: SET_INGREDIENT,
        ingredients: ings
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: FETCH_INGREDIENT_FAILED
    }
}


export const initIngredient = () => {
    return {
        type: SET_FETCH_INGREDIENT
    }
    // return dispatch => {
    //     axios.get('/ingredients.json').then(response => {
    //         dispatch(setIngredient(response.data))
    //     }).catch(error => {
    //         dispatch(fetchIngredientFailed())
    //     })
    // }
}

export const saveOrderFailed = (error) => {
    return {
        type: SAVE_ORDER_FAILED,
        error: error
    }
}

export const saveOrderSuccess = (orderData) => {
    return {
        type: SAVE_ORDER_SUCCESS,
        orders: orderData,
        isLoading: false
    }
}
export const isOrderSaving = (state) => {
    return {
        type: IS_ORDER_SAVING,
        isLoading: state
    }
}



export const saveOrder = (orderData, token) => {
    return dispatch => {
        dispatch(isOrderSaving(true))
        axios.post("orders.json?auth=" + token, orderData)
            .then(response => {
                //console.log(response)
                dispatch(saveOrderSuccess(response.data))
            }).catch(error => {
                dispatch(saveOrderFailed(error))
            })
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: FETCH_ORDER_SUCESS,
        orders: orders
    }
}

export const fetchOrderStart = () => {
    return {
        type: FETCH_ORDER_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        //const qparam = "?auth=" + token + "&orderBy='userId'&equalTo='" + userId+"'"

        const qparam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + qparam).then(response => {
            const orders = [];
            for (let item in response.data) {
                orders.push({
                    ...response.data[item],
                    id: item
                })
            }
            dispatch(fetchOrderSuccess(orders))
        }).catch(error => {
            dispatch(fetchOrderFail(error))
        })

    }
}

export const fetchOrderFail = (error) => {
    return {
        type: FETCH_ORDER_FAIL,
        error: error
    }
}