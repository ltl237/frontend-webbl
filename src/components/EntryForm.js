import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import {connect} from 'react-redux';
import {userLoginFetch, viewSingleEntry, viewSomeonesProfile, isCreatingNewEntry, createNewEntry} from '../redux/actions';

class Entry extends Component {

  handleSubmit = event => {
    event.preventDefault()
    let entryObj = {
      title: document.querySelector(`input[name]`).value,
      content: document.querySelector(`textarea[name]`).value,
      category: document.querySelector("select").value,
      user_id: this.props.currentUserLoggedIn.id
    }
    console.log(entryObj)
    const falseVal = false
    this.props.createNewEntry(entryObj, falseVal)
    this.props.isCreatingNewEntry()
  }

  render() {
    console.log(this.props);
    return (
      <div>
          <form className="form-style-9" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <input type="text" name="title" className="field-style field-split align-left" placeholder="Post Title" />
              </li>
              <li>
                <textarea name="content" className="field-style" placeholder="Content"></textarea>
              </li>
              <li>
                <select className="select-css">
                  <option value="" default>Select A Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Pop-Culture">Pop-Culture</option>
                  <option value="Sports">Sports</option>
                </select>
              </li>
              <li>
                <input type="submit" value="Create Entry" />
              </li>
            </ul>
          </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  viewSingleEntry: state.entriesReducer.viewSingleEntry,
  allUsers: state.usersReducer.allUsers,
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn
})

const mapDispatchToProps = dispatch => ({
  viewSingleEntry: (entryObj) => dispatch(viewSingleEntry(entryObj)),
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj)),
  isCreatingNewEntry: () => dispatch(isCreatingNewEntry()),
  createNewEntry: (newEntryObj) => dispatch(createNewEntry(newEntryObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
