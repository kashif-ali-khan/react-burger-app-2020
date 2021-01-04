import * as actionTypes from './../actions/actionTypes';

const initialState = {
    userId: null,
    idToken: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: actions.userId,
                idToken: actions.idToken,
                loading: false,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                userId: null,
                idToken: null,
                error: actions.error
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                loading: false,
                userId: null,
                idToken: null,
                error: null
            }


        default:
            return state;
    }

}

export default reducer;