import React from 'react';
import Container from '@material-ui/core/Container';
import Menu from './Menu';
import Form from './Form';

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
      <Container maxWidth="sm">
        <Menu
          signIn={() => this.handleClick('signIn')}
          signUp={() => this.handleClick('signUp')}
        />
        <Form type={this.state.page}/>
      </Container>
    );
  }
}

export default App;
