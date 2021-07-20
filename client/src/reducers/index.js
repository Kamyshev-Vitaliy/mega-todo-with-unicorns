import {combineReducers} from "redux";
import todosReducer from "./todosReducer";
import generalReducer from "./generalReducer";

export default combineReducers({
    todos: todosReducer,
    general:generalReducer,
})
