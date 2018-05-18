import * as types from './types/PaymentTypes';
import HttpService from "../services/HttpService";
import {REDIRECT} from "./types/RoutingTypes";
import qs from 'qs';
import {WARNING} from "../constants/MessageTypes";
import {showNotify} from "../utils/CommonUtil";

const http = HttpService.getInstance();

export function loadPayments() {
    return (dispatch) => {
        http.get('/payments').then((list) => {
            dispatch({
                type: types.GET_PAYMENTS,
                payload: list
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}

export function preparePayment(service) {
    return (dispatch) => {
        http.post('/payments/prepare', qs.stringify({serviceId: service._id}))
            .then((paymentData) => {
                dispatch({
                    type: types.PREPARE_DATA_PAYMENT,
                    payload: paymentData
                });

                dispatch({
                    type: REDIRECT,
                    payload: {
                        method: 'push',
                        nextUrl: '/payments/add'
                    }
                });
            }).catch(({ error }) => {
                showNotify(dispatch, error, WARNING);
            });
    }
}

export function createPayment(data) {
    return (dispatch) => {
        http.post('/payments/add', qs.stringify(data)).then((res) => {
            dispatch({
                type: types.CREATE_PAYMENT,
                payload: res
            });

            dispatch({
                type: REDIRECT,
                payload: {
                    method: 'push',
                    nextUrl: '/payments'
                }
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}