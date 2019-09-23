/* eslint-disable import/prefer-default-export */
import { AUTH } from "app/redux/constants";

const authInitialState = {
    userId: null,
    userName: null,
    admin: false,
    error: null,
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
                userId: null,
                userName: null,
                loading: false,
                error: payload
            };
        case AUTH.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case AUTH.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: payload.userId,
                admin: payload.admin,
                userName: payload.userName
            };
        default:
            return state;
    }
};
