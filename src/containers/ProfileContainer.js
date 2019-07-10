import React, { Component, Fragment } from 'react';
import Signup from '../components/Signup'
import Login from '../components/Login'
import Entry from '../components/Entry'
import TimeAgo from 'timeago-react'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, loginUser, getCommentsOnEntry} from '../redux/actions';

class ProfileContainer extends Component {

  componentDidMount() {
    // this.props.viewSomeonesProfile()
    // this.props.profileToView.entries.map(entry => {
    //   {this.props.getCommentsOnEntry(entry)}
    // })

  }

  renderMyEntries = () => {
    // return this.props.profileToView.entries.map(entry => {
    //   return <Fragment key={entry.id}>
    //   <Entry entry={entry}/>
    //   </Fragment>
    // })

    return this.props.entriesOnScreen.map(entry => {
      return <Fragment key={entry.id}>
              <Entry entry={entry}/>
      </Fragment>
    })
  }

  renderMyComments = () => {
    //
    let commentArray = []
    console.log("before", commentArray);
    for (var i = this.props.profileToView.comments.length - 1; i >= 0; i--) {
      commentArray.push(this.props.profileToView.comments[i]);
    }
    console.log(commentArray);

    return <Fragment>
            {this.props.profileToView.username}'s Webbl comments:
            <table className="table table-striped">
              <tbody>
              {commentArray.map(comment => {
                // {this.props.getCommentsOnEntry(entry)}
                return <Fragment>
                  <tr>
                  <td><strong style={{color:"#24529b"}} >Entry: </strong><strong>{comment.entry.title} </strong><br></br>
                  -{comment.content} <small>(<TimeAgo datetime={comment.created_at}/>)</small>
                  </td>
                  </tr>
                </Fragment>
                })
              }
            </tbody>
          </table>
    </Fragment>
  }



  render() {
    // console.log(this.props.profileToView);
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 name-container">
              <div className="user-details" style={{display:"inline-block"}}>
                <span><h1 style={{color:"#24529b"}}>{this.props.profileToView.username}'s Webbl Entries </h1></span>
                <p>AKA {this.props.profileToView.first_name} {this.props.profileToView.last_name} ({this.props.profileToView.age})</p>

              </div>
              <div className="my-entries" style={{marginTop:"10%"}}>
                {this.renderMyEntries()}
              </div>
            </div>
            <hr style={{color:"#24529b"}} width="1" size="500"></hr>
            <div className="col-md-4 comments-container">


              {this.renderMyComments()}

            </div>
          </div>
        </div>

      </div>
    );
  }

}


const mapStateToProps = state => ({
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
  profileToView: state.usersReducer.profileToView,
  allUsers: state.usersReducer.allUsers,
  // getCommentsOnEntry: state.commentsReducer.getCommentsOnEntry,
  commentsOnThisEntry: state.commentsReducer.commentsOnThisEntry,
  entriesOnScreen: state.entriesReducer.entriesOnScreen

})
const mapDispatchToProps = dispatch => ({
  getCommentsOnEntry: (entryObj) => dispatch(getCommentsOnEntry(entryObj)),
  loginUser: userObj => dispatch(loginUser(userObj))
})

// export default ProfileContainer;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
