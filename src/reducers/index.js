import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import user from './User';
import auth from './Auth';
import stats from './Stats';
import locations from './Locations';
import services from './Services';
import payments from './Payments';
import notifications from './Notifications';

/**
 * Редьюсеры приложения.
 * @type {Reducer<any>}
 */
const AppReducers = combineReducers({
    user,
    auth,
    stats,
    locations,
    services,
    payments,
    notifications,
    routing: routerReducer
});

export default AppReducers