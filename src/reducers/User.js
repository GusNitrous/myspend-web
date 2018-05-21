import * as types from '../actions/types/UserTypes';

const initialState = {
    data: null,
    savedType: null
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_USER_DATA:
            return {...state, data: action.payload};

        case types.SAVE_USER_DATA:
            return {
                ...state,
                data: action.payload.data,
                savedType: action.payload.savedType
            };

        case types.UPDATE_PASSWORD:
            return {...state, savedType: action.payload};

        case types.ERROR_LOAD_USER_DATA:
            return {...state, savedType: action.payload};

        case types.ERROR_SAVE_USER_DATA:
            return {...state, savedType: action.payload};

        case types.RESET_SAVED_TYPE:
            return {...state, savedType: null};

        default:
            return state;
    }
}