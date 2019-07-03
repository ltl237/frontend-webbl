import React, { Component, Fragment } from 'react';
import Signup from '../components/Signup'
import Login from '../components/Login'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, loginUser} from '../redux/actions';

class LoginSignupContainer extends Component {
  state = {
    signupIsClicked: false
  }

  handleClick = (event) => {
    console.log("clicked")
  }

  handleSignupClick = (event) => {
    event.preventDefault()
    this.setState({
      signupIsClicked: !this.state.signupIsClicked
    })
  }


  render() {
    // console.log(this.state);
    // console.log(this.state.signupIsClicked);
    return (
      <Fragment>

      <div className="login-signup-div">


        <div className="homepage-div-container">

        </div>

        <div className="credentials-div">


          {
            this.state.signupIsClicked ?
              <Fragment>
                <Signup />
                <button onClick={this.handleSignupClick} value="Back to Login">Back to Login</button>
              </Fragment>
              :
              <Fragment>
                <Login />
                <button onClick={this.handleSignupClick} value="Sign Up">Sign Up</button>
              </Fragment>
          }
        </div>
      </div>
      </Fragment>
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
