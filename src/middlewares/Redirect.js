import { browserHistory } from 'react-router';
import { REDIRECT } from '../actions/types/RoutingTypes';

/**
 * Redirect middleware.
 * @param store
 */
export const redirect = store => next => action => {
    if (action.type === REDIRECT) {
        browserHistory[action.payload.method](action.payload.nextUrl)
    }

    return next(action);
}