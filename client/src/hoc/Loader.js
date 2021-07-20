import clsx from "clsx";
import { ReactComponent as Unicorn } from './hug.svg';
import {memo, useMemo} from "react";

const Loader = ({loading = false}) => {
    const backDropStyle = useMemo(() => clsx('back_drop', {'back_drop__active' : loading}), [loading])

    return (
        <div className={backDropStyle}>
            <div className={'back_drop_loader'}>
                <Unicorn className={'unicorn'}/>
            </div>
        </div>
    );
};

export default memo(Loader);


