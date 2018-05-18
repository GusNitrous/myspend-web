import * as types from '../actions/types/NotificationTypes';

const initialState = {
    message: null,
};

export default function notifications(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_NOTIFY:
            return {...state, message: action.payload};

        case types.HIDE_NOTIFY:
            return {...state, message: null};

        default:
            return state;
    }
}