import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import Form from './styles/StyledForm';
import SubmitContainer from './styles/SubmitContainer';
import { validateEmail, validatePass, confirmPass } from './logic/Validate';
import { Registration } from './logic/Registration';
import Input from './Input';

function SignUpForm(props)
{
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm: '',
        validEmail: true,
        emailErrorMsg: '',
        validPassword: true,
        passConfirmed: false,
    });

    const handleChange = event => {
        let isValid = formData.validEmail;
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
                setFormData({
                    ...formData,
                    email: event.target.value,
                    validEmail: isValid,
                    emailErrorMsg: errorMsg,
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

    function handleClick() {
        const email = formData.email;
        const password = formData.password;

        const regResponse = Registration(email, password);
        switch (regResponse) {
            case 'error':
                props.enqueueSnackbar('Ошибка отправки запроса на сервер. Проверьте ваше интернет соединение.');
                break;
        
            case 'дубль':
                props.enqueueSnackbar('Пользователь с таким Email уже зарегистрирован', { variant: 'error' });
                break;

            default:
                setFormData({
                    email: '',
                    password: '',
                    confirm: '',
                    showPassword: false,
                    validEmail: true,
                    validPassword: true,
                    passConfirmed: false,
                });
                props.enqueueSnackbar(regResponse, { variant: 'success' });
                break;
        }
    }

    return (
        <Form>
            <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={formData.validEmail ? false : true}
                helperMsg={formData.emailErrorMsg}
            />
                 
            <Input
                label="Пароль"
                type='password'
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={formData.validPassword || formData.password === '' ? false : true}
                helperMsg={formData.validPassword || formData.password === '' ? '' : 'Пароль должен быть не менее 8 символов'}
            />
            
            <Input
                label="Повторите пароль"
                type='password'
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                error={formData.passConfirmed || formData.confirm === '' ? false : true}
                helperMsg={formData.passConfirmed || formData.confirm === '' ? '' : 'Пароли должны совпадать'}
            />

            <SubmitContainer>
                <Button
                    disabled={formData.validEmail && formData.validPassword && formData.passConfirmed ? false : true}
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Регистрация
                </Button>
            </SubmitContainer>
        </Form>
    );
}

export default withSnackbar(SignUpForm);
