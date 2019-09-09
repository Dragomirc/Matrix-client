/* eslint-disable import/prefer-default-export */
import { AUTH } from "app/redux/constants";
import AuthService from "app/services/api/auth";

export const signup = user => dispatch => {
    dispatch({ type: AUTH.FETCH_REQUEST });
    return AuthService.signup(user)
        .then(res => {
            dispatch({ type: AUTH.SIGNUP_SUCCESS, payload: res.userId });
        })
        .catch(err => {
            dispatch({ type: AUTH.FETCH_FAIL, payload: err.message });
        });
};

export const login = user => dispatch => {
    dispatch({ type: AUTH.FETCH_REQUEST });
    return AuthService.login(user)
        .then(res => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.userId);
            dispatch({ type: AUTH.LOGIN_SUCCESS, payload: res });
        })
        .catch(err => {
            dispatch({ type: AUTH.FETCH_FAIL, payload: err.message });
        });
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return {
        type: AUTH.LOGIN_SUCCESS,
        payload: { userId: null, token: null }
    };
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(logout());
    } else {
        // console.log(jwt.decode(token));
    }
};
