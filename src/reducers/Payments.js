import * as types from '../actions/types/PaymentTypes';

const initialState = {
    dataPayment: null,
    list: []
};

export default function payments(state = initialState, action) {
    switch (action.type) {
        case types.GET_PAYMENTS:
            return {...state, list: action.payload};

        case types.PREPARE_DATA_PAYMENT:
            return {...state, dataPayment: action.payload};

        case types.CREATE_PAYMENT:
            return {...state, dataPayment: null, list: [action.payload, ...state.list]};

        default:
            return state;
    }
}