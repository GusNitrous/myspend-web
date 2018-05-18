import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {routes} from './routes';
import store from './store';

import 'font-awesome/css/font-awesome.min.css';
import './assets/css/fonts.css';
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-reset.css';
import './assets/css/media.css';
import './assets/css/index.css';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('root')
);
