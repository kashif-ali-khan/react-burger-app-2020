import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userid, idtoken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userid,
        idToken: idtoken
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (username, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        username: username,
        password: password,
        isSignUp: isSignUp
    }
    // return dispatch => {
    //     dispatch(authStart())
    //     const dataObject = {
    //         email: username,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmo-MI8lL4psfVVnZgtXAcO9IeOkeovr0';
    //     if (!isSignUp) {
    //         url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmo-MI8lL4psfVVnZgtXAcO9IeOkeovr0"
    //     }
    //     axios.post(url, dataObject)
    //         .then(response => {
    //             //console.log(response)
    //             const idtoken = response.data.idToken;
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             const userid = response.data.localId;
    //             localStorage.setItem('token', idtoken);
    //             localStorage.setItem('userId', userid);
    //             localStorage.setItem('expirationDate', expirationDate);
    //             dispatch(authSuccess(userid, idtoken))
    //             dispatch(checkAuthTimeout(response.data.expiresIn))
    //         })
    //         .catch(error => {
    //             const message = error.response.data.error.message;
    //             // console.log(error.resopnse.data.error.message);
    //             dispatch(authFail(message))
    //         })
    // }
}

export const logout = () => {
    //localStorage.removeItem('token');
    //localStorage.removeItem('userId');
    //localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.LOGOUT_INITIATE
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.LOGOUT
    }
}
export const checkAuthTimeout = (expiry) => {
    return {
        type: actionTypes.AUTH_TIMEOUT,
        expiry: expiry
    }
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout())
    //     }, expiry * 1000)

    // }
}


export const checkReLogin = () => {
    return {
        type: actionTypes.AUTH_RELOGIN
    }
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout())
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate <= new Date()) {
    //             dispatch(logout())
    //         } else {
    //             const userid = localStorage.getItem('userId');
    //             dispatch(authSuccess(userid, token));
    //             const newTime = expirationDate.getTime();
    //             dispatch(checkAuthTimeout((newTime - new Date().getTime()) / 1000))
    //         }
    //     }
    // }


}