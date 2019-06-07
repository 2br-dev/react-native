import React, { useEffect } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import { Container, Header, Tabs, Tab, Content } from 'native-base';
import { AppFontLoader } from '../logic/AppFontLoader';

function AuthScreen(props)
{
    return(
        <AppFontLoader>
            <Container>
                <Header hasTabs />
                <Content>
                    <Tabs>
                        <Tab heading="Login">
                            <SignInForm />
                        </Tab>
                        <Tab heading="Registration">
                            <SignUpForm />
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        </AppFontLoader>
    );
}

export default AuthScreen;
