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

  changeSignup = () => {
    this.setState({
      signupIsClicked: !this.state.signupIsClicked
    })
  }
  render() {
    // console.log(this.state);
    // console.log(this.props);
    return (
      <Fragment>

      <div className="login-signup-div">


        <div className="homepage-div-container">

        </div>

        <div className="credentials-div">
          {
            this.state.signupIsClicked ?
              <Fragment>
                <Signup changeSignup={this.changeSignup} />
              </Fragment>
              :
              <Fragment>
                <Login changeSignup={this.changeSignup} />
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
