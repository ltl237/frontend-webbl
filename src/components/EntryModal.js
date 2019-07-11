import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import CommentForm from './CommentForm'
import EntryForm from './EntryForm'
import LikeButton from './LikeButton'
import EditEntryForm from './EditEntryForm'
import { API_ROOT, HEADERS } from '../constants';

import {connect} from 'react-redux';
import {userLoginFetch, viewEntriesOnProfile, viewSomeonesProfile, isDMing, getCommentsOnEntry, getAllLikings, getLikingsOnEntry, viewSingleEntry, isCreatingNewEntry, isEditingEntryToggle} from '../redux/actions';

class EntryModal extends Component {
  state = {
    canEditEntry: false,
    isViewingLikes: false
  }

  componentDidMount() {
    //ADD LOADING SCREEN FOR RENDERING COMMENTS

    // console.log(this.props.singleEntryToView);
    // if (this.props.singleEntryToView) {
    //
    //   if (this.props.currentUserLoggedIn.id === this.props.singleEntryToView.user.id) {
    //     this.setState({
    //       canEditEntry: true
    //     })
    //   }
    // }

    // this.props.getCommentsOnEntry(this.props.singleEntryToView)
    // this.props.getAllLikings()
    // console.log("before",this.props.likingsOnThisEntry);
    // this.props.getLikingsOnEntry(this.props.singleEntryToView)
    // console.log("After",this.props.likingsOnThisEntry);

  }

  fetchToWebsocket = (route, bodyData) => {
        fetch(`${API_ROOT}/${route}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
// Only, if we are saving JWT token in localStorage
                "Authorization": `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify(bodyData)
        })
}

  handleUserClick = (event, clickedUserObj) => {
    event.preventDefault()

    const userObj = this.props.allUsers.find(user => {
      return clickedUserObj.id === user.id
    })
    this.props.viewEntriesOnProfile(userObj)
    this.props.viewSomeonesProfile(userObj)
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").remove()
    }
    if (document.querySelector("body").classList.length > 0) {
      document.querySelector("body").classList.toggle("modal-open")
    }


  }

  handleChatClick = (event, clickedUserObj) => {
    event.preventDefault()
    this.props.isDMing(clickedUserObj)
    let body = {
            title: `${this.props.currentUserLoggedIn.id}-${clickedUserObj.id}`,
            sender_id: this.props.currentUserLoggedIn,
            receiver_id: clickedUserObj.id
        };

    // If the conversation already exists, execute exit function or do nothing. Otherwise, fetch conversation to WebSockets.

    let conversationThatExists = []

    // fetch("http://localhost:3000/api/v1/conversations")
    // .then(res => res.json())
    // .then(conversationData => {
    //   console.log(conversationData)
    //   conversationThatExists = conversationData.filter(conversation => conversation.user.id === clickedUserObj.id)
    // })
    // console.log("CHAT CLICK", body);

    this.fetchToWebsocket("conversations", body);


    // if (conversationThatExists) {
    //     this.props.exit();
    // }
    // else {
    //     this.fetchToWebsocket("conversations", body);
    //     this.props.exit();
    // }

  }

  renderUsername = comment => {
    let myUser = {}
    if (comment.user_id) {
      myUser = this.props.allUsers.filter(user => {
        return user.id === comment.user_id
      })
    } else if (comment.user.username) {
      return comment.user.username
    }
    // console.log(myUser);

  }

  handleLikingsClick = event => {
    event.preventDefault()
    // let userLikingsDivStyle = document.querySelector(".user-likings-div").style.display
    //document.querySelector(".user-likings-div").style.display
// "none"
    this.setState({
      isViewingLikes: !this.state.isViewingLikes
    })


  }

  renderLikings = (singleEntryToView) => {
    // debugger
    const likingsArray = this.props.likingsOnThisEntry.filter(liking => liking.entry.id === singleEntryToView.id)
    // console.log(likingsArray);

    if (likingsArray.length > 0) {
      // return <Fragment><p>{likingsArray.length} Likes</p></Fragment>
      // console.log(likingsArray[0].user.username);
      return   <Fragment>
                  <a onClick={this.handleLikingsClick} href="" className="user-likings-link">
                  {likingsArray.length} Likes
                  </a>

                </Fragment>

    }else {
      return <Fragment><p>0 Likes</p></Fragment>
    }
  }

  renderLikingsList = () => {
    const likingsArray = this.props.likingsOnThisEntry.filter(liking => liking.entry.id === this.props.singleEntryToView.id)
    return likingsArray.map(liking => {
      // console.log("RENDERLIKINGLIST", liking);
      return <Fragment><li className="list-group-item">{liking.user.username}</li></Fragment>
    })
    // this.props.likingsOnThisEntry.map(liking => {
    //   return <Fragment><li>{liking.user}</li></Fragment>
    // })
  }

  handleEditClick = event => {
    event.preventDefault()
    console.log("event target", event.target);

    this.props.viewSingleEntry(this.props.singleEntryToView)
    // console.log(this.props.singleEntryToView);
    // this.props.isCreatingNewEntry()
    this.props.isEditingEntryToggle()
  }

  renderComments = () => {
    var commentsArray = [];
    for (var i = this.props.commentsOnThisEntry.length - 1; i >= 0; i--) {
      commentsArray.push(this.props.commentsOnThisEntry[i]);
    }
    // return commentsArray;
    // {this.props.entry.user_id === this.props.currentUserLoggedIn.id ?
    //   null
    //   :
    //   <button className="dm-button" onClick={(event) => this.handleChatClick(event, this.props.entry.user)}>chat</button>
    //
    // }
    console.log(commentsArray[0]);
    console.log(this.props.currentUserLoggedIn.id);

    return <Fragment>
    {
      commentsArray.length > 0 ?
      commentsArray.map(comment =>  {
        return <Fragment>
          <div key={comment.id}>
            <li class="list-group-item">{comment.content}
              {this.props.profileToView ?
              null
              :
              <a onClick={(event) => this.handleUserClick(event,comment.user)} href="">
              </a>

              }

              <br></br>{this.renderUsername(comment)} <small>(<TimeAgo datetime={comment.created_at}/>)</small>

            </li>
            </div>
            </Fragment>
      })
      :
      null
    }
    </Fragment>

  }

  render() {
    // console.log(this.props);

    return (
      <Fragment>

      <div id="viewing-modal"  className={"modal fade bd-example-modal-lg-" + this.props.entry.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" >
        <div className="modal-dialog modal-lg" data-backdrop="static" >
          <div className="modal-content">
            {
              this.props.singleEntryToView.user ?
              <Fragment>
                <section className="entry-header">
                  <div className="avatar-username">
                    <img style={{position: "bottom"}} src='./Blank-avatar.png' width="200" height="200" alt="..."/>
                  </div>
                  <div className="title">
                    <strong><p style={{fontSize:"150%", marginLeft:"10%", marginTop:"2%", float:"right", width:"100%"}}>{this.props.singleEntryToView.title}</p></strong>
                    <h4 className="media-heading" style={{float:"left", marginLeft:"2%", marginTop:"5%"}}>Author: {this.props.singleEntryToView.user ? <a onClick={(event) => this.handleUserClick(event,this.props.singleEntryToView.user)} href=""> {this.props.singleEntryToView.user.username} </a> : null}
                    <br/><p className="entry-user" style={{fontSize:'10px', float:"left", marginLeft: "5%"}}>Created: <TimeAgo datetime={this.props.singleEntryToView.created_at}/></p></h4>
                  </div>
                </section>
                <hr style={{borderTop:"1px solid #428bca"}}></hr>
                <section className="entry-footer">
                  <div>
                    <p className="entry-content" style={{borderBottom:"1px solid #428bca", paddingBottom:"8%"}}>{this.props.singleEntryToView.content}</p>
                  </div>
                  <br></br>
                  <div className="entry-footer-option container" style={{"display":"flex", "width":"auto", "justifyContent":"space-between"}}>
                    <div className="category-likes col-md-2">
                      {this.props.singleEntryToView.user_id === this.props.currentUserLoggedIn.id ?
                        <button onClick={this.handleEditClick} type="button" className="btn btn-light edit-entry-button"><i className="glyphicon glyphicon-share-alt"></i> Edit</button>
                        :
                        null
                      }

                      {this.renderLikings(this.props.singleEntryToView)}
                    </div>
                    {this.state.isViewingLikes ?
                      <div className="viewing-likes-div col-md-3">
                        <ul  style={{marginTop:"0px", padding:"1px", textAlign:"center"}}>
                          {this.renderLikingsList()}
                        </ul>
                      </div>
                      :
                      null
                    }

                    <div className="comment-like-wrapper col-md-6">
                      <LikeButton entry={this.props.singleEntryToView}/>
                      <CommentForm />
                    </div>
                  </div>


                  <div className="comments-div" style={{paddingTop:"15px"}}>
                    <ul className="list-group list-group-flush">
                    {
                      this.renderComments()
                    }
                    </ul>
                  </div>
                </section>
              </Fragment>
              :
              null
            }
          </div>
        </div>

      </div>


    </Fragment>
    )
  }
}

const mapStateToProps = state => {

  return {
    allEntries: state.entriesReducer.allEntries,
    singleEntryToView: state.entriesReducer.singleEntryToView,
    allUsers: state.usersReducer.allUsers,
    allLikings: state.likingsReducer.allLikings,
    commentsOnThisEntry: state.commentsReducer.commentsOnThisEntry,
    likingsOnThisEntry: state.likingsReducer.likingsOnThisEntry,
    isEditingEntry: state.entriesReducer.isEditingEntry,
    currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
    isDMingBool: state.conversationsReducer.isDMingBool,
    profileToView: state.usersReducer.profileToView
  }

}



const mapDispatchToProps = dispatch => ({
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj)),
  getCommentsOnEntry: (entryObj) => dispatch(getCommentsOnEntry(entryObj)),
  getAllLikings: () => dispatch(getAllLikings()),
  getLikingsOnEntry: (entryObj) => dispatch(getLikingsOnEntry(entryObj)),
  viewSingleEntry: entryObj => dispatch(viewSingleEntry(entryObj)),
  isCreatingNewEntry: () => dispatch(isCreatingNewEntry()),
  isEditingEntryToggle: () => dispatch(isEditingEntryToggle()),
  isDMing: (userObj) => dispatch(isDMing(userObj)),
  viewEntriesOnProfile: (userObj) => dispatch(viewEntriesOnProfile(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryModal);
