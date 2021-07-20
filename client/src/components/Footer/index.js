import FilterButton from "../FilterButton";
import {useDispatch, useSelector} from "react-redux";

import {clearCompletedToDo, completeAllToDo, filterToDO} from "../../actions";
import {FILTER_ALL, FILTER_COMPLETED, FILTER_TODO} from "../../constants";

import {memo, useMemo} from "react";
import styles from './index.module.scss';


import clsx from "clsx";

const Footer = () => {
    const dispatch = useDispatch();

    const {tasks, filter} = useSelector(state => state.todos)
    const counterTodosTasks = useMemo(() => tasks.reduce((accum, task) => {

        if (task.isChecked) {
            return accum;
        }

        return accum + 1
    }, 0), [tasks]);

    const counterCompletedTasks = useMemo(() => tasks.length - counterTodosTasks, [tasks, counterTodosTasks])
    const clearButtonStyles = useMemo(() => clsx(styles.textButton, {[styles.hidden]: !counterCompletedTasks}), [counterCompletedTasks])

    const changeFilter = (filterType) => () => {
        dispatch(filterToDO(filterType));
    }

    const handleClearCompleted = () => {
        dispatch(clearCompletedToDo())
    }

    const handleCompleteAllToDo = () => {
        dispatch(completeAllToDo())
    }

    return (
        <div className={styles.footer}>
            <button className={styles.textButton} onClick={handleCompleteAllToDo}> {counterTodosTasks} tasks left
            </button>
            <div className={styles.filter_button_footer}>
                <FilterButton active={filter === FILTER_ALL} onClick={changeFilter(FILTER_ALL)}>All</FilterButton>
                <FilterButton active={filter === FILTER_TODO} onClick={changeFilter(FILTER_TODO)}>ToDo</FilterButton>
                <FilterButton active={filter === FILTER_COMPLETED}
                              onClick={changeFilter(FILTER_COMPLETED)}>Completed</FilterButton>
            </div>
            <button className={clearButtonStyles} onClick={handleClearCompleted}>Clear completed</button>
        </div>
    );
}

export default memo(Footer);
