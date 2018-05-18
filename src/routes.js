import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Auth from "./components/auth/Auth";
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/not-found/NotFound';
import Stats from "./components/dashboard/stats/Stats";
import UserProfile from "./components/dashboard/user-profile/UserProfile";
import Locations from "./components/dashboard/locations/Locations";
import Services from "./components/dashboard/services/Services";
import Payments from "./components/dashboard/payments/Payments";
import Service from "./components/dashboard/services/service/Service";

import Payment from "./components/dashboard/payments/payment/Payment";

/**
 * Маршрутизация приложения.
 */
export const routes = (
    <div>
        <Route path="/auth" onEnter={Auth.onEnter} component={Auth}/>
        <Route path="/" onEnter={Dashboard.onEnter} component={Dashboard}>
            <IndexRoute component={Stats}/>
            <Route path="/stats" component={Stats}/>
            <Route path="/locations" component={Locations}/>

            <Route path="services" component={Services}>
                <Route path="add" component={Service}/>
                <Route path="edit" component={Service}/>
            </Route>

            <Route path="payments" component={Payments}>
                <Route path="add" component={Payment}/>
            </Route>

            <Route path="/user-profile" component={UserProfile}/>

            <Route path="*" component={NotFound}/>
        </Route>
    </div>
);