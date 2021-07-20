import {
    LOG_OUT, LOGIN_SUCCESS, REGISTRATION_SUCCESS, SET_FAILURE_STATE, SET_LOADING_STATE,
} from "../actions/actionTypes";

export const initialState = {
    error: null,
    loading: true,
    isAuth: true,
}

const generalReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_FAILURE_STATE:
            return {...state, loading: false, error: action.error?.response || action.error || null}
        case SET_LOADING_STATE:
            return {...state, loading: action.loading}
        case LOGIN_SUCCESS:
            return {...state, loading: false, isAuth: true}
        case REGISTRATION_SUCCESS:
            return {...state, loading: false}
        case LOG_OUT:
            return {...state, isAuth: false}
        default:
            return state;
    }
}

export default generalReducer;
