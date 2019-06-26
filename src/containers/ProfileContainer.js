import React, { Component, Fragment } from 'react';
import Signup from '../components/Signup'
import Login from '../components/Login'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, loginUser} from '../redux/actions';

class ProfileContainer extends Component {



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
                  return <Fragment key={entry.id}>
                    <div key={entry.id} className="entry-card">
                      <h1 className="entry-title">{entry.title}</h1>
                      <p className="entry-content">{entry.content}</p>
                    </div>
                    </Fragment>
                  })
                }
            </div>

            <div className="col-4 comments-container">
              {this.props.profileToView.username}'s comments:

              <table className="table table-striped">

                <tbody>
                {this.props.profileToView.comments.map(comment => {
                  return <Fragment key={comment.id}>
                          <tr>
                            <td><strong>{comment.entry.title} </strong><br></br>
                            -{comment.content}
                            </td>
                          </tr>
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
  profileToView: state.usersReducer.profileToView
})
const mapDispatchToProps = dispatch => ({
  // userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
  loginUser: userObj => dispatch(loginUser(userObj))
})

// export default ProfileContainer;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
