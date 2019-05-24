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

function Registration() {
  const classes = useStyles();
  
  return (
    <form>
      <Input className={classes.input} placeholder="Email" />
      <Input className={classes.input} placeholder="Имя пользователя" />
      <Input className={classes.input} placeholder="Пароль" />
      <Button className={classes.submit} variant="contained" color="primary">Регистрация</Button>
    </form>
  );
}

export default Registration;
