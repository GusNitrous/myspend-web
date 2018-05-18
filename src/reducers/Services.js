import * as types from '../actions/types/ServiceTypes';

const initialState = {
    service: null,
    list: []
};

export default function services(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_SERVICES:
            return {...state, list: action.payload};

        case types.ADD_SERVICE:
            return {...state, list: [action.payload, ...state.list]};

        case types.EDIT_SERVICE:
            return {...state, service: action.payload};

        case types.UPDATE_SERVICE:
            const newService = action.payload;

            for (let item of state.list) {
                if (item._id === newService._id) {
                    Object.assign(item, newService);
                    break;
                }
            }

            return {
                ...state,
                service: null,
                list: state.list
            };

        case types.DELETE_SERVICE:
            const serviceId = action.payload;
            return {...state, list: state.list.filter((service) => service._id !== serviceId)};

        default:
            return state;
    }
}