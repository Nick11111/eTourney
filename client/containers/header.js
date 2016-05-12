import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalAction } from '../actions/modal-actions';
import { userSignout } from '../actions/auth-actions';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import SigninModal from '../components/auth/signin-modal';
import SignupModal from '../components/auth/signup-modal';

import { SIGNIN_MODAL, SIGNUP_MODAL } from '../constants';
import { MODAL_OPEN } from '../actions/action-types';

require('../components/style/_header.scss');

class Header extends Component {


  renderUserNav() {
    if (this.props.isAuthenticated && this.props.email) {
      return (
        <Nav pullRight>
          <NavDropdown eventKey={3} title="User" id="basic-nav-dropdown">
            <MenuItem
              eventKey={3.1}
              onClick={() => this.props.userSignout()}
            >Sign out</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.2}>Signed in as: {this.props.email}</MenuItem>
          </NavDropdown>
        </Nav>
      );
    } else {
      return (
        <Nav pullRight>
          <NavItem
            eventKey={1}
            onClick={() => this.props.modalAction(SIGNIN_MODAL, MODAL_OPEN)}
            href="#"
          >Sign In</NavItem>
          <NavItem
            eventKey={2}
            onClick={() => this.props.modalAction(SIGNUP_MODAL, MODAL_OPEN)}
            href="#"
          >Sign Up</NavItem>
        </Nav>);
    }
  }

  render() {
    return (
      <Navbar fluid fixedTop>
        <NavbarHeader>
          <NavbarBrand>
            <a href="#">React-Bootstrap</a>
          </NavbarBrand>
          <NavbarToggle />
        </NavbarHeader>
        <NavbarCollapse>
            {this.renderUserNav()}
        </NavbarCollapse>

        <SigninModal
          show={this.props.showSignin}
          onHide={this.props.modalAction}
        />
        <SignupModal
          show={this.props.showSignup}
          onHide={this.props.modalAction}
        />
      </Navbar>
    );
  }
}

Header.propTypes = {
  showSignin: React.PropTypes.bool.isRequired,
  showSignup: React.PropTypes.bool.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  modalAction: React.PropTypes.func.isRequired,
};

Header.defaultProps = {
  showSignin: false,
  showSignup: false,
  isAuthenticated: false,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ modalAction, userSignout }, dispatch);
}

function mapStateToProps(state) {
  return {
    showSignin: state.Modal.showSignin,
    showSignup: state.Modal.showSignup,
    isAuthenticated: state.Auth.isAuthenticated,
    email: state.Auth.email,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);