import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Form from './StyledForm';
import SubmitContainer from './SubmitContainer';
//import $ from 'jquery';
import { withSnackbar } from 'notistack';

function LoginForm(props)
{
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        showPassword: false,
    });

     const handleChange = prop => event => {
        setFormData({ ...formData, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword});
    };

    /*const handleClick = () => {
        const { login, password } = formData;
        
        $.ajax({
            type: "POST",
            url: "/back-end/api/AuthController.php",
            data: "login="+login+"&password="+password,
            success: function (responseMsg) {
                if (responseMsg === 'Отказ') {
                    props.enqueueSnackbar('Неверный логин или пароль', { variant: 'error'});
                }
                // отправлять на страницу Profile
            },
            error: function (xhr, status) {
                props.enqueueSnackbar('Ошибка авторизации. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
                props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
            }
        });
    };*/
    
    return (
        <Form>
            <TextField
                fullWidth
                label="Email или логин"
                type="email"
                autoComplete="email"
                value={formData.login}
                onChange={handleChange('login')}
                margin="dense"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Пароль"
                type={formData.showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                margin="dense"
                variant="outlined"
                onChange={handleChange('password')}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                aria-label="Toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <SubmitContainer>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        props.onClick(formData.login, formData.password);
                    }}
                >
                    Войти
                </Button>
                <Link component="button" to="/forgot">Забыли пароль?</Link>
            </SubmitContainer>
        </Form>
    );
}

export default withSnackbar(LoginForm);
