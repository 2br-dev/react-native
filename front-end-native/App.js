import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Container, Header, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';
// import { Font } from 'expo';
// import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthRouter from './logic/AuthRouter';
import Profile from './logic/Profile';
import AuthScreeen from './screens/AuthScreen';

const AppContainer = createAppContainer(createSwitchNavigator(
  {
      AuthLoading: AuthRouter,
      Profile: Profile,
      Auth: AuthScreeen,
  },
  {
      initialRouteName: 'AuthLoading',
  }
));

export default AppContainer;
