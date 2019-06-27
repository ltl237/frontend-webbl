import React, {Component, Fragment} from 'react';
import Faker from 'faker'
import TimeAgo from 'timeago-react'
import CommentForm from './CommentForm'
import {connect} from 'react-redux';
import {userLoginFetch, viewSomeonesProfile} from '../redux/actions';

class EntryModal extends Component {

  handleUserClick = (event, clickedUserObj) => {
    event.preventDefault()
    console.log(clickedUserObj);

    const userObj = this.props.allUsers.find(user => {
      return clickedUserObj.id === user.id
    })
    this.props.viewSomeonesProfile(userObj)
    document.querySelector(".modal-backdrop").remove()
  }

  test = event => {
    // debugger
  }

  render() {

    console.log(this.props.entry.id)
    return (
      <Fragment>

      <div onClick={this.test} class="modal" id={"bd-example-modal-lg-" + this.props.entry.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">{this.props.entry.title}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      </Fragment>

    )
  }
}

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries,
  singleEntryToView: state.entriesReducer.singleEntryToView,
  allUsers: state.usersReducer.allUsers
})

const mapDispatchToProps = dispatch => ({
  viewSomeonesProfile: (userObj) => dispatch(viewSomeonesProfile(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryModal);


// <div id="viewing-modal"  className={"modal fade bd-example-modal-lg-" + this.props.entry.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" >
//   <div className="modal-dialog modal-lg" data-backdrop="static" >
//     <div className="modal-content">
//       {
//         this.props.singleEntryToView.user ?
//         <Fragment>
//           <section className="entry-header">
//             <div className="avatar-username">
//               <img style={{position: "bottom"}} src={Faker.image.avatar()} width="auto" height="auto" alt="..."/>
//             </div>
//             <div className="title">
//               <strong><p style={{fontSize:"150%", marginLeft:"10%", marginTop:"2%", float:"right", width:"100%"}}>{this.props.singleEntryToView.title}</p></strong>
//               <h4 className="media-heading" style={{float:"left", marginLeft:"2%", marginTop:"5%"}}>Author: {this.props.singleEntryToView.user ? <a onClick={(event) => this.handleUserClick(event,this.props.singleEntryToView.user)} href=""> {this.props.singleEntryToView.user.username} </a> : null}
//               <br/><p className="entry-user" style={{fontSize:'10px', float:"left", marginLeft: "5%"}}>Created: <TimeAgo datetime={this.props.singleEntryToView.created_at}/></p></h4>
//             </div>
//           </section>
//           <hr></hr>
//           <section className="entry-footer">
//             <div>
//               <p className="entry-content">{this.props.singleEntryToView.content}</p>
//             </div>
//             <hr></hr>
//             <div className="entry-footer-option container" style={{"display":"flex", "width":"auto", "justifyContent":"space-between"}}>
//               <div className="category-likes">
//
//               </div>
//               <div className="comment-like-wrapper">
//
//               </div>
//             </div>
//             <hr></hr>
//
//
//             <div className="comments-div">
//               <ul>
//               {
//                 this.props.singleEntryToView.comments.map(comment =>  {
//                   return <div key={comment.id}>{comment.content}</div>
//                 })
//               }
//               </ul>
//             </div>
//           </section>
//         </Fragment>
//         :
//         null
//       }
//       <CommentForm/>
//     </div>
//   </div>
// </div>
