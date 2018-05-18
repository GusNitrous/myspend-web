import * as types from './types/NotificationTypes';

export function hideNotify() {
    return (dispatch) => {
        dispatch({
            type: types.HIDE_NOTIFY
        });
    }
}