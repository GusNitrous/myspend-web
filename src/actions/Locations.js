import * as types from './types/LocationTypes';
import HttpService from "../services/HttpService";
import qs from 'qs';
import {WARNING} from "../constants/MessageTypes";
import {showNotify} from "../utils/CommonUtil";

const http = HttpService.getInstance();

/**
 * Загрузка адресов.
 */
export function getAll() {
    return (dispatch) => {
        http.get('/locations').then((res) => {
            dispatch({
                type: types.GET_ALL,
                payload: res
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function createLocation(data) {
    return (dispatch) => {
        http.post('/locations/add', qs.stringify(data)).then((res) => {
            dispatch({
                type: types.CREATE_LOCATION,
                payload: res
            });

            dispatch({
                type: types.CLOSE_MODAL
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function updateLocation(data) {
    return (dispatch) => {
        http.post('/locations/save', qs.stringify(data)).then((res) => {
            dispatch({
                type: types.UPDATE_LOCATION,
                payload: data
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function deleteLocation(locationId) {
    return (dispatch) => {
        http.post('/locations/delete', qs.stringify({_id: locationId})).then((res) => {
            dispatch({
                type: types.DELETE_LOCATION,
                payload: locationId
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

/**
 * Отображение адреса для редактирования.
 */
export function editLocation(location) {
    return (dispatch) => {
        dispatch({
            type: types.EDIT_LOCATION,
            payload: location
        });

        dispatch({
            type: types.SHOW_MODAL
        });
    }
}

export function showModal() {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_MODAL
        });
    }
}

export function closeModal() {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL
        });
    }
}