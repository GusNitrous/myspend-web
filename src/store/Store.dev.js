import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {redirect} from "../middlewares/Redirect";
import {composeWithDevTools} from "redux-devtools-extension";

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk, redirect)));