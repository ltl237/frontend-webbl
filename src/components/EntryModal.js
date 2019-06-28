import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import CommentForm from './CommentForm'
import {connect} from 'react-redux';
import {userLoginFetch, viewSomeonesProfile, getCommentsOnEntry} from '../redux/actions';

class EntryModal extends Component {


  componentDidMount() {
    console.log(this.props.singleEntryToView);
    this.props.getCommentsOnEntry(this.props.singleEntryToView)

  }

  handleUserClick = (event, clickedUserObj) => {
    event.preventDefault()


    const userObj = this.props.allUsers.find(user => {
      return clickedUserObj.id === user.id
    })
    this.props.viewSomeonesProfile(userObj)
    document.querySelector(".modal-backdrop").remove()

  }



  render() {
    console.log(this.props.singleEntryToView, this.props.commentsOnThisEntry);
    // console.log(this.props.commentsOnThisEntry)
    // debugger
    return (

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

                    </div>
                    <div className="comment-like-wrapper">
                      <CommentForm/>

                    </div>
                  </div>
                  <hr></hr>


                  <div className="comments-div">
                    <ul>
                    {
                      this.props.singleEntryToView.comments.length > 1 ?
                      this.props.singleEntryToView.comments.map(comment =>  {
                        return <div key={comment.id}>{comment.content} - <a onClick={(event) => this.handleUserClick(event,this.props.singleEntryToView.user)} href="">{comment.user.username}</a></div>
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


    )
  }
}

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  singleEntryToView: state.entriesReducer.singleEntryToView,
  allUsers: state.usersReducer.allUsers,
  commentsOnThisEntry: state.commentsReducer.commentsOnThisEntry
})

const mapDispatchToProps = dispatch => ({
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj)),
  getCommentsOnEntry: (entryObj) => dispatch(getCommentsOnEntry(entryObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryModal);
