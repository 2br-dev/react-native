import React from 'react';
// import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
// import Form from './styles/StyledForm';
// import SubmitContainer from './styles/SubmitContainer';
// import { withSnackbar } from 'notistack';
// import Input from './Input';
import { Form, Item, Label, Input, Button, Text } from 'native-base';

/* <Link to={{
                    pathname: "/forgot",
                    state: { loggedIn: props.loggedIn }
                }}>Забыли пароль?</Link> 
            
variant="contained"
                color="primary"
                onClick={() => {
                    props.onClick(props.data.login, props.data.password);
                }}
*/

function SignInForm(props)
{   
    return (
        <Form style={{
            marginHorizontal: 10
        }}>
            <Item floatingLabel>
                <Label>Username</Label>
                <Input />
            </Item>
            <Item floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry />
            </Item>
            <Button block>
                <Text>Войти</Text>
            </Button>
        </Form>
    );
}

export default SignInForm;
