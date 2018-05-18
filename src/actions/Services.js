import * as types from './types/ServiceTypes';
import HttpService from "../services/HttpService";
import {REDIRECT} from "./types/RoutingTypes";
import qs from 'qs';
import {WARNING} from "../constants/MessageTypes";
import {showNotify} from "../utils/CommonUtil";

const http = HttpService.getInstance();

export function loadServices() {
    return (dispatch) => {
        http.get('/services').then((res) => {
            dispatch({
                type: types.LOAD_SERVICES,
                payload: res
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function saveService(data) {
    return (dispatch) => {
        http.post('/services/save', qs.stringify(data)).then((res) => {
            if (data._id) {
                dispatch({
                    type: types.UPDATE_SERVICE,
                    payload: data
                });
            } else {
                dispatch({
                    type: types.ADD_SERVICE,
                    payload: res
                });
            }

            dispatch({
                type: REDIRECT,
                payload: {
                    method: 'push',
                    nextUrl: '/services'
                }
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function deleteService(serviceId) {
    return (dispatch) => {
        http.post('/services/delete', qs.stringify({_id: serviceId})).then((res) => {
            dispatch({
                type: types.DELETE_SERVICE,
                payload: serviceId
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

/**
 * Отображение/сброс услуги для редактирования.
 */
export function editService(service = null) {
    return (dispatch) => {
        dispatch({
            type: types.EDIT_SERVICE,
            payload: service
        });

        if (service) {
            dispatch({
                type: REDIRECT,
                payload: {
                    method: 'push',
                    nextUrl: '/services/edit'
                }
            });
        }
    }
}