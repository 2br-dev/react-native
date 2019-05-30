import React, { useState } from 'react';
/*import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Form from './StyledForm';
import SubmitContainer from './SubmitContainer';*/
import $ from 'jquery';
import { withSnackbar } from 'notistack';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router';

function Login(props)
{
    //const [userData, setUserData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleClick = (login, password) => {
        $.ajax({
            type: "POST",
            url: "/back-end/api/AuthController.php",
            data: "login="+login+"&password="+password,
            success: function (response) {
                if (response === 'denied') {
                    props.enqueueSnackbar('Неверный логин или пароль', { variant: 'error'});
                    props.enqueueSnackbar(response, { variant: 'error'});
                } else if (response === 'ok') {
                    //console.log('Ответ сервера в Login иф = ', response);
                    setLoggedIn(true);

                    
                    /*const parser = new DOMParser();
                    //console.log('Ответ сервера = ', response);
                    const xml = parser.parseFromString(response, "text/xml");
                    //console.log(xml);
                    const xmlCollection = xml.childNodes[0].childNodes; // первый тег user, он содержит в себе все нужные теги
                    //console.log('xmlCollection = ', xmlCollection);
                    const arrayFromXML = [];
                    for (let i = 0; i < xmlCollection.length; i++) {
                        arrayFromXML[xmlCollection[i].tagName] = xmlCollection[i].innerHTML;
                    }
                    //console.log(arrayFromXML);
                    setUserData(arrayFromXML);
                    setUserStatus('user');*/
                }
                //console.log('Ответ сервера = ', response);
            },
            error: function (xhr, status) {
                props.enqueueSnackbar('Ошибка авторизации. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
                props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
            }
        });
    };

    $.ajax({
        type: "POST",
        url: "/back-end/api/AuthController.php",
        data: "signedIn=q",
        async: false,
        success: function (response) {
            console.log('User status Login ', response);
            if (response !== 'guest') {
                if (!loggedIn) {
                    setLoggedIn(true);
                }
            } else {
                if (loggedIn) {
                    setLoggedIn(true);
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
