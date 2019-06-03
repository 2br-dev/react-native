import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Profile from './components/Profile';
import { SnackbarProvider } from 'notistack';
import { Redirect, Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './components/AuthRouter';
import { AuthCheck } from './components/logic/AuthCheck';

function App(props)
{
    const [loggedIn, setLoggedIn] = useState(false);

    if (AuthCheck()) {
        console.log('App -> Пользователь авторизован, установил loggedIn в true.');
        setLoggedIn(true);
    }

    return (
        console.log('App -> return: loggedIn = '+loggedIn),
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <Container maxWidth="sm">
                    <Switch>
                        <Route exact path="/" render={() => (
                            loggedIn ? (
                                <Redirect to={{
                                    pathname: "/profile",
                                    state: { loggedIn: loggedIn }
                                }} />
                            ) : (
                                <Redirect to={{
                                    pathname: "/login",
                                    state: { loggedIn: loggedIn }
                                }} />
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
