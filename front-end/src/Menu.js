import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function Menu(props) {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <Button onClick={props.signIn}>Вход</Button>
      <Button onClick={props.signUp}>Регистрация</Button>
    </Toolbar>
  );
}

export default Menu;
