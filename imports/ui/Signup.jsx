import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Form, Button, Card } from 'semantic-ui-react';
class Signup extends Component {
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

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 8 characters long'
      });
    }
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({
          error: err.reason
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
      <div className="mt-10">
        <Card
          centered={true}
          raised={true}
        >
          <Card.Content>
            <Card.Header>Sign Up</Card.Header>
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
              <Button type="submit" primary>Sign Up</Button>
            </Form>
            <Link to="/">Already have an account?</Link>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default Signup;