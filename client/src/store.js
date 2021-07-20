import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from './reducers';
import {initialState as todoInitialState} from "./reducers/todosReducer";
import {initialState as generalInitialState} from "./reducers/generalReducer";

import thunk from "redux-thunk";

const initialState = {
    todos: todoInitialState,
    general: generalInitialState
}

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
