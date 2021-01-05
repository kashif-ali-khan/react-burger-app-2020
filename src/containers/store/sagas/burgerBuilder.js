import * as actions from './../actions';
import { put } from 'redux-saga/effects';
import axios from './../../../axiosOrder';
export function* initIngredientSaga() {

    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngredient(response.data))

    } catch (error) {
        yield put(actions.fetchIngredientFailed())
    }
}