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
import EntrySearch from './components/EntrySearch'
import {connect} from 'react-redux';
import {getProfileFetch,stopDMing,arrangeEntries,offViewingProfileBool,isEditingEntryToggle, stopCreatingNewEntry, logoutUser, isDMing, viewSomeonesProfile,viewEntriesOnProfile, setCurrentUserLoggedIn, viewOwnProfile, viewHome, fetchAllTheEntries, fetchAllUsers, isCreatingNewEntry, createNewEntry} from './redux/actions';

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
    this.props.arrangeEntries(this.props.allEntries)
    this.props.offViewingProfileBool()
    // this.props.isEditingEntryToggle()
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

                <strong className="logo"><a  href="" onClick={this.viewHomePageClick} ><img style={{height:"50px"}} src="./w.png"/></a>ebbl</strong>
                <EntrySearch/>
                <div className="btn-group" role="group">
                    {this.props.isEditingEntry ?
                      null
                      :
                      <Fragment>
                      <div className="new-entry-div icon-wrapper">
                      <a onClick={this.handleNewEntryClick} href=""><img className="nav-icon entry-image"  style={{height:"40px"}}  src="./edit.png"/></a>
                      <p className="new-p">New Entry</p>
                      </div>
                      </Fragment>
                    }
                  <div className="my-profile-div icon-wrapper">
                  <a className="my-profile" onClick={this.viewMyProfileClick} href=""><img title="My Webbl" className="nav-icon profile-image" style={{height:"40px"}} src="./Blank-avatar.png"/></a>
                  <p className="new-p-profile">Profile</p>
                  </div>
                  <div className="logout-div icon-wrapper">
                  <a onClick={this.handleClickLogout} href=""><img title="Logout" className="nav-icon logout-image" style={{height:"40px"}} src="./logout.png" /></a>
                  <p className="logout-p">Logout</p>
                  </div>
                </div>
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
  userToDM: state.conversationsReducer.userToDM,
  isEditingEntry: state.entriesReducer.isEditingEntry,
  allEntries: state.entriesReducer.allEntries
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
  stopDMing: () => dispatch(stopDMing()),
  isEditingEntryToggle: () => dispatch(isEditingEntryToggle()),
  arrangeEntries: (entriesArray) => dispatch(arrangeEntries(entriesArray)),
  offViewingProfileBool: () => dispatch(offViewingProfileBool())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);



//
