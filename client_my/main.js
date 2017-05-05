import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { Router, Route, browserHistory } from 'react-router'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import ForgotPass from './containers/ForgotPass'
import RestorePass from './containers/RestorePass'
import PersonalSettings from './containers/PersonalSettings'
import Admin from './containers/Admin'
// import Download from './containers/Download'
import configureStore from './store/configureStore'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Registration from './containers/Registration'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const store = configureStore();



render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
            <Route path="/login" component={App}/>
            {/*<Route path="/download" component={Download}/>*/}
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/forgotPass" component={ForgotPass}/>
            <Route path="/restorePass" component={RestorePass}/>
            <Route path="/personalSettings" component={PersonalSettings}/>
            <Route path="/registration" component={Registration}/>
            <Route path="/admin" component={Admin}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('my-app')
);