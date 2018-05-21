import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {redirect} from "../middlewares/Redirect";

export default createStore(reducers, applyMiddleware(thunk, redirect));