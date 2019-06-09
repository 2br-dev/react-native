import React from 'react';
// import { View } from 'native-base';
// import Button from '@material-ui/core/Button';
// import { withSnackbar } from 'notistack';
// import Form from './styles/StyledForm';
// import SubmitContainer from './styles/SubmitContainer';
// import Input from './Input';
import { Alert } from 'react-native';
import { Form, Item, Label, Input, Button, Text } from 'native-base';

function SignUpForm(props)
{
    let {data, onChangeEmail, onChangeSignUpPassword, onChangeConfirm, onClick} = props;
    return (
        <Form style={{
            marginHorizontal: 10
        }}>
            <Item floatingLabel>
                <Label>Email</Label>
                <Input
                    name='email'
                    keyboardType='email-address'
                    onChangeText={onChangeEmail}
                />
            </Item>
            <Item floatingLabel last>
                <Label>Пароль</Label>
                <Input
                    secureTextEntry
                    name='password'
                    onChangeText={onChangeSignUpPassword}
                />
            </Item>
            <Item floatingLabel last>
                <Label>Повторите пароль</Label>
                <Input
                    secureTextEntry
                    name='confirm'
                    onChangeText={onChangeConfirm}
                />
            </Item>
            <Button
                block
                style={{
                    marginTop: 64
                }}
                onPress={onClick}
            >
                <Text>Регистрация</Text>
            </Button>
        </Form>
    );
}

export default SignUpForm;
