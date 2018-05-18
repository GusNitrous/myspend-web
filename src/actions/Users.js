import * as types from './types/UserTypes';
import * as savedTypes from '../constants/UserSavedTypes';
import HttpService from "../services/HttpService";
import SessionService from "../services/SessionService";
import qs from 'qs';

const session = SessionService.getInstance();
const http = HttpService.getInstance();

export function loadUserData(userId) {
    return (dispatch) => {
        http.get('/user/' + userId).then((res) => {
            if (res.error) {
                throw new Error(res.error);
            } else {
                dispatch({
                    type: types.LOAD_USER_DATA,
                    payload: res
                });
            }
        }).catch((err) => {
            console.warn(err);

            dispatch({
                type: types.ERROR_LOAD_USER_DATA,
                payload: savedTypes.ERROR_USER_LOAD_DATA
            });
        });
    }
}

export function saveUserData(data) {
    return (dispatch) => {
        http.post('/user/save', qs.stringify(data)).then((res) => {
            if (res.error) {
                throw new Error(res.error);
            } else {
                const authData = session.getAuthData();
                const savedType = (data.email !== authData.email) ?
                    savedTypes.USER_SAVED_WITH_EMAIL :
                    savedTypes.USER_SAVED_DATA;

                dispatch({
                    type: types.SAVE_USER_DATA,
                    payload: {
                        data: data,
                        savedType: savedType
                    }
                });
            }
        }).catch((err) => {
            console.warn(err);

            dispatch({
                type: types.ERROR_SAVE_USER_DATA,
                payload: savedTypes.ERROR_USER_SAVED_DATA
            });
        });
    }
}

export function updatePassword(updatePasswordData) {
    return (dispatch) => {
        const params = qs.stringify(updatePasswordData);

        http.post('/user/updatePassword', params).then((res) => {
            if (res.error) {
                throw new Error(res.error);
            } else {
                dispatch({
                    type: types.UPDATE_PASSWORD,
                    payload: savedTypes.USER_UPDATE_PASSWORD
                });
            }
        }).catch((err) => {
            console.warn(err);

            const type = {...savedTypes.ERROR_USER_SAVED_DATA, msg: err.error}

            dispatch({
                type: types.ERROR_SAVE_USER_DATA,
                payload: type
            });
        });
    }
}

/**
 * Событие сброса типа сохранения данных.
 */
export function resetSavedType() {
    return (dispatch) => {
        dispatch({
            type: types.RESET_SAVED_TYPE
        });
    }
}

