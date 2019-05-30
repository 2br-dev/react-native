import React from 'react';
import Login from '../Login';
import Registration from '../Registration';

function Form(props)
{
    if (props.type === 'signIn') {
        return (<Login />);
    } else if (props.type === 'signUp') {
        return (<Registration />);
    } else {
        return (<h1>404 Page not found</h1>);
    }
}

export default Form;