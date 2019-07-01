import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import EntryModal from './EntryModal'
import {connect} from 'react-redux';
import {userLoginFetch, viewSingleEntry, viewSomeonesProfile, getCommentsOnEntry, getAllLikings, getLikingsOnEntry} from '../redux/actions';

class Entry extends Component {



  componentDidMount() {
    // this.props.getLikingsOnEntry(this.props.entry)
  }


    handleModalClick = event => {
      console.log(this.props.entry);
      this.props.getLikingsOnEntry(this.props.entry)
      this.props.getAllLikings()
      const entryObj = this.props.allEntries.find(entry =>{
        return entry.id === this.props.entry.id
      })
      this.props.getCommentsOnEntry(entryObj)
      //ADD LOADING SCREEN FOR RENDERING COMMENTS
      // this.renderModal(entryObj)
      // console.log('entryObj', entryObj);
      this.props.viewSingleEntry(entryObj)

      // debugger
    }

    handleUserClick = (event, clickedUserObj) => {
      event.preventDefault()
      const userObj = this.props.allUsers.find(user => {
        return clickedUserObj.id === user.id
      })
      this.props.viewSomeonesProfile(userObj)

    }

    renderModal = entryObj => {
      // {this.state.isViewingModal ?
      // return <EntryModal></>}
      const existingModal = document.querySelector(`.bd-example-modal-lg-${entryObj.id}`)
      if (existingModal) {
        return existingModal.style.display = "block"
      } else {
        return <EntryModal entry={entryObj}/>
      }

    }

    // renderLikings = () => {
    //   // debugger
    //   // console.log(this.props.allLikings);
    //   const likingsArray = this.props.allLikings.filter(liking =>  liking.entry.id === this.props.entry.id)
    //
    //   // console.log(likingsArray);
    //   // debugger
    //   return <Fragment><p>{likingsArray.length} Likes</p></Fragment>
    // }
    renderLikings = (singleEntryToView) => {
      // debugger
      const likingsArray = this.props.likingsOnThisEntry.filter(liking => liking.entry.id === singleEntryToView.id)
      console.log(likingsArray);

      if (likingsArray.length > 0) {
        return <Fragment><p>{likingsArray.length} Likes</p></Fragment>
      }else {
        return <Fragment><p>0 Likes</p></Fragment>
      }


    }


  render() {
    // console.log(this.props);
    return (
      <Fragment>
      <div onClick={this.handleModalClick} data-toggle="modal" data-target={".bd-example-modal-lg-" + this.props.entry.id} key={this.props.entry.id} className="single-entry">
      {
        this.props.entry.user_id ?
        <Fragment key={this.props.entry.id}>
        <div className="entry">
          <strong><p>{this.props.entry.title}</p></strong>
          <p className="entry-content">{this.props.entry.content.substring(0,110)}...</p>
          <section className="entry-footer">
            <hr></hr>
            <div className="entry-footer-option container" style={{"display":"flex", "width":"auto", "justifyContent":"space-between"}}>
              <div className="like-comment-outer">
                <button type="button" className="btn btn-light"><i className="glyphicon glyphicon-thumbs-up"></i><span style={{marginLeft:"3px"}}>Like</span></button>
                <button type="button" className="btn btn-light"><i className="glyphicon glyphicon-comment"></i> Comment</button>
                <button type="button" className="btn btn-light"><i className="glyphicon glyphicon-share-alt"></i> Share</button>
              </div>
              <section className="entry-heading">
                <div className="row">
                  <div className="col-md-3">
                    <div className="media">
                      <div className="media-left">
                        <a href="#">
                          <img src={Faker.image.avatar()} width="40" height="40" alt="..."/>
                        </a>
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading"><a onClick={(event) => this.handleUserClick(event, this.props.entry.user)} href="">{this.props.entry.user? this.props.entry.user.username : null}</a></h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="entry-user" >
                  <p className="entry-user" style={{fontSize:'10px',float:'right',marginTop:"10%"}}> <TimeAgo datetime={this.props.entry.created_at}/></p>
                </div>
              </section>
            </div>
          </section>
          </div>
        </Fragment>
        :
        null
      }
      </div>
          <EntryModal entry={this.props.entry}/>

      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  allUsers: state.usersReducer.allUsers,
  singleEntryToView: state.entriesReducer.singleEntryToView,
  allLikings: state.likingsReducer.allLikings,
  getCommentsOnEntry: state.commentsReducer.getCommentsOnEntry,
  getLikingsOnEntry: state.likingsReducer.getLikingsOnEntry
})

const mapDispatchToProps = dispatch => ({
  viewSingleEntry: (entryObj) => dispatch(viewSingleEntry(entryObj)),
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj)),
  getCommentsOnEntry: (entryObj) => dispatch(getCommentsOnEntry(entryObj)),
  getLikingsOnEntry: (entryObj) => dispatch(getLikingsOnEntry(entryObj)),
  getAllLikings: () => dispatch(getAllLikings())

})

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
