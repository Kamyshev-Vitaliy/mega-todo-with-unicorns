import styles from './InputPanel.module.scss';
import {memo} from "react";

const InputPanel = ({inputValue, onChangeInput, onSubmit}) => {

    return (
        <div className={styles.input__panel}>
            <input type="text" className={styles.input__task} placeholder="Enter your task name hear" value={inputValue}
                   onChange={event => onChangeInput(event.target.value)} onKeyDown={onSubmit}/>
        </div>
    );
}

export default memo(InputPanel);
