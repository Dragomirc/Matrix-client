/* eslint-disable import/prefer-default-export */
import { AUTH } from "app/redux/constants";

const authInitialState = {
    userId: null,
    error: null,
    token: null,
    loading: false
};

export const authReducer = (state = authInitialState, { type, payload }) => {
    switch (type) {
        case AUTH.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case AUTH.FETCH_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case AUTH.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: payload
            };
        case AUTH.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: payload.userId,
                token: payload.token
            };
        default:
            return state;
    }
};
