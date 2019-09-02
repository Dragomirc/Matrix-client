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
