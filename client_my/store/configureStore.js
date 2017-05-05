import { createStore ,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import { createLogger } from 'redux-logger'
import nextRootReducer from '../reducers'
export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(createLogger(),thunk,promise()));

    if (module.hot) {
        module.hot.accept('../reducers', function(){
            store.replaceReducer(nextRootReducer);
        })
    }

    // store.subscribe(()=>onCheck.log("Store update!",store.getState()));
    return store;
}