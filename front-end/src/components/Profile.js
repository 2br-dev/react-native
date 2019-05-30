import React, { useState } from 'react';
import Input from './Input';
//import { makeStyles } from '@material-ui/styles';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { withSnackbar } from 'notistack';

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
        type: "POST",
        url: "/back-end/api/AuthController.php",
        data: "signedIn=q",
        async: false,
        success: function (response) {
            const userId = response;
            console.log('Запрос!');
            console.log('userId', userId);
            if (response !== 'guest') {
                if (!loggedIn) {
                    console.log('Меняю loggedIn');
                    setLoggedIn(true);
                }
                console.log('profileData', profileData);
                if (profileData.length === 0) {
                    console.log('Вошёл в иф');
                    $.ajax({
                        type: "POST",
                        url: "/back-end/api/UserProfile.php",
                        data: "id="+userId,
                        async: false,
                        success: function (response) {
                            if (response === 'Неизвестный запрос') {
                                console.log('Запрос к серверу должен содержать обязательное поле');
                                return;
                            }
                            if (response === '') console.log('Пустой ответ сервера');
                            console.log('response', response);
                            console.log('profileData', profileData);
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
            } else if (loggedIn) {
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
        </div>
        :
        <Redirect to="/login" />
    );
}

export default withSnackbar(Profile);
