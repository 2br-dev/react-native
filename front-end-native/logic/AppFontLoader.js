import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class AppFontLoader extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fontLoaded: false,
        };
    }

    async componentWillMount()
    {
        try {
            await Font.loadAsync({
                'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
                'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
            });

            this.setState({ fontLoaded: true });
        } catch (error) {
            console.log('Ошибка загрузки шрифта Roboto: ', error);
        }
    }

    render()
    {
        if (!this.state.fontLoaded) {
            return <AppLoading />;
        }

        return this.props.children;
    }
}

export { AppFontLoader };
