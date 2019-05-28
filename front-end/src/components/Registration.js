import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import $ from 'jquery';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Form from './StyledForm';
import SubmitContainer from './SubmitContainer';

function Registration(props)
{
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setFormData({ ...formData, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword});
    };

    function handleClick() {
        const email = formData.email;
        const password = formData.password;
        const confirm = formData.confirm;

        if (password !== confirm) {
            props.enqueueSnackbar('Пароль подтверждён неверно', { variant: 'error' });
            return;
        }
      
        $.ajax({
            type: "POST",
            url: "/back-end/api/RegistrationController.php",
            data: "email="+email+"&password="+password,
            success: function (msg) {
                setFormData({email: '', password: '', confirm: '', showPassword: false});
                props.enqueueSnackbar(msg, { variant: 'success' });
            }
        });
    }

    return (
        <Form>
            <TextField
                fullWidth
                label="Email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange('email')}
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
            
            <TextField
                fullWidth
                label="Повторите пароль"
                type={formData.showPassword ? 'text' : 'password'}
                value={formData.confirm}
                margin="dense"
                variant="outlined"
                onChange={handleChange('confirm')}
            />

            <SubmitContainer>
                <Button
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
