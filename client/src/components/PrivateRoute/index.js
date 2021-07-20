import {Route, Redirect} from 'react-router-dom';
import {memo} from "react";

const PrivateRoute = ({component: Component, redirectTo, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            auth
                ? <Component {...props} />
                : <Redirect to={redirectTo}/>
        )}
    />
);
export default memo(PrivateRoute);
