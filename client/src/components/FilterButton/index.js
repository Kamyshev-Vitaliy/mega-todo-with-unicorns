import styles from './index.module.scss';
import clsx from "clsx";
import {memo, useMemo} from "react";

const FilterButton = ({children, active, ...restProps}) => {

    const buttonStyles = useMemo(() => clsx(styles.filterButton, {[styles.filterButtonActive]: active}), [active])

    return (
        <button className={buttonStyles} {...restProps}>{children}</button>
    )
};

export default memo(FilterButton);
