import React, { useState } from 'react';
import Input from './Input';
//import { makeStyles } from '@material-ui/styles';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { withSnackbar } from 'notistack';
import { deleteCookie } from './logic/CookieManager';

/*const useStyles = makeStyles(theme => ({
    profileContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));*/

function Profile(props)
{
    //const classes = useStyles();
    const [profileData, setProfileData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    $.ajax({
        // проверка авторизации
        type: "POST",
        url: "/back-end/api/AuthController.php",
        data: "signedIn=q",
        async: false,
        success: function (response) {
            console.log('Проверка авторизации в Profile');
            console.log('Ответ сервера = ', response);
            if (response === 'user') {
                if (!loggedIn) {
                    console.log('Устанавливаю loggedIn в true');
                    setLoggedIn(true);
                }
                console.log('profileData = ', profileData);
                //console.log('Ответ от сервера = ', response);
                if (profileData.length === 0) {
                    console.log('profileData.length == 0');
                    $.ajax({
                        // получение данных
                        type: "POST",
                        url: "/back-end/api/UserProfile.php",
                        async: false,
                        success: function (response) {
                            console.log('Запрос на получение данных в Profile');
                            if (response === 'guest') {
                                console.log('Невалидный токен'); // только для dev версии, убрать перед билдом
                                setLoggedIn(false);
                                return;
                            }
                            if (response === '') console.log('Пустой ответ сервера');
                            console.log('response = ', response);
                            console.log('profileData = ', profileData);
                            const parser = new DOMParser();
                            const xml = parser.parseFromString(response, "text/xml");
                            console.log('xml = ', xml);
                            const xmlCollection = xml.childNodes[0].childNodes; // первый тег user, он содержит в себе все нужные теги
                            console.log('xmlCollection', xmlCollection);
                            const arrayFromXML = [];
                            for (let i = 0; i < xmlCollection.length; i++) {
                                arrayFromXML[xmlCollection[i].tagName] = xmlCollection[i].innerHTML;
                            }
                            arrayFromXML.length = xmlCollection.length;
                            console.log('arrayFromXML', arrayFromXML);
                            setProfileData(arrayFromXML);
                        },
                        error: function (xhr, status) {
                            props.enqueueSnackbar('Ошибка авторизации. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
                            props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
                        },
                    });
                }
            } else if (response === 'guest' && loggedIn) {
                setLoggedIn(false);
            }
        },
        error: function (xhr, status) {
            props.enqueueSnackbar('Ошибка авторизации. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
            props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
        },
    });

    return (
        loggedIn ? <div>
            <Input
                label="Имя"
                type="text"
                name="name"
                value={profileData['name']}
            />
            <Input
                label="Логин"
                type="text"
                name="login"
                value={profileData['login']}  
            />
            <Input
                label="Email"
                type="text"
                name="email"
                autoComplete="email"
                value={profileData['email']}
                error={false}
            />
            <Input
                label="Телефон"
                type="text"
                name="phone"
                value={profileData['phone']}
                error={false}
            />
            <Input
                label="Адрес"
                type="text"
                name="address"
                value={profileData['address']}
                error={false}
            />
            <Input
                label="Город"
                type="text"
                name="city"
                value={profileData['city']}
                error={false}
            />
            <button onClick={() => {
                console.log('Exit Button');
                setLoggedIn(false);
                deleteCookie('token');
            }}>Выйти</button>
        </div>
        :
        <Redirect to="/login" />
    );
}

export default withSnackbar(Profile);
