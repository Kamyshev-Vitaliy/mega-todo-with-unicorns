import {
    ADD_TODO_SUCCESS,
    CHANGE_TODO_STATE_SUCCESS,

    CLEAR_COMPLETED_TODO_SUCCESS,
    COMPLETE_ALL_TODO_SUCCESS,

    DELETE_TODO_SUCCESS,
    SET_FAILURE_STATE,

    FILTER_TODO,

    SET_LOADING_STATE,
    GET_TASKS_SUCCESS, LOGIN_SUCCESS, REGISTRATION_SUCCESS, LOG_OUT, INIT_TODO_STATE,

} from "./actionTypes";
import api from "../api";
import tokenStorage from "../tokenStorage";

export const addTodoSuccess = (task) => ({
    type: ADD_TODO_SUCCESS,
    task
})

export const deleteToDoSuccess = (id) => ({
    type: DELETE_TODO_SUCCESS,
    id
})

export const filterToDO = (filter) => ({
    type: FILTER_TODO,
    filter,
})

export const setLoadingState = (loading) => ({
    type: SET_LOADING_STATE,
    loading,
})

export const changeToDoStateSuccess = (id) => ({
    type: CHANGE_TODO_STATE_SUCCESS,
    id
})

export const clearCompletedToDoSuccess = () => ({
    type: CLEAR_COMPLETED_TODO_SUCCESS
})

export const completeAllToDoSuccess = () => ({
    type: COMPLETE_ALL_TODO_SUCCESS
})

export const setFailUreState = (error) => ({
    type: SET_FAILURE_STATE,
    error,
})


export const getTasksSuccess = (tasks) => ({
    type: GET_TASKS_SUCCESS,
    tasks,
})

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
})

export const registrationSuccess = () => ({
    type: REGISTRATION_SUCCESS,
})

export const logOut = () => ({
    type: LOG_OUT,
})

export const initToDoState = () => ({
    type: INIT_TODO_STATE,
})

//THUNK
export const fetchTasks = () => async (dispatch) => {

    try {
        await dispatch(setLoadingState(true));
        const tasksResponse = await api.get('/tasks', {'Auth': tokenStorage.getToken()});

        if (!tasksResponse.tasks) {
            throw new Error(tasksResponse.message)
        }

        await dispatch(getTasksSuccess(tasksResponse.tasks));
        dispatch(setLoadingState(false));
    } catch (error) {
        dispatch(setFailUreState(error))
    }
}

export const addTodo = (text) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true));
        const addTaskResponse = await api.post('/tasks', {isChecked: false, text}, {'Auth': tokenStorage.getToken()});
        await dispatch(addTodoSuccess(addTaskResponse.task));
        dispatch(setLoadingState(false));
    } catch (error) {
        dispatch(setFailUreState(error));
    }
}

export const deleteToDo = (id) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true));
        await api.delete('/tasks', {id}, {'Auth': tokenStorage.getToken()});
        await dispatch(deleteToDoSuccess(id));
        dispatch(setLoadingState(false));
    } catch (error) {
        dispatch(setFailUreState(error));
    }
}

export const changeToDoState = (id, checkState) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true));
        await api.patch('/tasks', {isChecked: checkState, id}, {'Auth': tokenStorage.getToken()});
        await dispatch(changeToDoStateSuccess(id));
        dispatch(setLoadingState(false));
    } catch (error) {
        dispatch(setFailUreState(error));
    }
}

export const completeAllToDo = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true));
        await api.patch('/tasks/complete', {}, {'Auth': tokenStorage.getToken()});
        await dispatch(completeAllToDoSuccess());
        dispatch(setLoadingState(false));
    } catch (error) {
        dispatch(setFailUreState(error));
    }
}

export const clearCompletedToDo = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true));
        const clearCompletedTaskToDo = await api.delete('/tasks/complete', {}, {'Auth': tokenStorage.getToken()});
        await dispatch(clearCompletedToDoSuccess(clearCompletedTaskToDo));
        dispatch(setLoadingState(false));
    } catch (error) {
        dispatch(setFailUreState(error));
    }
}

export const login = (login, password, remember) => async (dispatch) => {
    try {
        await dispatch(setLoadingState(true));
        const loginResponse = await api.post('/auth/login', {
            login,
            password,
        });
        tokenStorage.setTokenStorage(remember)
        tokenStorage.setToken(loginResponse.jwt);
        await dispatch(loginSuccess())
    } catch (error) {
        dispatch(setFailUreState(error));
    }
}

export const registration = (login, password, successCallback) => async (dispatch) => {
    try {
        await dispatch(setLoadingState(true));
        await api.post('/auth/registration', {
            login,
            password,
        });

        await dispatch(registrationSuccess());
        successCallback && successCallback();
    } catch (error) {
        dispatch(setFailUreState(error));
    }
}
