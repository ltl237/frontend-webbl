import React, {Component,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginSignupContainer from "./containers/LoginSignupContainer"
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import Signup from './components/Signup'
import Login from './components/Login'
import EntriesContainer from './containers/EntriesContainer'
import ProfileContainer from './containers/ProfileContainer'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, setCurrentUserLoggedIn, viewOwnProfile, viewHome, fetchAllTheEntries, fetchAllUsers} from './redux/actions';

class App extends Component {

  componentDidMount() {
    this.props.getProfileFetch()

    this.props.fetchAllTheEntries()
    this.props.fetchAllUsers()
  }


  handleClickLogout = event => {
    event.preventDefault()
    // Remove the token from localStorage
    localStorage.removeItem("token")
    // Remove the user object from the Redux store
    this.props.logoutUser()

  }

  viewMyProfileClick = event => {
    event.preventDefault()
    this.props.viewOwnProfile()
  }

  viewHomePageClick = event => {
    event.preventDefault()
    this.props.viewHome()
  }

  render(){
    console.log(this.props.profileToView);
    return (
      <div className="App">

            {this.props.currentUserLoggedIn.username
            ?
            <Fragment>
              <Fragment>
                <div className="navsl">
                    <a className="logo" href="" onClick={this.viewHomePageClick} ><img style={{height:"50px"}} src="./infinity.svg"/></a>
                    <p>Welcome to BookFace, {this.props.currentUserLoggedIn.username}! <small className="text-muted">(The best social network...)</small></p>
                    <div>
                      <p><a onClick={this.creatingNewPost} href=""><img className="nav-icon"  style={{height:"50px"}}  src="./edit.png"/></a>Create A Post</p>
                    </div>
                    <a className="my-profile" onClick={this.viewMyProfileClick} href="">my Profile</a>
                    <button className="logout-button button" onClick={this.handleClickLogout}>Log Out</button>
                </div>
              </Fragment>
              {this.props.profileToView.username ?
                <ProfileContainer/>
                :
                <EntriesContainer/>
              }


            </Fragment>
            :
            <LoginSignupContainer />
          }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
  profileToView: state.usersReducer.profileToView,
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  logoutUser: () => dispatch(logoutUser()),
  viewOwnProfile: (userObj) => dispatch(viewOwnProfile(userObj)),
  viewHome: (e) => dispatch(viewHome(e)),
  fetchAllTheEntries: () => dispatch(fetchAllTheEntries()),
  fetchAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
