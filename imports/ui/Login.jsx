import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'semantic-ui-react';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({
          error: 'Unable to login, check email and password'
        });
      } else {
        this.setState({
          error: ''
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Card
          centered={true}
          raised={true}
        >
          <Card.Content>
            <Card.Header>Short Lnk Log In</Card.Header>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <Form onSubmit={this.onSubmit.bind(this)} noValidate>
              <Form.Field>
                <label>Email Address</label>
                <input type="email" ref="email" name="email" placeholder="Email" />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" ref="password" name="password" placeholder="Password" />
              </Form.Field>
              <Button type="submit" primary>Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Login;