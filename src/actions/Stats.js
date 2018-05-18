import * as types from './types/StatsTypes';
import HttpService from "../services/HttpService";
import qs from 'qs';
import {WARNING} from "../constants/MessageTypes";
import {showNotify} from "../utils/CommonUtil";

const http = HttpService.getInstance();

export function loadStat(from, to) {
    return (dispatch) => {
        const params = qs.stringify({from: from, to: to});

        http.post('/stats/last', params).then((res) => {
            dispatch({
                type: types.LOAD_STAT,
                payload: res
            });
        }).catch(({ error }) => {
            showNotify(dispatch, error, WARNING);
        });
    }
}