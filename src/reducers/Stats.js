import * as types from '../actions/types/StatsTypes';

const initialState = {
    data: null,
};

export default function stats(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_STAT:
            return {...state, data: action.payload};

        default:
            return state;
    }
}