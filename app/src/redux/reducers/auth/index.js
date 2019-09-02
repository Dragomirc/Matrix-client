/* eslint-disable import/prefer-default-export */
import { AUTH } from "app/redux/constants";

const authInitialState = {
    user: null,
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
                loading: false,
                error: payload
            };
        case AUTH.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: {
                    userId: payload
                }
            };
        default:
            return state;
    }
};
