import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import { withSnackbar } from 'notistack';
import Form from './styles/StyledForm';
import SubmitContainer from './styles/SubmitContainer';
import { validateEmail, validatePass, confirmPass } from './logic/Validate';
import Input from './Input';

function Registration(props)
{
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm: '',
        validEmail: true,
        validPassword: true,
        passConfirmed: false,
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

    function handleClick() {
        const email = formData.email;
        const password = formData.password;
      
        $.ajax({
            // регистрация пользователя
            type: "POST",
            url: "/back-end/api/RegistrationController.php",
            data: "email="+email+"&password="+password,
            success: function (responseMsg) {
                if (responseMsg === 'Дубликат') {
                    props.enqueueSnackbar('Пользователь с таким Email уже зарегистрирован', { variant: 'error' });
                } else {
                    setFormData({
                        email: '',
                        password: '',
                        confirm: '',
                        showPassword: false,
                        validEmail: true,
                        validPassword: true,
                        passConfirmed: false,
                    });
                    props.enqueueSnackbar(responseMsg, { variant: 'success' });
                }
            },
            error: function (xhr, status) {
                props.enqueueSnackbar('Во время регистрации возникла ошибка. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
                props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
            }
        });
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
                helperMsg={formData.validEmail ? '' : 'Введите корректный Email'}
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

export default withSnackbar(Registration);
