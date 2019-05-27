import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';

class LoginForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    };
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  
  render()
  {
    const SubmitArea = styled.div`
      display: flex;
      justify-content: space-between;
    `;
    
    return (
      <form style={{ padding: "20px" }}>
        <Input
          fullWidth
          style={{ marginBottom: "30px" }}
          value={this.state.username}
          onChange={this.handleChange('username')}
          placeholder="Имя пользователя"
        />
        <Input
          fullWidth
          type={this.state.showPassword ? 'text' : 'password'}
          style={{ marginBottom: "30px" }}
          value={this.state.password}
          onChange={this.handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Пароль"
        />
        <SubmitArea>
          <Button variant="contained" color="primary">Войти</Button>
          <Link component="button" to="/">Забыли пароль?</Link>
        </SubmitArea>
      </form>
    );
  }
}

export default LoginForm;
