import React, { useState } from 'react';
import Input from './Input';
//import { makeStyles } from '@material-ui/styles';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import { validateEmail, validatePass, confirmPass } from './logic/Validate';
import SubmitContainer from './styles/SubmitContainer';

/*const useStyles = makeStyles(theme => ({
    profileContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));*/

function Profile(props)
{
    //const classes = useStyles();
    const [loggedIn, setLoggedIn] = useState(props.location.state.loggedIn);
    const [profileData, setProfileData] = useState([]);
    const [formData, setFormData] = useState({
        password: '',
        confirm: '',
        validPassword: true,
        passConfirmed: true,
    });

    const handleChange = event => {
        switch (event.target.name) {
            case 'email':
                setFormData({
                    ...formData,
                    email: event.target.value,
                    validEmail: validateEmail(event.target.value),
                });
                break;
            
            case 'password':
                setFormData({
                    ...formData,
                    password: event.target.value,
                    validPassword: validatePass(event.target.value),
                });
                break;

            case 'confirm':
                setFormData({
                    ...formData,
                    confirm: event.target.value,
                    passConfirmed: confirmPass(formData.password, event.target.value),
                });
                break;

            default:
                alert('Неизвестное поле! Атрибут поля name должен быть одним из: email, password, confirm')
        }
    };

    if (loggedIn) {
        console.log('profileData = ', profileData);
        if (profileData.length === 0) {
            console.log('profileData.length == 0');
            $.ajax({
                // получение данных
                type: "POST",
                url: "/back-end/api/UserProfile.php",
                data: "accessToken="+localStorage.getItem('accessToken'),
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
                    props.enqueueSnackbar('Неудалось установить соединение с сервером. Проверьте интернет соединение и обновите страницу.', { variant: 'error', autoHideDuration: 8000});
                    props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
                    loggedIn(false);
                },
            });
        }
    }

    return (
        console.log('Profile -> return: loggedIn = '+loggedIn),
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
            <Input
                label="Новый пароль"
                type='password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formData.validPassword || formData.password === '' ? false : true}
                helperMsg={formData.validPassword || formData.password === '' ? '' : 'Пароль должен быть не менее 8 символов'}
            />
            <Input
                label="Повторите пароль"
                type="password"
                name="confirm"
                value={formData.confirm}
                error={formData.passConfirmed ? false : true}
                helperMsg={formData.validPassword || formData.password === '' ? '' : 'Пароль должен быть не менее 8 символов'}
            />
            <SubmitContainer>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        console.log('Exit Button');
                        setLoggedIn(false);
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                    }}
                >
                    Выйти
                </Button>
            </SubmitContainer>
        </div>
        :
        <Redirect to={{
            pathname: "/login",
            state: { loggedIn: loggedIn }
        }} />
    );
}

export default withSnackbar(Profile);
