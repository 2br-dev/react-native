import React from 'react';
import Container from '@material-ui/core/Container';
import FormContainer from './components/FormContainer';
import { SnackbarProvider } from 'notistack';

function App()
{
    return (
        <SnackbarProvider maxSnack={3}>
            <Container maxWidth="sm">
                <FormContainer />
            </Container>
        </SnackbarProvider>
    );
}

export default App;
