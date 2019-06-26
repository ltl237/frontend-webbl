import React, {Component,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginSignupContainer from "./containers/LoginSignupContainer"
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import Signup from './components/Signup'
import Login from './components/Login'
import EntriesContainer from './containers/EntriesContainer'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, setCurrentUserLoggedIn} from './redux/actions';

class App extends Component {
  state = {
    currentUserLoggedIn: {}
  }

  componentDidMount() {
    this.props.getProfileFetch()
    this.setState({
      currentUserLoggedIn: this.props.currentUserLoggedIn
    })
  }


  handleClickLogout = event => {
    event.preventDefault()
    // Remove the token from localStorage
    localStorage.removeItem("token")
    // Remove the user object from the Redux store
    this.props.logoutUser()
  }

  render(){

    // debugger

    return (
      <div className="App">


            {this.props.currentUserLoggedIn === {}
            ?
            <Fragment>
              <EntriesContainer/>
              <button onClick={this.handleClickLogout}>Log Out</button>
            </Fragment>
            :
            <LoginSignupContainer />
          }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  setCurrentUserLoggedIn: (userObj) => dispatch(setCurrentUserLoggedIn(userObj)),
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
