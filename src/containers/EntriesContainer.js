import React, { Component, Fragment } from 'react';
import Signup from '../components/Signup'
import Login from '../components/Login'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, loginUser} from '../redux/actions';

class EntriesContainer extends Component {
  state = {
    currentUserLoggedIn: {}
  }


  render() {

    return (
      <div>

          posts

      </div>
    );
  }

}

export default EntriesContainer;
