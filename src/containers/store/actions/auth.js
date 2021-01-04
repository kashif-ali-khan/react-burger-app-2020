import * as actionTypes from './actionTypes';
import axios from 'axios';
const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (userid, idtoken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userid,
        idToken: idtoken
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (username, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const dataObject = {
            email: username,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmo-MI8lL4psfVVnZgtXAcO9IeOkeovr0';
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmo-MI8lL4psfVVnZgtXAcO9IeOkeovr0"
        }
        axios.post(url, dataObject)
            .then(response => {
                console.log(response)
                const idtoken = response.data.idToken;
                const userid = response.data.localId;
                dispatch(authSuccess(userid,idtoken))
            })
            .catch(error => {
              const message = error.response.data.error.message;
               // console.log(error.resopnse.data.error.message);
                dispatch(authFail(message))
            })
    }
}