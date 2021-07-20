import {useDispatch, useSelector} from "react-redux";
import {memo, useEffect, useState} from "react";
import {logOut, setFailUreState} from "../actions";

import {Result} from "antd";
import tokenStorage from "../tokenStorage";

const ErrorBoundary = ({children}) => {
    const {error} = useSelector(state => state.general)
    const [showError, setShowError] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {

        if (error) {
            switch (error.type) {
                case 'UnauthorizedError':
                case 'TokenInvalid':
                case 'TokenExpired':
                    tokenStorage.removeToken()
                    dispatch(logOut())
                    dispatch(setFailUreState(null))
                    break;
                case 'BadRequest':
                case 'ValidationError':
                    break;
                default:
                    setShowError(true);
                    break;
            }
        }
    }, [error])

    return showError ? <Result
        status="error"
        title="Unexpected error"
        subTitle="Please try to reload page after 5 minutes, if everything the same, then it's probably error with server"/> : children;
}
export default memo(ErrorBoundary);
