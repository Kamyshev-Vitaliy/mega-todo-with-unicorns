import React, {memo, useEffect, useMemo, useState} from 'react';
import styles from './ToDo.module.scss';
//Components
import Title from "../components/Title";
import InputPanel from "../components/InputPanel";

import TaskItem from "../components/TaskItem";
import {useDispatch, useSelector} from "react-redux";

import {addTodo, changeToDoState, deleteToDo, fetchTasks} from "../actions";
import Footer from "../components/Footer";

import {FILTER_COMPLETED, FILTER_TODO} from "../constants";

const ToDo = () => {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();
    const {filter, tasks} = useSelector(state => state.todos);

    useEffect(async () => {
        dispatch(fetchTasks());
    }, [])

    function handleSubmit(event) {

        if (event.key === 'Enter') {

            if (!inputValue.trim()) {
                return;
            }
            dispatch(addTodo(inputValue));
            setInputValue('');
        }
    }

    const deleteTask = (id) => () => {
        dispatch(deleteToDo(id));
    }

    const checkedTodo = (id, checkState) => () => {
        dispatch(changeToDoState(id, checkState));
    }

    const filteredTasks = useMemo(() => {

        switch (filter) {

            case FILTER_TODO:
                return tasks.filter(task => !task.isChecked);
            case FILTER_COMPLETED:
                return tasks.filter(task => task.isChecked);
            default:
                return tasks;
        }
    }, [tasks, filter])

    return (
        <div>
            <Title/>

            <div className={styles.todoContainer}>
                <InputPanel inputValue={inputValue} onChangeInput={(value) => setInputValue(value)}
                            onSubmit={handleSubmit}/>
                <div className={'add_item_task'}>
                    {
                        filteredTasks && filteredTasks.map(todo => <TaskItem key={todo.id}
                                                                             taskValue={todo.text}
                                                                             deleteTask={deleteTask(todo.id)}
                                                                             checkedTodo={checkedTodo(todo.id, !todo.isChecked)}
                                                                             isChecked={todo.isChecked}
                        />)
                    }
                </div>
                {tasks.length ? <Footer/> : null}
            </div>
        </div>
    );
}

export default memo(ToDo);
