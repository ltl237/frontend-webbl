import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import EntryModal from './EntryModal'
import {connect} from 'react-redux';
import {userLoginFetch, viewSingleEntry, viewSomeonesProfile} from '../redux/actions';

class Entry extends Component {


    handleModalClick = event => {

      const entryObj = this.props.allEntries.find(entry =>{
        return entry.id === this.props.entry.id
      })
      // debugger
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

  render() {
    // console.log(this.props);
    return (
      <Fragment>
      <div onClick={this.handleModalClick} data-toggle="modal" data-target={"#bd-example-modal-lg-" + this.props.entry.id} key={this.props.entry.id} className="single-entry">

      {
        this.props.entry.user_id ?
        <Fragment key={this.props.entry.id}>
        <div className="entry">
          <strong><p>{this.props.entry.title}</p></strong>
          <p className="entry-content">{this.props.entry.content.substring(0,110)}...</p>
          <section className="entry-footer">
            <hr></hr>
            <div className="entry-footer-option container" style={{"display":"flex", "width":"auto", "justifyContent":"space-between"}}>
              <div>
                <button type="button" className="btn btn-light"><i className="glyphicon glyphicon-comment"></i> Comments</button>
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
          <EntryModal entry={this.props.entry}/>
      </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  allUsers: state.usersReducer.allUsers
})

const mapDispatchToProps = dispatch => ({
  viewSingleEntry: (entryObj) => dispatch(viewSingleEntry(entryObj)),
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
