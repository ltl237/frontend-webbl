import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import {connect} from 'react-redux';
import {userLoginFetch, viewSingleEntry, viewSomeonesProfile, isCreatingNewEntry, createNewEntry, isEditingEntryToggle} from '../redux/actions';

class EntryForm extends Component {

  componentDidMount() {
    // this.props.viewSingleEntry()
  }


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
    switch (this.props.isEditingEntry) {
      case true:
        this.props.isEditingEntryToggle()
      case false:
        this.props.isCreatingNewEntry()
      default:
        return
    }
  }

  handleToggleClick = event => {
    event.preventDefault()

    this.props.isEditingEntryToggle()
  }

  render() {
    console.log(this.props);
    return (
      <div>
          <form className="form-style-9" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                {this.props.isEditingEntry ?
                  <input type="text" name="title" className="field-style field-split align-left" value={this.props.singleEntryToView.title} />
                  :
                  null

                }

              </li>
              <li>
                {this.props.isEditingEntry ?
                  <textarea name="content" className="field-style" value={this.props.singleEntryToView.content}></textarea>
                  :
                  null
                }
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
                <button onClick={this.handleToggleClick}>Toggle edit</button>
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
  singleEntryToView: state.entriesReducer.singleEntryToView,
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
  isEditingEntry: state.entriesReducer.isEditingEntry
})

const mapDispatchToProps = dispatch => ({
  viewSingleEntry: (entryObj) => dispatch(viewSingleEntry(entryObj)),
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj)),
  isCreatingNewEntry: () => dispatch(isCreatingNewEntry()),
  createNewEntry: (newEntryObj) => dispatch(createNewEntry(newEntryObj)),
  isEditingEntryToggle: () => dispatch(isEditingEntryToggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
