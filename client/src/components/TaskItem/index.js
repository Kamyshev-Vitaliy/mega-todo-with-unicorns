import React, {memo, useMemo} from 'react';
import styles from './TaskItem.module.scss';

import clsx from "clsx";
import {FaTrashAlt, GoCheck} from "react-icons/all";

const TaskItem = ({taskValue, deleteTask, checkedTodo, isChecked}) => {

    const wrapperClasses = useMemo(() => clsx(styles.taskItemContainer, {[styles.wrapperActive]: isChecked}), [isChecked])
    const textClasses = clsx(styles.taskItemText, {[styles.textActive]: isChecked})

    return (
        <div className={wrapperClasses}>
            <span className={styles.check__box} onClick={checkedTodo}>
                {isChecked ? <GoCheck className={styles.go_check}/> : null}
            </span>
            <p className={textClasses}>{taskValue}</p>
            <FaTrashAlt className={styles.taskItemDelete} onClick={deleteTask}>delete</FaTrashAlt>
        </div>
    );
}

export default memo(TaskItem);
