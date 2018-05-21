import * as types from '../actions/types/AuthTypes';
import {LOGIN_MODE} from "../constants/AuthConst";
import SessionService from "../services/SessionService";

const session = SessionService.getInstance();

const initialState = {
    errors: {
        login: null,
        register: null
    },
    mode: LOGIN_MODE,
    isAuth: session.isActive()
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case types.SWITCH_MODE:
            return { ...state, mode: action.payload };

        case types.LOGIN:
            return { ...state, isAuth: true };

        case types.REGISTER:
            return initialState;

        case types.LOGOUT:
            return { ...state, isAuth: false };

        case types.LOGIN_ERROR:
            return { ...state, errors: {login: action.payload} };

        case types.REGISTER_ERROR:
            return { ...state, errors: {register: action.payload} };

        default:
            return state;
    }
}