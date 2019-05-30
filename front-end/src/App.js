import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Profile from './components/Profile';
import { SnackbarProvider } from 'notistack';
import { Redirect, Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './components/AuthRouter';
import $ from 'jquery';

function App(props)
{
    const [loggedIn, setLoggedIn] = useState(false);

    $.ajax({
        type: "POST",
        url: "/back-end/api/AuthController.php",
        data: "signedIn=q",
        async: false,
        success: function (response) {
            console.log('User status App = '+response);
            if (response !== 'guest') {
                if (!loggedIn) {
                    setLoggedIn(true);
                }
            } else {
                if (loggedIn) {
                    setLoggedIn(true);
                }
            }
        },
        error: function (xhr, status) {
            props.enqueueSnackbar('Ошибка авторизации. Пожалуйста, сообщите об этом администрации сайта.', { variant: 'error', autoHideDuration: 8000});
            props.enqueueSnackbar('Статус: '+status, { variant: 'error', autoHideDuration: 4000});
        },
    });

    return (
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <Container maxWidth="sm">
                    <Switch>
                        <Route exact path="/" render={() => (
                            loggedIn ? (
                                <Redirect to="/profile" />
                            ) : (
                                <Redirect to="/login" />
                            )
                        )} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/login" component={AuthRouter} />
                    </Switch>
                </Container>
            </SnackbarProvider>
        </BrowserRouter>
    );
}

export default App;
