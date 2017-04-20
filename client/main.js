// import React from 'react';
import ReactDOM from 'react-dom';

// ReactDOM.render(
// <h1>Hello, world!</h1>,
//     document.getElementById('my-app')
// );

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('my-app')
);