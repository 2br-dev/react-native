import React from 'react';
import Container from '@material-ui/core/Container';
import Menu from './components/Menu';
import Form from './components/Form';
import { SnackbarProvider } from 'notistack';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'signIn',
    };
  }

  handleClick(state) {
    this.setState({
      page: state,
    });
  }

  render() {
    return (
      <SnackbarProvider maxSnack={3}>
        <Container maxWidth="sm">
          <Menu
            signIn={() => this.handleClick('signIn')}
            signUp={() => this.handleClick('signUp')}
          />
          <Form type={this.state.page}/>
        </Container>
      </SnackbarProvider>
    );
  }
}

export default App;
