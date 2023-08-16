import React from 'react';
import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginPage() {
    const URL = "https://book-e-sell-node-api.vercel.app/api/user";
    const navigate = useNavigate();

    const loginUser = (values) => {
        const payload = {
            email: values.email,
            password: values.password
        };

        axios.post(`${URL}/login`, payload)
            .then((res) => {
                toast("Login Successful!");
                navigate("/books");
                Cookies.set("email", values.email);
            })
            .catch(() => {
                toast("Unable to Login!!");
            });
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email().required("E-mail should not be empty!"),
        password: yup.string().required("Password should not be empty!")
            .matches(/^\S*$/, "Whitespace is not allowed!")
            .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
    });

    return (
        <div className='loginImg'>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => { loginUser(values) }}
                validationSchema={validationSchema}
            >
                {({ values, setFieldValue, handleBlur }) => (
                    <Form>
                        <div className="formContainer">
                            <div className="loginBox">
                                <Typography variant='h4' sx={{ color: "blue" }}>Login</Typography><br /><hr /><br />
                                <TextField
                                    variant='standard'
                                    label="E-mail"
                                    size='small'
                                    name='email'
                                    onBlur={handleBlur}
                                    value={values.email}
                                    onChange={(e) => { setFieldValue("email", e.target.value) }}
                                />
                                <FormHelperText error>
                                    <ErrorMessage name='email' />
                                </FormHelperText><br />
                                <TextField
                                    variant='standard'
                                    label="Password"
                                    size='small'
                                    name='password'
                                    onBlur={handleBlur}
                                    value={values.password}
                                    onChange={(e) => { setFieldValue("password", e.target.value) }}
                                />
                                <FormHelperText error>
                                    <ErrorMessage name='password' />
                                </FormHelperText><br />
                                <Button variant='contained' type='submit'>Log in</Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
