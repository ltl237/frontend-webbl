import React, { Component, Fragment } from 'react';
import Signup from '../components/Signup'
import Login from '../components/Login'
import {connect} from 'react-redux';

class LoginSignupContainer extends Component {

  render() {
    return (
      <div>
        <Signup setCurrentUser={this.props.setCurrentUser}/>
        <Login setCurrentUser={this.props.setCurrentUser}/>
      </div>
    );
  }

}

export default LoginSignupContainer;
