import React, { useState } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import {AuthCheck} from './AuthCheck';

class AuthRouter extends React.Component
{
    // const [page, setPage] = useState('signIn'); // какую форму отображать, Вход/Регистрация - signIn/signUp
    // const [loggedIn, setLoggedIn] = useState(false);
    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: false,
            isReady: false,
        };
    }

    /* function handleClick(state) {
        setPage(state);
    } */

    /* const _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        props.navigation.navigate(userToken ? 'Profile' : 'Auth');
    };

    _bootstrapAsync(); */

    componentWillMount()
    {
        if (!this.state.loggedIn) {
            if (AuthCheck()) {
                this.setState({ loggedIn: true });
                this.props.navigation.navigate('Profile', { loggedIn: true });
            } else {
                this.props.navigation.navigate('Auth', { loggedIn: false });
            }
        }
    }

    render()
    {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

export default AuthRouter;
