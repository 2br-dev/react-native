import React, { useState } from 'react';
import $ from 'jquery';
import { withSnackbar } from 'notistack';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router';

function Login(props)
{
    const [loggedIn, setLoggedIn] = useState(false);

    const handleClick = (login, password) => {
        console.log('Вошёл в Login->handleClick');
        $.ajax({
            // авторизация пользователя
            type: "POST",
            url: "/back-end/api/AuthController.php",
            data: "login="+login+"&password="+password,
            success: function (response) {
                if (response === 'denied') {
                    props.enqueueSnackbar('Неверный логин или пароль', { variant: 'error'});
                    props.enqueueSnackbar(response, { variant: 'error'});
                } else {
                    // пользователь авторизован
                    setLoggedIn(true);
                    console.log('Пользователь прошёл авторизацию');
                    console.log('Установил loggedIn в true');
                    console.log('Server Response = ', response);
                }
            },
            error: function (xhr, status) {
                props.enqueueSnackbar('Ошибка авторизации. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
                props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
            }
        });
    };

    $.ajax({
        // проверка авторизации
        type: "POST",
        url: "/back-end/api/AuthController.php",
        data: "signedIn=q",
        async: false,
        success: function (response) {
            console.log('Проверка авторизации в Login');
            console.log('User back status Login = ', response);
            console.log('loggedIn = ', loggedIn);
            if (response !== 'guest') {
                if (!loggedIn) {
                    setLoggedIn(true);
                }
            } else {
                if (loggedIn) {
                    setLoggedIn(false);
                }
            }
        },
        error: function (xhr, status) {
            props.enqueueSnackbar('Ошибка авторизации. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
            props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
        },
    });

    return(
        loggedIn ? <Redirect to="/profile" />
        :
        <LoginForm onClick={(login, pass) => {
            handleClick(login, pass);
        }}/>
    );
}

export default withSnackbar(Login);
