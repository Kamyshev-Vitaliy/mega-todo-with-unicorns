import React, {memo, useMemo} from 'react';
import ToDo from "./container/ToDo";

import {Button, Layout, PageHeader} from "antd";
import Login from "./container/Login";

import './styles/style.scss'

import {
    Switch,
    Link
} from "react-router-dom";

import {FaHome} from "react-icons/all";
import Registration from "./container/Registration";

import {useDispatch, useSelector} from "react-redux";
import {initToDoState, logOut,} from "./actions";

import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./hoc/ErrorBoundary";
import Loader from "./hoc/Loader";

const {Content, Header} = Layout;

const App = () => {

    const {isAuth, loading} = useSelector(state => state.general);

    const dispatch = useDispatch();

    const handlerLogOut = () => {
        localStorage.removeItem('jwt');
        dispatch(logOut());
        dispatch(initToDoState());
    }

    const LogoutButton = useMemo(() => (<Button onClick={handlerLogOut} key={'Link_to_/logout'}>Logout</Button>), []);
    const RegistrationButton = useMemo(() => (

        <Link key={'Link_to_/registration'} to='/registration'>
            <Button path='/registration'>Registration</Button>
        </Link>
    ), [])

    const LoginButton = useMemo(() => (

        <Link key={'Link_to_/login'} to='/login'>
            <Button path='/login' type="primary">Login</Button>
        </Link>
    ), [])

    const headerButtons = useMemo(() => {
        return isAuth ? [LogoutButton] : [RegistrationButton, LoginButton]
    }, [isAuth])

    return (
        <Layout>
            <ErrorBoundary>
                <Loader loading={loading}/>
                <Header>
                    <Link className={'todo_home'} key={'Link_to_/'} to='/'>
                        <FaHome className={'fa_home'}/>
                    </Link>
                    <PageHeader extra={headerButtons}>
                    </PageHeader>
                </Header>
                <Content>
                    <Switch>
                        <PrivateRoute auth={isAuth} redirectTo={"/login"} exact path="/" component={ToDo}/>
                        <PrivateRoute auth={!isAuth} redirectTo={"/"} path="/registration" component={Registration}/>
                        <PrivateRoute auth={!isAuth} redirectTo={"/"} path="/login" component={Login}/>
                    </Switch>
                </Content>
            </ErrorBoundary>
        </Layout>
    );
}

export default memo(App);

