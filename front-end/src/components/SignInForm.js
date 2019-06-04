import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Form from './styles/StyledForm';
import SubmitContainer from './styles/SubmitContainer';
import { withSnackbar } from 'notistack';
import Input from './Input';

function SignInForm(props)
{
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        showPassword: false,
    });

     const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value});
    };
    
    return (
        <Form>
            <Input
                label="Email или логин"
                type="email"
                name="login"
                autoComplete="email"
                value={formData.login}
                onChange={handleChange}
            />
            <Input
                label="Пароль"
                type='password'
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
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

export default withSnackbar(SignInForm);
