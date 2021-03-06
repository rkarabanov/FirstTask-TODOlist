import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {Router,  browserHistory } from 'react-router'
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
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
const store = configureStore();


render(
    <MuiThemeProvider>
    <Provider store={store}>
        <Router history={browserHistory}>
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
        </Router>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('my-app')
);