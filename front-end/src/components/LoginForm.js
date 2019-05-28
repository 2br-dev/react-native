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

function LoginForm()
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
                <Button variant="contained" color="primary">Войти</Button>
                <Link component="button" to="/">Забыли пароль?</Link>
            </SubmitContainer>
        </Form>
    );
}

export default LoginForm;
