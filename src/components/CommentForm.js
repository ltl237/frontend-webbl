import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {createNewComment} from '../redux/actions';


class CommentForm extends Component {



  handleClick = (event) => {
    event.preventDefault()


    let commentObj = {
      content: event.target.parentElement.firstElementChild.value,
      user_id: this.props.currentUserLoggedIn.id,
      entry_id: this.props.singleEntryToView.id
    }
    event.target.parentElement.firstElementChild.value = ""
    console.log(commentObj);
    this.props.createNewComment(commentObj)
    // this.props.handleAddComment(commentObj)
    // debugger
  }

  render() {
    return (
      <Fragment>
            <textarea id="comment-textarea" type="text" name="comment" style={{width:"500px", marginLeft:"39px"}} placeholder="comment here"></textarea>
            <input id="comment-button" onClick={this.handleClick}  type="button" value="Comment !"></input>
      </Fragment>
    );
  }

}

// export default CommentForm;
const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  allUsers: state.usersReducer.allUsers,
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
  singleEntryToView: state.entriesReducer.singleEntryToView,
  commentsOnThisEntry: state.commentsReducer.commentsOnThisEntry
})

const mapDispatchToProps = dispatch => ({
  createNewComment: (commentObj) => dispatch(createNewComment(commentObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
