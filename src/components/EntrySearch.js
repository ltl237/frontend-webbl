import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {userPostFetch, arrangeEntries} from '../redux/actions';


class EntrySearch extends Component {

  state = {
    searchBarText: "",

   }

   handleOnSubmit = (event) => {
      event.preventDefault()

      this.searchEntries(event.target.firstChild.value)
    }


    searchEntries = (searchText) => {
      // console.log("searching for ", searchText)
      // console.log("entriesOnScreen: ", this.state.entriesOnScreen[0])
      let criteria = document.querySelector('.search-select')

      if (criteria.value === "Entry Title") {
        const entriesMatchingSearchArr = this.props.allEntries.filter(entry => {

          return entry.title.toLowerCase().includes(searchText.toLowerCase())
        })
        console.log("AFTER SEARCH", entriesMatchingSearchArr);
        switch (searchText) {
          case "":
          return this.props.arrangeEntries(entriesMatchingSearchArr)
          // this.setState({
            //   entriesOnScreen: entriesMatchingSearchArr
            // })
            default:
            return this.props.arrangeEntries(entriesMatchingSearchArr)
        }
      } else if (criteria.value === "Username") {
        const entriesMatchingSearchArr = this.props.allEntries.filter(entry => {

          return entry.user.username.toLowerCase().includes(searchText.toLowerCase())
        })
        console.log("AFTER SEARCH", entriesMatchingSearchArr);
        switch (searchText) {
          case "":
          return this.props.arrangeEntries(entriesMatchingSearchArr)
          // this.setState({
            //   entriesOnScreen: entriesMatchingSearchArr
            // })
            default:
            return this.props.arrangeEntries(entriesMatchingSearchArr)
        }
      }



    }

    // handleFilter = (value) => {
    //   console.log(this.state.entriesOnScreen[0]);
    //   switch (value) {
    //     case "Entry Title":
    //       this.setState({
    //         entriesOnScreen: this.state.entriesOnScreen.sort((a,b) => (a.title > b.title) ? 1 : -1)
    //       })
    //       break;
    //     case "User":
    //       this.setState({
    //         entriesOnScreen: this.state.entriesOnScreen.sort((a,b) => (a.user.username > b.user.username) ? 1 : -1)
    //       })
    //       break;
    //     case "Date":
    //     this.setState({
    //       entriesOnScreen: this.state.entriesOnScreen.sort((a,b) => (a.created_at > b.created_at) ? 1 : -1)
    //     })
    //       break;
    //     default:
    //       break;
    //   }
    //
    // }

    // handleFilter = (event) => {
    //   this.props.handleFilter(event.target.value)
    //   // console.log(event.target.value)
    // }


   handleChange = event => {
       this.setState({
         [event.target.name]: event.target.value
       });
     }

   handleSubmit = event => {
     event.preventDefault()
     this.props.userPostFetch(this.state)
   }

   render() {
     return (
       <div className="entry-search-container ">
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="entryTitle" className="entry-search-input "/>
          <select className="search-select" onChange={this.handleFilter}>
            <option value="Entry Title">Entry Title</option>
            <option value="Username">Username</option>
          </select>
          <input type="submit" className="btn btn-light" value="Search"/>
        </form>
      </div>
     )
   }
 }
 const mapStateToProps = state => ({
   entriesOnScreen: state.entriesReducer.entriesOnScreen,
   currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
   allEntries: state.entriesReducer.allEntries
 })

 const mapDispatchToProps = dispatch => ({
   userPostFetch: userInfo => dispatch(userPostFetch(userInfo)),
   arrangeEntries: entriesArray => dispatch(arrangeEntries(entriesArray))
 })

 export default connect(mapStateToProps, mapDispatchToProps)(EntrySearch);
