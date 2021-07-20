import {
    ADD_TODO_SUCCESS,
    CHANGE_TODO_STATE_SUCCESS,
    CLEAR_COMPLETED_TODO_SUCCESS,
    COMPLETE_ALL_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
    FILTER_TODO,
    GET_TASKS_SUCCESS, INIT_TODO_STATE,
} from "../actions/actionTypes";
import {FILTER_ALL} from "../constants";

export const initialState = {
    tasks:[],
    filter:FILTER_ALL,
}

const todosReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_TODO_SUCCESS:
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.task,
                ]
            }
        case
        DELETE_TODO_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(elem => elem.id !== action.id)
            }
        case
        FILTER_TODO:
            return {
                ...state,
                filter: action.filter,
            }
        case CHANGE_TODO_STATE_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(todo => {
                    if (todo.id === action.id) {
                        return {
                            ...todo,
                            isChecked: !todo.isChecked,
                        }
                    }
                    return todo;
                })
            }
            case CLEAR_COMPLETED_TODO_SUCCESS:
                return {
                    ...state,
                    tasks: state.tasks.filter(todo => !todo.isChecked)
                }
        case COMPLETE_ALL_TODO_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(todo => {
                    return {
                        ...todo,
                        isChecked: true
                    }
                })
            }
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks:action.tasks
            }
        case INIT_TODO_STATE:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

export default todosReducer;
