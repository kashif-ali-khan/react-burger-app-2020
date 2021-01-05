import * as action from './../actions';
import * as actionTypes from './../actions/actionTypes';
import { takeEvery } from "redux-saga/effects";
import { authLogoutSaga, checkAuthTimeoutSaga, authUserSaga, checkReLoginSaga } from './auth';
import {initIngredientSaga} from './burgerBuilder';
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_RELOGIN, checkReLoginSaga);
    yield takeEvery(actionTypes.LOGOUT_INITIATE, authLogoutSaga);
    yield takeEvery(actionTypes.AUTH_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  
}

export function* watchBurgerBuilder(){
    yield takeEvery(action.SET_FETCH_INGREDIENT, initIngredientSaga);

}