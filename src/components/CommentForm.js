import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
class CommentForm extends Component {

  // handleClick = (event) => {
  //   event.preventDefault()
  //
  //
  //   let commentObj = {
  //     content: event.target.parentElement.firstElementChild.value,
  //     user: this.props.currentUser,
  //     post: this.props.post
  //   }
  //
  //   this.props.addNewComment(commentObj)
  //   this.props.handleAddComment(commentObj)
  // }

  render() {
    return (
      <Fragment>
            <textarea id="comment-textarea" type="text" name="comment" style={{zIndex:"100", width:"500px", marginLeft:"39px"}} placeholder="comment here"></textarea>
            <input id="comment-button" onClick={this.handleClick}  type="button" value="Comment !"></input>
      </Fragment>
    );
  }

}

// export default CommentForm;
const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  allUsers: state.usersReducer.allUsers,
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
