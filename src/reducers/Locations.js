import * as types from '../actions/types/LocationTypes';

const initialState = {
    showModal: false,
    location: null,
    list: []
};

export default function locations(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_MODAL:
            return {...state, showModal: true};

        case types.CLOSE_MODAL:
            return {...state, showModal: false, location: null};

        case types.GET_ALL:
            return {...state, list: action.payload};

        case types.EDIT_LOCATION:
            return {...state, showModal: true, location: action.payload};

        case types.CREATE_LOCATION:
            return {...state, list: [action.payload, ...state.list]};

        case types.UPDATE_LOCATION:
            const newLocation = action.payload;

            for (let item of state.list) {
                if (newLocation._id === item._id) {
                    Object.assign(item, newLocation);
                    break;
                }
            }

            return {
                ...state,
                showModal: false,
                location: null,
                list: [...state.list]
            };

        case types.DELETE_LOCATION:
            const locationId = action.payload;

            state.list = state.list.filter((item) => {
                return item._id !== locationId;
            });

            return {...state};

        default:
            return state;
    }
}