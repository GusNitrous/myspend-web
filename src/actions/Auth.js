import * as types from './types/AuthTypes';
import {WARNING} from '../constants/MessageTypes';
import HttpService from '../services/HttpService';
import SessionService from "../services/SessionService";
import {REDIRECT} from './types/RoutingTypes';
import qs from 'qs';
import {showNotify} from "../utils/CommonUtil";

const http = HttpService.getInstance();
const session = SessionService.getInstance();

/**
 * Переключение режима компонента.
 */
export function switchMode(mode) {
    return (dispatch) => {
        dispatch({
            type: types.SWITCH_MODE,
            payload: mode
        });
    }
}

export function login(email, password) {
    return (dispatch) => {
        const loginData = {
            email: email,
            password: password
        }

        http.post('/auth/signin', qs.stringify(loginData)).then((res) => {
            session.setAuthData(res);

            dispatch({
                type: REDIRECT,
                payload: {
                    method: 'push',
                    nextUrl: '/locations'
                }
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function register(email, password) {
    return (dispatch) => {
        const registerData = {
            email: email,
            password: password
        }

        http.post('/auth/signup', qs.stringify(registerData)).then((res) => {
            dispatch({
                type: types.REGISTER
            });

            dispatch({
                type: REDIRECT,
                payload: {
                    method: 'push',
                    nextUrl: '/auth'
                }
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function logout() {
    return (dispatch) => {
        http.post('/auth/signout').then((res) => {
            // очищаем локальную сессию
            session.destroy();

            dispatch({
                type: types.LOGOUT
            });

            dispatch({
                type: REDIRECT,
                payload: {
                    method: 'push',
                    nextUrl: '/auth'
                }
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}