import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import {connect} from 'react-redux';
import TimeAgo from 'timeago-react'
import {userLoginFetch, viewSomeonesProfile} from '../redux/actions';

class EntryModal extends Component {

  handleUserClick = (event, clickedUserObj) => {
    event.preventDefault()
    console.log(clickedUserObj);

    const userObj = this.props.allUsers.find(user => {
      return clickedUserObj.id === user.id
    })
    this.props.viewSomeonesProfile(userObj)
    document.querySelector(".modal-backdrop").remove()
  }

  render() {
    return (
      <div id="viewing-modal" className={"modal fade bd-example-modal-lg-" + this.props.singleEntryToView.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {
              this.props.singleEntryToView.user ?
              <Fragment>
                <section className="post-header">
                  <div className="avatar-username">
                    <img style={{position: "bottom"}} src={Faker.image.avatar()} width="auto" height="auto" alt="..."/>
                  </div>
                  <div className="title">
                    <strong><p style={{fontSize:"150%", marginLeft:"10%", marginTop:"2%", float:"right", width:"100%"}}>{this.props.singleEntryToView.title}</p></strong>
                    <h4 className="media-heading" style={{float:"left", marginLeft:"2%", marginTop:"5%"}}>Author: {this.props.singleEntryToView.user ? <a onClick={(event) => this.handleUserClick(event,this.props.singleEntryToView.user)} href=""> {this.props.singleEntryToView.user.username} </a> : null}
                    <br/><p className="post-user" style={{fontSize:'10px', float:"left", marginLeft: "5%"}}>Created: <TimeAgo datetime={this.props.singleEntryToView.created_at}/></p></h4>
                  </div>
                </section>
                <hr></hr>
                <section className="post-footer">
                  <div>
                    <p className="post-content">{this.props.singleEntryToView.content}</p>
                  </div>
                  <hr></hr>
                  <div className="post-footer-option container" style={{"display":"flex", "width":"auto", "justifyContent":"space-between"}}>
                    <div className="category-likes">

                    </div>
                    <div className="comment-like-wrapper">

                    </div>
                  </div>
                  <hr></hr>


                  <div className="comments-div">
                    <ul>
                    {
                      this.props.singleEntryToView.comments.map(comment =>  {
                        return <div key={comment.id}>{comment.content}</div>
                      })
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
  allUsers: state.usersReducer.allUsers
})

const mapDispatchToProps = dispatch => ({
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryModal);
