import React, { useState } from 'react';
import { withSnackbar } from 'notistack';
import SignInForm from '../SignInForm';
import { Redirect } from 'react-router';
import { auth } from './Authentication';

function Login(props)
{
    const [loggedIn, setLoggedIn] = useState(props.loggedIn);
    const handleClick = (login, password) => {
        console.log('Вошёл в Login->handleClick');
        if (!auth(login, password)) {
            props.enqueueSnackbar('Неверный логин или пароль', { variant: 'error'});
        } else {
            setLoggedIn(true);
        }
    };

    return(
        console.log('Login -> return: loggedIn = '+loggedIn),
        loggedIn ? <Redirect to={{
            pathname: "/profile",
            state: {loggedIn: loggedIn},
        }} />
        :
        <SignInForm onClick={(login, pass) => {
            handleClick(login, pass);
        }}/>
    );
}

export default withSnackbar(Login);
