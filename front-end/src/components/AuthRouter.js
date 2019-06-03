import React, { useState } from 'react';
import Form from './logic/Form';
import Menu from './Menu';
import { Redirect } from 'react-router';
import { withSnackbar } from 'notistack';

function AuthRouter(props)
{
    const [page, setPage] = useState('signIn'); // какую форму отображать, Вход/Регистрация - signIn/signUp

    function handleClick(state) {
        setPage(state);
    }

    return (
        console.log('AuthRouter -> return: loggedIn = '+props.location.state.loggedIn),
        props.loggedIn ? <Redirect to={{
            pathname: "/profile",
            state: { loggedIn: props.location.state.loggedIn }
        }}
        />
        :
        <div>
            <Menu
                signIn={() => handleClick('signIn')}
                signUp={() => handleClick('signUp')}
                active={page}
            />
            <Form type={page} loggedIn={ props.location.state.loggedIn } />
        </div>
    );
}

export default withSnackbar(AuthRouter);
