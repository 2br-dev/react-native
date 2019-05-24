import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'block',
    margin: '20px',
  },
  submit: {
    marginLeft: '20px',
  },
}));

function LoginForm() {
  const classes = useStyles();
  
  return (
    <form>
      <Input className={classes.input} placeholder="Имя пользователя" />
      <Input className={classes.input} placeholder="Пароль" />
      <Button className={classes.submit} variant="contained" color="primary">Войти</Button>
    </form>
  );
}

export default LoginForm;
