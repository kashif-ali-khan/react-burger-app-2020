import * as actions from './../actions/auth';
import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
export function* authLogoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationDate');
    yield put(actions.logoutSucceed())

}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiry * 1000);
    yield put(actions.logout())

}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const dataObject = {
        email: action.username,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmo-MI8lL4psfVVnZgtXAcO9IeOkeovr0';
    if (!action.isSignUp) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmo-MI8lL4psfVVnZgtXAcO9IeOkeovr0"
    }
    try {


        const response = yield axios.post(url, dataObject)

        const idtoken = response.data.idToken;
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        const userid = response.data.localId;
        localStorage.setItem('token', idtoken);
        localStorage.setItem('userId', userid);
        localStorage.setItem('expirationDate', expirationDate);
        yield put(actions.authSuccess(userid, idtoken))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        const message = error.response.data.error.message;
        yield put(actions.authFail(message))
    }
    //.catch(error => {
    //const message = error.response.data.error.message;
    // console.log(error.resopnse.data.error.message);
    // dispatch(authFail(message))
    // })

}

export function* checkReLoginSaga() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('first')
        yield put(actions.logout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            console.log('second')
            yield put(actions.logout())
        } else {
            console.log('third')
            const userid = localStorage.getItem('userId');
            yield put(actions.authSuccess(userid, token));
            const newTime = expirationDate.getTime();
            yield put(actions.checkAuthTimeout((newTime - new Date().getTime()) / 1000))

        }
    }
}