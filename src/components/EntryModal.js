import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import CommentForm from './CommentForm'
import EntryForm from './EntryForm'
import LikeButton from './LikeButton'
import EditEntryForm from './EditEntryForm'
import {connect} from 'react-redux';
import {userLoginFetch, viewSomeonesProfile, getCommentsOnEntry, getAllLikings, getLikingsOnEntry, viewSingleEntry, isCreatingNewEntry, isEditingEntryToggle} from '../redux/actions';

class EntryModal extends Component {


  componentDidMount() {
    // console.log(this.props.singleEntryToView);
    console.log('hello')
    this.props.getCommentsOnEntry(this.props.singleEntryToView)
    this.props.getAllLikings()
    // console.log("before",this.props.likingsOnThisEntry);
    this.props.getLikingsOnEntry(this.props.singleEntryToView)
    // console.log("After",this.props.likingsOnThisEntry);

  }

  handleUserClick = (event, clickedUserObj) => {
    event.preventDefault()


    const userObj = this.props.allUsers.find(user => {
      return clickedUserObj.id === user.id
    })
    this.props.viewSomeonesProfile(userObj)
    document.querySelector(".modal-backdrop").remove()

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

  renderLikings = (singleEntryToView) => {
    // debugger
    const likingsArray = this.props.likingsOnThisEntry.filter(liking => liking.entry.id === singleEntryToView.id)
    // console.log(likingsArray);

    if (likingsArray.length > 0) {
      return <Fragment><p>{likingsArray.length} Likes</p></Fragment>
    }else {
      return <Fragment><p>0 Likes</p></Fragment>
    }
  }

  handleEditClick = event => {
    event.preventDefault()
    console.log("event target", event.target);

    this.props.viewSingleEntry(this.props.singleEntryToView)
    // console.log(this.props.singleEntryToView);
    // this.props.isCreatingNewEntry()
    this.props.isEditingEntryToggle()
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
                    <img style={{position: "bottom"}} src={Faker.image.avatar()} width="auto" height="auto" alt="..."/>
                  </div>
                  <div className="title">
                    <strong><p style={{fontSize:"150%", marginLeft:"10%", marginTop:"2%", float:"right", width:"100%"}}>{this.props.singleEntryToView.title}</p></strong>
                    <h4 className="media-heading" style={{float:"left", marginLeft:"2%", marginTop:"5%"}}>Author: {this.props.singleEntryToView.user ? <a onClick={(event) => this.handleUserClick(event,this.props.singleEntryToView.user)} href=""> {this.props.singleEntryToView.user.username} </a> : null}
                    <br/><p className="entry-user" style={{fontSize:'10px', float:"left", marginLeft: "5%"}}>Created: <TimeAgo datetime={this.props.singleEntryToView.created_at}/></p></h4>
                  </div>
                </section>
                <hr></hr>
                <section className="entry-footer">
                  <div>
                    <p className="entry-content">{this.props.singleEntryToView.content}</p>
                  </div>
                  <hr></hr>
                  <div className="entry-footer-option container" style={{"display":"flex", "width":"auto", "justifyContent":"space-between"}}>
                    <div className="category-likes">
                      <button onClick={this.handleEditClick} type="button" className="btn btn-light edit-entry-button"><i className="glyphicon glyphicon-share-alt"></i> Edit</button>
                      <p>{this.props.singleEntryToView.category}</p>
                      {this.renderLikings(this.props.singleEntryToView)}
                    </div>
                    <div className="comment-like-wrapper">
                      <LikeButton entry={this.props.singleEntryToView}/>
                      <CommentForm />
                    </div>
                  </div>
                  <hr></hr>


                  <div className="comments-div">
                    <ul>
                    {
                      this.props.commentsOnThisEntry.length > 0 ?
                      this.props.commentsOnThisEntry.map(comment =>  {
                        return <Fragment>
                          <div key={comment.id}>
                            <li>{comment.content}
                              <a onClick={(event) => this.handleUserClick(event,comment.user)} href="">
                              <br></br>{this.renderUsername(comment)} <small>(<TimeAgo datetime={comment.created_at}/>)</small>
                              </a>
                            </li>
                            </div>
                            </Fragment>
                      })
                      :
                      null
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
    getLikingsOnEntry: state.likingsReducer.getLikingsOnEntry,
    isEditingEntry: state.entriesReducer.isEditingEntry
  }

}



const mapDispatchToProps = dispatch => ({
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj)),
  getCommentsOnEntry: (entryObj) => dispatch(getCommentsOnEntry(entryObj)),
  getAllLikings: () => dispatch(getAllLikings()),
  getLikingsOnEntry: (entryObj) => dispatch(getLikingsOnEntry(entryObj)),
  viewSingleEntry: entryObj => dispatch(viewSingleEntry(entryObj)),
  isCreatingNewEntry: () => dispatch(isCreatingNewEntry()),
  isEditingEntryToggle: () => dispatch(isEditingEntryToggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryModal);
