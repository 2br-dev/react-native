import React, { useState } from 'react';
import Input from './Input';
//import { makeStyles } from '@material-ui/styles';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import { validateEmail, validatePass, confirmPass } from './logic/Validate';
import { getProfileData } from './logic/GetProfileData';
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
    const [profileData, setProfileData] = useState({});
    const [formData, setFormData] = useState({
        password: '',
        confirm: '',
        validEmail: true,
        validPassword: true,
        passConfirmed: true,
    });

    console.log('initial profileData = ',profileData);

    const handleBlur = event => {
        console.log('blur '+event.target.name);
        console.log('value = '+event.target.value);
        console.log('profileData on blur = ',profileData);
        const name = event.target.name;
        const value = event.target.value;
        $.ajax({
            type: "POST",
            url: "/back-end/api/UpdateController.php",
            data: "accessToken="+localStorage.getItem('accessToken')+"="+name+"="+value,
            success: function(response) {
                console.log('success request');
                console.log('Ответ сервера: '+response);
            }
        });
        console.log('end blur');
    }

    const handleChange = event => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'name':
                console.log('profileData in handleChange = ',profileData);
                console.log('name value = ',value);
                setProfileData({ ...profileData, name: value});
                break;

            case 'login':
                console.log('profileData in handleChange = ',profileData);
                console.log('login value = ',value);
                setProfileData({ ...profileData, login: value});
                break;
            
            case 'email':
                console.log('profileData in handleChange = ',profileData);
                console.log('email value = ',value);
                setProfileData({ ...profileData, email: value});
                setFormData({
                    ...formData,
                    validEmail: validateEmail(value),
                });
                break;

            case 'phone':
                console.log('profileData in handleChange = ',profileData);
                console.log('phone value = ',value);
                setProfileData({ ...profileData, phone: value});
                break;

            case 'address':
                console.log('profileData in handleChange = ',profileData);
                console.log('address value = ',value);
                setProfileData({ ...profileData, address: value});
                break;

            case 'city':
                console.log('profileData in handleChange = ',profileData);
                console.log('city value = ',value);
                setProfileData({ ...profileData, city: value});
                break;
            
            case 'password':
                setFormData({
                    ...formData,
                    password: value,
                    validPassword: validatePass(value),
                });
                break;

            case 'confirm':
                setFormData({
                    ...formData,
                    confirm: value,
                    passConfirmed: confirmPass(formData.password, value),
                });
                if (formData.validPassword && confirmPass(formData.password, value)) {
                    handleBlur(event);
                    console.log('formData.password = '+formData.password);
                    console.log('confirm password value = '+value);
                    setFormData({
                        ...formData,
                        password: '',
                        confirm: '',
                        validPassword: true,
                        passConfirmed: true,
                    });
                    props.enqueueSnackbar('Пароль изменён', { variant: 'success' });
                }
                break;

            default:
                alert('Неизвестное поле! Атрибут поля name должен быть одним из: email, password, confirm')
        }
    };

    if (loggedIn) {
        console.log('profileData in if statement = ', profileData);
        let keyCount = 0;
        for (let key in profileData) {
            keyCount++;
        }
        // если объект profileData пуст, значит данные запрашиваются первый раз
        // проверка необходима для предотвращения повторных запросов, на уже полученные данные
        if (keyCount === 0) {
            console.log('profileData.length == 0');
            const data = getProfileData();
            if (data) {
                setProfileData(data);
            }
        }
    }

    return (
        console.log('Profile -> return: loggedIn = '+loggedIn),
        console.log('profileData return = ',profileData),
        console.log('formData return = ',formData),
        loggedIn ? <div>
            <Input
                label="Имя"
                type="text"
                name="name"
                value={profileData['name']}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Input
                label="Логин"
                type="text"
                name="login"
                value={profileData['login']}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={profileData['email']}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formData.validEmail ? false : true}
                helperMsg={formData.validEmail ? '' : 'Введите корректный Email'}
            />
            <Input
                label="Телефон"
                type="text"
                name="phone"
                value={profileData['phone']}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Input
                label="Адрес"
                type="text"
                name="address"
                value={profileData['address']}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Input
                label="Город"
                type="text"
                name="city"
                value={profileData['city']}
                onChange={handleChange}
                onBlur={handleBlur}
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
                onChange={handleChange}
                error={formData.passConfirmed ? false : true}
                helperMsg={formData.passConfirmed || formData.password === '' ? '' : 'Пароли должны совпадать'}
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
