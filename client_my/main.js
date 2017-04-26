import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import ForgotPass from './containers/ForgotPass'
import RestorePass from './containers/RestorePass'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/login" component={App}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/forgotPass" component={ForgotPass}/>
            <Route path="/restorePass" component={RestorePass}/>
        </Router>
    </Provider>,
    document.getElementById('my-app')
);