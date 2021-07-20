import React, {memo, useEffect, useMemo} from 'react';
import {Alert, Button, Form, Input} from 'antd';
import styles from "./Login.module.scss"
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registration, setFailUreState} from "../actions";

const Registration = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {isAuth, error} = useSelector(state => state.general);

    const errorRegistration = useMemo(() => {
        if (error?.type === 'ValidationError') {
            const filteredErrors = error.errors
                .filter((errorItem) => errorItem.key === 'registration')
                .map((errorItem) => errorItem.msg)
            return filteredErrors.length ? filteredErrors : null
        }
    }, [error])

    useEffect(() => {
        if (isAuth) {
            history.push('/');
        }
        return () => {
            if (error?.type === 'ValidationError') {
                dispatch(setFailUreState(null))
            }
        }
    }, [history, isAuth])

    const onFinish = async ({username, password}) => {
        dispatch(registration(username, password, () => {
            history.push('/login');
        }));
    }

    const onFinishFailed = async () => {
        alert('Enter your registration data')
    }
    return (
        <Form className={styles.formStyles}
              name="basic"
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
              }}
              initialValues={{
                  remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
        >
            {errorRegistration && <Alert className={'validation_alert'}
                                         message="Validation Error"
                                         description={errorRegistration.join('\n')}
                                         type="error"
            />}

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    {
                        max: 30,
                        message: "Username should be less than 30 characters"
                    },
                    {
                        min: 3,
                        message: "Username should be at least 3 characters long"
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        max: 30,
                        message: "Password length must not exceed 30 characters"
                    },
                    {
                        min: 8,
                        message: "Password must be at least 8 characters long"
                    },

                    {
                        pattern: /(?=.*[0-9])/,
                        message: "The password must contain at least one number"
                    },
                    {
                        pattern: /(?=.*[!@#$%^&*])/,
                        message: "Password must contain at least one special character"
                    },
                    {
                        pattern: /(?=.*[a-z])/,
                        message: "Password must contain at least one lowercase Latin letter"
                    },
                    {
                        pattern: /(?=.*[A-Z])/,
                        message: "Password must contain at least one uppercase Latin letter"
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Registration
                </Button>
            </Form.Item>
        </Form>
    );

};

export default memo(Registration);
