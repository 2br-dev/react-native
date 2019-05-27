import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import $ from 'jquery';
import { withSnackbar } from 'notistack';

class Registration extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      showPassword: false,
    };

    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const email = this.state.email;
    const password = this.state.password;
    const confirm = this.state.confirm;
    const comp = this;

    if (password !== confirm) {
      this.props.enqueueSnackbar('Пароль подтверждён неверно', { variant: 'error' });
      return;
    }

    /*this.setState({
      email: '',
      password: '',
      confirm: '',
      showPassword: false,
    });
    this.props.enqueueSnackbar('Успешная рега', { variant: 'success' });*/
  
    $.ajax({
      type: "POST",
      url: "/back-end/api/user/CreateUser.php",
      data: "email="+email+"&password="+password,
      success: function (msg) {
        comp.setState({
          email: '',
          password: '',
          confirm: '',
          showPassword: false,
        });
        comp.props.enqueueSnackbar(msg, { variant: 'success' });
      }
    });
  }

  render()
  {
    return (
      <form style={{ padding: "20px" }}>
        <Input
          fullWidth
          style={{ marginBottom: "30px" }}
          id="email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          placeholder="Email"
        />
        <Input
          fullWidth
          style={{ marginBottom: "30px" }}
          id="password"
          type={this.state.showPassword ? 'text' : 'password'}
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
        <Input
          fullWidth
          style={{ marginBottom: "30px" }}
          id="confirmPass"
          type={this.state.showPassword ? 'text' : 'password'}
          value={this.state.confirm}
          onChange={this.handleChange('confirm')}
          placeholder="Подтвердите пароль"
        />
        <Button
          id="submit"
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
          Регистрация
        </Button>
      </form>
    );
  }
}

export default withSnackbar(Registration);
