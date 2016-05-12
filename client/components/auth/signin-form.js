import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import { userSignin } from '../../actions/auth-actions';

class SigninForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.userSignin(this.state.email, this.state.password);
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="password" >
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </Col>
        </FormGroup>
        <Col smOffset={2} sm={10}>
        </Col>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={this.handleClick}>
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>

    );
  }
}

SigninForm.propTypes = {
  waiting: React.PropTypes.bool.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
};

SigninForm.defaultProps = {
  waiting: false,
  isAuthenticated: false,
};

function mapStateToProps(state) {
  return {
    waiting: state.Auth.signin.waiting,
    error: state.Auth.signin.error,
    isAuthenticated: state.Auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userSignin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);