import React, { useState } from 'react';
import Form from './logic/Form';
import Menu from './Menu';
import { Redirect } from 'react-router';
import $ from 'jquery';
import { withSnackbar } from 'notistack';

function AuthRouter(props)
{
    const [page, setPage] = useState('signIn'); // какую форму отображать, Вход/Регистрация - signIn/signUp
    const [loggedIn, setLoggedIn] = useState(false); // авторизован ли пользователь

    function handleClick(state) {
        setPage(state);
    }

    $.ajax({
        // проверка авторизации
        type: "POST",
        url: "/back-end/api/AuthController.php",
        data: "signedIn=q",
        async: false,
        success: function (response) {
            console.log('User status AuthRouter = ', response);
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

    return (
        loggedIn ? <Redirect to="/profile" />
        :
        <div>
            <Menu
                signIn={() => handleClick('signIn')}
                signUp={() => handleClick('signUp')}
                active={page}
            />
            <Form type={page} />
        </div>
    );
}

export default withSnackbar(AuthRouter);
