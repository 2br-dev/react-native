import React, { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import { Container, Header, Tabs, Tab, Content } from 'native-base';
import { AppFontLoader } from '../logic/AppFontLoader';
import { validateEmail, validatePass, confirmPass } from '../logic/Validate';
import { Registration } from '../logic/Registration';
import { auth } from '../logic/Authentication';

function AuthScreen(props)
{
    const [loggedIn, setLoggedIn] = useState(props.loggedIn);

    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
        showPassword: false,
    });

    const handleChangeLogin = value => {
        setLoginData({ ...loginData, login: value});
    };

    const handleChangeSignInPassword = value => {
        setLoginData({ ...loginData, password: value});
    };

    const handleAuth = () => {
        if (!auth(loginData.login, loginData.password)) {
            // props.enqueueSnackbar('Неверный логин или пароль', { variant: 'error'});
        } else {
            setLoggedIn(true);
        }
    };

    const [regData, setRegData] = useState({
        email: '',
        password: '',
        confirm: '',
        validEmail: true,
        emailErrorMsg: '',
        validPassword: true,
        passConfirmed: false,
    });

    const handleChangeEmail = value => {
        setRegData({ ...regData, email: value});
    };

    const handleChangeSignUpPassword = value => {
        setRegData({ ...regData, password: value});
    };

    const handleChangeConfirm = value => {
        setRegData({ ...regData, confirm: value});
    };

    /* const handleChangeReg = event => {
        let isValid = regData.validEmail;
        let errorMsg = '';
        let validResponse = null;
        switch (event.target.name) {
            case 'email':
                validResponse = validateEmail(event.target.value);
                switch (validResponse) {
                    case 1:
                        isValid = true;
                        break;
                    case 0:
                        isValid = false;
                        errorMsg = 'Введите корректный Email';
                        break;
                    case -1:
                        isValid = false;
                        errorMsg = 'Пользователь с таким Email уже зарегистрирован';
                        break;

                    default:
                        isValid = false;
                        errorMsg = validResponse;
                        break;
                }
                setRegData({
                    ...regData,
                    email: event.target.value,
                    validEmail: isValid,
                    emailErrorMsg: errorMsg,
                });
                break;
            
            case 'password':
                setRegData({
                    ...regData,
                    password: event.target.value,
                    validPassword: validatePass(event.target.value),
                });
                break;

            case 'confirm':
                setRegData({
                    ...regData,
                    confirm: event.target.value,
                    passConfirmed: confirmPass(regData.password, event.target.value),
                });
                break;

            default:
                break;
        }
    }; */

    const handleReg = () => {
        const email = regData.email;
        const password = regData.password;

        const regResponse = Registration(email, password);
        switch (regResponse) {
            case 'error':
                // props.enqueueSnackbar('Ошибка отправки запроса на сервер. Проверьте ваше интернет соединение.');
                break;
        
            case 'дубль':
                // props.enqueueSnackbar('Пользователь с таким Email уже зарегистрирован', { variant: 'error' });
                break;

            default:
                setRegData({
                    email: '',
                    password: '',
                    confirm: '',
                    showPassword: false,
                    validEmail: true,
                    validPassword: true,
                    passConfirmed: false,
                });
                // props.enqueueSnackbar(regResponse, { variant: 'success' });
                break;
        }
    };

    return(
        <AppFontLoader>
            <Container>
                <Header hasTabs />
                <Content>
                    <Tabs>
                        <Tab heading="Login">
                            <SignInForm
                                data={loginData}
                                onChangeLogin={handleChangeLogin}
                                onChangePassword={handleChangeSignInPassword}
                                onClick={handleAuth}
                            />
                        </Tab>
                        <Tab heading="Registration">
                            <SignUpForm
                                data={regData}
                                onChangeEmail={handleChangeEmail}
                                onChangePassword={handleChangeSignUpPassword}
                                onChangeConfirm={handleChangeConfirm}
                                onClick={handleReg}
                            />
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        </AppFontLoader>
    );
}

export default AuthScreen;
