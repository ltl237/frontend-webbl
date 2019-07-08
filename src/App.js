import React, {Component,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginSignupContainer from "./containers/LoginSignupContainer"
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import Signup from './components/Signup'
import Login from './components/Login'
import EntryForm from './components/EntryForm'
import ChatContainer from './containers/ChatContainer'
import EntriesContainer from './containers/EntriesContainer'
import ProfileContainer from './containers/ProfileContainer'
import DMContainer from './containers/DMContainer'
import {connect} from 'react-redux';
import {getProfileFetch,stopDMing, stopCreatingNewEntry, logoutUser, isDMing, viewSomeonesProfile,viewEntriesOnProfile, setCurrentUserLoggedIn, viewOwnProfile, viewHome, fetchAllTheEntries, fetchAllUsers, isCreatingNewEntry, createNewEntry} from './redux/actions';

class App extends Component {

  state = {
    isViewingChat: false
  }

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
    this.props.stopDMing()
    this.props.stopCreatingNewEntry()
    this.props.viewEntriesOnProfile(this.props.currentUserLoggedIn)
    this.props.viewSomeonesProfile(this.props.currentUserLoggedIn)

  }

  viewHomePageClick = event => {
    event.preventDefault()
    this.props.viewHome()
    const falseVal = false
    // this.props.isDMing(false)
    this.props.stopDMing()
    this.props.stopCreatingNewEntry()
    if (this.props.isCreatingNewEntryBool) {
      // this.props.isCreatingNewEntry(falseVal)
      this.setState({
        isViewingChat: !this.state.isViewingChat
      })
    }

  }

  handleNewEntryClick = event => {
    event.preventDefault()
    this.props.stopDMing()
    this.props.isCreatingNewEntry()
  }

  handleChatClick = event => {
    event.preventDefault()
    this.setState({
      isViewingChat: !this.state.isViewingChat
    })
  }

  renderPage = () => {
    // console.log(this.state.isViewingChat);
    // if (!this.state.isViewingChat) {
      if (this.props.profileToView.username) {
        if (this.props.isCreatingNewEntryBool) {
          return <Fragment><EntryForm/></Fragment>
        } else {
          return <Fragment><ProfileContainer/></Fragment>
        }
      } else {
        if (this.props.isDMingBool) {
          return <Fragment><DMContainer/></Fragment>
        } else {
          if (this.props.isCreatingNewEntryBool) {
            return <Fragment><EntryForm/></Fragment>
          } else {
            return <Fragment><EntriesContainer/></Fragment>
          }
        }

      }
    // }
    // else {
    //   return <ChatContainer/>
    // }
  }

  render(){
    // console.log("APP", this.props);
    // <a className="chat-link" onClick={this.handleChatClick} href="">Messenger</a>

    return (
      <div className="App">
        {this.props.currentUserLoggedIn.username
        ?

        <Fragment>
          <Fragment>
            <div className="navsl">
                <a className="logo" href="" onClick={this.viewHomePageClick} ><img style={{height:"50px"}} src="./infinity.svg"/></a>
                <p>Welcome to Webbl, {this.props.currentUserLoggedIn.username}! <small className="text-muted">(The best social network...)</small></p>
                <div>
                  <p><a onClick={this.handleNewEntryClick} href=""><img className="nav-icon"  style={{height:"50px"}}  src="./edit.png"/></a>Create A Post</p>
                </div>
                <a className="my-profile" onClick={this.viewMyProfileClick} href="">my Profile</a>
                <button className="logout-button button" onClick={this.handleClickLogout}>Log Out</button>
            </div>
          </Fragment>
          {this.renderPage()}
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
  isCreatingNewEntryBool: state.entriesReducer.isCreatingNewEntryBool,
  singleEntryToView: state.entriesReducer.singleEntryToView,
  isDMingBool: state.conversationsReducer.isDMingBool,
  userToDM: state.conversationsReducer.userToDM
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  logoutUser: () => dispatch(logoutUser()),
  viewOwnProfile: (userObj) => dispatch(viewOwnProfile(userObj)),
  viewHome: (e) => dispatch(viewHome(e)),
  fetchAllTheEntries: () => dispatch(fetchAllTheEntries()),
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  isCreatingNewEntry: () => dispatch(isCreatingNewEntry()),
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj)),
  viewEntriesOnProfile: userObj => dispatch(viewEntriesOnProfile(userObj)),
  isDMing: userObj => dispatch(isDMing(userObj)),
  stopCreatingNewEntry: () => dispatch(stopCreatingNewEntry()),
  stopDMing: () => dispatch(stopDMing())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);



//
