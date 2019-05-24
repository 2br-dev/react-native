import React from 'react';
import LoginForm from './LoginForm';
import Registration from './Registration';

function Form(props) {
  if (props.type === 'signIn') {
    return (<LoginForm />);
  } else if (props.type === 'signUp') {
    return (<Registration />);
  } else {
    return (<h1>404 Page not found</h1>);
  }
}

export default Form;
