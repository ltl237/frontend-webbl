import React, {Component, Fragment, PropTypes} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import {connect} from 'react-redux';
import {userLoginFetch, viewSingleEntry, viewSomeonesProfile, isCreatingNewEntry, createNewEntry, isEditingEntryToggle, editEntryFetch} from '../redux/actions';

class EntryForm extends Component {


  state = {
    title_input: this.props.singleEntryToView.title,
    content_input: this.props.singleEntryToView.content,
    category_input: this.props.singleEntryToView.category
  }

  handleSubmit = event => {
    event.preventDefault()
    let entryObj = {
      title: document.querySelector(`input[name]`).value,
      content: document.querySelector(`textarea[name]`).value,
      category: document.querySelector("select").value,
      user_id: this.props.currentUserLoggedIn.id
    }
    const falseVal = false
    switch (this.props.isEditingEntry) {
      case true:
        console.log(entryObj);
        this.props.isEditingEntryToggle()
        return this.props.editEntryFetch(entryObj)
      case false:

        return this.props.createNewEntry(entryObj, falseVal)
      default:
        return
    }


  }

  handleTitleChange = event => {
    // console.log(event.target);
    this.setState({
      title_input: event.target.value
    })
  }

  handleContentChange = event => {
    // console.log(event.target);
    this.setState({
      content_input: event.target.value
    })
  }

  handleCategoryChange = event => {
    this.setState({
      category_input: event.target.value
    })
  }
  render() {

    return (
      <div>
          <form className="form-style-9" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                {this.props.isEditingEntry ?
                  <input type="text" onChange={this.handleTitleChange} name="title" className="field-style field-split align-left" value={this.state.title_input}/>
                  :
                  <input type="text" name="title" className="field-style field-split align-left" placeholder="Entry Title"/>
                }


              </li>
              <li>
              {this.props.isEditingEntry ?
                  <textarea name="content" onChange={this.handleContentChange} className="field-style" value={this.state.content_input}></textarea>
                  :
                  <textarea name="content" className="field-style" placeholder="What would you like to write about ?"></textarea>
                }
              </li>
              <li>
                <select onChange={this.handleCategoryChange} className="select-css">
                  <option value="" default>Select A Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Pop-Culture">Pop-Culture</option>
                  <option value="Sports">Sports</option>
                </select>
              </li>
              <li>
                {this.props.isEditingEntry ?
                  <input onClick={this.handleSubmit} type="submit" value="Submit Edit" />
                  :
                  <input onClick={this.handleSubmit} type="submit" value="Create Entry" />

                }
              </li>
            </ul>
          </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
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
  isEditingEntryToggle: () => dispatch(isEditingEntryToggle()),
  editEntryFetch: entryObj => dispatch(editEntryFetch(entryObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
