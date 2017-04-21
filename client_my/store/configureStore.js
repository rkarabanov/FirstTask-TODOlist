import { createStore ,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk,promise()));

    if (module.hot) {
        module.hot.accept('../reducers', function(){
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        })
    }
    return store;
}