import React from 'react';
import Login from '../Login';
import Registration from '../Registration';

function Form(props)
{
    if (props.type === 'signIn') {
        return (
            console.log('Form -> return: loggedIn = '+props.loggedIn),
            <Login loggedIn={props.loggedIn} />
        );
    } else if (props.type === 'signUp') {
        return (
            console.log('Form -> return: loggedIn = '+props.loggedIn),
            <Registration />
        );
    } else {
        return (<h1>404 Page not found</h1>);
    }
}

export default Form;