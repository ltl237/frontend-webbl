import React, { Component, Fragment } from 'react';
import Signup from '../components/Signup'
import Login from '../components/Login'
import Entry from '../components/Entry'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, loginUser, getCommentsOnEntry} from '../redux/actions';

class ProfileContainer extends Component {

  renderComments = () => {

  }

  render() {
    console.log(this.props.profileToView);
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-8 name-container">
              <span><h2 style={{float:"left"}}>{this.props.profileToView.username} </h2><p> ({this.props.profileToView.first_name} {this.props.profileToView.last_name})</p></span>
              <span><p>{this.props.profileToView.age} years old</p></span><br></br>
              <span><p className="bio">{this.props.profileToView.bio}</p></span>

              {this.props.profileToView.entries.map(entry => {
                {this.props.getCommentsOnEntry(entry)}
                return <Fragment key={entry.id}>

                  <Entry entry={entry}/>
                  </Fragment>
                })
              }

            </div>

            <div className="col-4 comments-container">
              {this.props.profileToView.username}'s comments:

              <table className="table table-striped">
                <tbody>
                {this.props.profileToView.entries.map(entry => {
                  {this.props.getCommentsOnEntry(entry)}
                  return <Fragment>
                          {this.props.commentsOnThisEntry.map(comment => {
                            return <Fragment>
                                <tr>
                                  <td><strong>{comment.entry.title} </strong><br></br>
                                  -{comment.content}
                                  </td>
                                </tr>
                          </Fragment>
                          })}
                   </Fragment>
                })}



                </tbody>
              </table>

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
  getCommentsOnEntry: state.commentsReducer.getCommentsOnEntry,
  commentsOnThisEntry: state.commentsReducer.commentsOnThisEntry

})
const mapDispatchToProps = dispatch => ({
  getCommentsOnEntry: (entryObj) => dispatch(getCommentsOnEntry(entryObj)),
  loginUser: userObj => dispatch(loginUser(userObj))
})

// export default ProfileContainer;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
