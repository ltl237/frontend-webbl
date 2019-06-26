import React, { Component, Fragment } from 'react';
import Signup from '../components/Signup'
import Login from '../components/Login'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, loginUser} from '../redux/actions';

class LoginSignupContainer extends Component {
  render() {
    // console.log(this.state);
    // console.log(this.props);
    return (
      <div>

          <Signup/>
          <Login/>

      </div>
    );
  }

}

// export default LoginSignupContainer;
const mapStateToProps = state => ({
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn
})
const mapDispatchToProps = dispatch => ({
  // userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
  loginUser: userObj => dispatch(loginUser(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupContainer);
