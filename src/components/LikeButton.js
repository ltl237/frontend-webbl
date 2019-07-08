import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch, viewSomeonesProfile, getCommentsOnEntry, viewSingleEntry, removeLiking, createNewLiking, getLikingsOnEntry} from '../redux/actions';

class LikeButton extends Component {

  state = {
    likes: this.props.entry.likings.length
  }
  componentDidMount() {
    this.props.getLikingsOnEntry(this.props.entry)
  }

  handleLikeClick = event => {
    event.preventDefault()
    const typesArray = ['REMOVE_LIKING','CREATE_NEW_LIKING']
    const likingActionType = ''

    console.log('LIKED');
    // console.log(this.props.likingsOnThisEntry(this.props.entry));
    // if (this.props.entry.likings.length > 0) {
    //   this.props.entry.likings.map(liking => {
    //     let likingObj = this.props.likingsOnThisEntry.filter(fullliking => {
    //     	return fullliking.id === liking.id})
    //     if (likingObj) {
    //       if (likingObj[0].user.id === this.props.currentUserLoggedIn.id) {
    //         console.log("remove this", likingObj[0]);
    //         return <Fragment>{this.props.removeLiking(likingObj[0])}</Fragment>
    //       }
    //     }
    //   })
    // } else {
    //   // console.log("Add this", likingObj[0]);
    //   // let likingObj =
    //   const userAndEntry = {user: this.props.currentUserLoggedIn, entry: this.props.entry}
    //   console.log(userAndEntry);
    //   // this.props.createNewLiking(userAndEntry)
    //   this.props.createNewLiking(userAndEntry)
    // }

    if (this.props.likingsOnThisEntry.length > 0) {
      console.log("props likings on entry:" ,this.props.likingsOnThisEntry);
      let usersWhoLiked = []
      this.props.likingsOnThisEntry.map(liking => usersWhoLiked.push(liking.user) )
      // console.log(usersWhoLiked);
      // let userIDs = usersWhoLiked.map(user => (user.id))


      let didUserLikeArray = this.props.likingsOnThisEntry.filter(liking => {
        // console.log(liking.user.id === this.props.currentUserLoggedIn.id)
        return liking.user.id === this.props.currentUserLoggedIn.id
      })
      console.log(didUserLikeArray);

      if (didUserLikeArray.length > 0) {
        console.log("remove this", didUserLikeArray[0]);
        return this.props.removeLiking(didUserLikeArray[0])
      } else {
        let userAndEntry = {user: this.props.currentUserLoggedIn, entry: this.props.entry}
        console.log("add this in didUserLikeArray clause", userAndEntry);
        return this.props.createNewLiking(userAndEntry)
      }
    } else {
      let userAndEntry = {user: this.props.currentUserLoggedIn, entry: this.props.entry}
      console.log("add this", userAndEntry);
      return this.props.createNewLiking(userAndEntry)
    }
      // debugger
      // if (usersWhoLiked.includes(this.props.currentUserLoggedIn.id)) {
      //   // debugger
      //   console.log("remove this", liking)
      //   return this.props.removeLiking(liking)
      // } else {
      //   console.log("Add this", liking);
      //   const userAndEntry = {user: this.props.currentUserLoggedIn, entry: this.props.entry}
      //   console.log(userAndEntry);
      //   // this.props.createNewLiking(userAndEntry)
      //   return this.props.createNewLiking(userAndEntry)
      // }


      // debugger
    //   // return this.props.likingsOnThisEntry.map(liking => {
    //   //   if (liking.user.id === this.props.currentUserLoggedIn.id ){//|| liking.entry.user_id === this.props.currentUserLoggedIn.id) {
    //   //     console.log("remove this", liking)
    //   //     return this.props.removeLiking(liking)
    //   //   } else {
    //   //       console.log("Add this", liking);
    //   //       const userAndEntry = {user: this.props.currentUserLoggedIn, entry: this.props.entry}
    //   //       console.log(userAndEntry);
    //   //       // this.props.createNewLiking(userAndEntry)
    //   //       return this.props.createNewLiking(userAndEntry)
    //   //   }
    //   // })
    // } else {
    //     console.log("Add this");
    //     const userAndEntry = {user: this.props.currentUserLoggedIn, entry: this.props.entry}
    //     console.log(userAndEntry);
    //     // this.props.createNewLiking(userAndEntry)
    //     return this.props.createNewLiking(userAndEntry)
    // }

  }

  render() {
    // console.log(this.props.likingsOnThisEntry);
    // console.log(this.state);
    // console.log(this.props.currentUserLoggedIn);
    return(
      <Fragment>
        <button onClick={this.handleLikeClick} type="button" style={{border:"1px solid lightblue"}} className="btn btn-light"><i className="glyphicon glyphicon-thumbs-up"></i></button>
      </Fragment>
    )
  }
}
// <button type="button" className="btn btn-light"><i className="glyphicon glyphicon-thumbs-up"></i>
//   ({this.props.post.likes.length}) Like
//
// </button>
// export default LikeButton

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  allUsers: state.usersReducer.allUsers,
  allLikings: state.likingsReducer.allLikings,
  likingsOnThisEntry: state.likingsReducer.likingsOnThisEntry,
  singleEntryToView: state.entriesReducer.singleEntryToView,
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn
})

const mapDispatchToProps = dispatch => ({
  viewSingleEntry: (entryObj) => dispatch(viewSingleEntry(entryObj)),
  createNewLiking: (userAndEntry) => dispatch(createNewLiking(userAndEntry)),
  removeLiking: (likingObj) => dispatch(removeLiking(likingObj)),
  getLikingsOnEntry: entryObj => dispatch(getLikingsOnEntry(entryObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
