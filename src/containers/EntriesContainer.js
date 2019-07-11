import React, { Component, Fragment } from 'react';
import TimeAgo from 'timeago-react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Entry from '../components/Entry'
import EntryForm from '../components/EntryForm'
import EntryModal from '../components/EntryModal'
import Faker from 'faker'
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, loginUser, viewSingleEntry} from '../redux/actions';

class EntriesContainer extends Component {

  renderEntries = () => {
    // debugger
    let searchText = document.querySelector('.entry-search-input')

    if (searchText !== "") {
      return <Fragment>
        {this.props.entriesOnScreen.reverse().map(entry => {
            return <Entry key={entry.id} entry={entry}/>
          })
        }
      </Fragment>
    }
    if (searchText === null) {

      return <Fragment>
      {this.props.allEntries.reverse().map(entry => {
        return <Entry key={entry.id} entry={entry} />
      })}
      </Fragment>
    }


  }

  render() {

    return (
      <Fragment>
          <div className="entries-container">
            {this.renderEntries()}
          </div>
      </Fragment>
    );
  }

}


const mapStateToProps = state => ({
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
  entriesOnScreen: state.entriesReducer.entriesOnScreen,
  allEntries: state.entriesReducer.allEntries
})


// export default EntriesContainer;
export default connect(mapStateToProps, null)(EntriesContainer);


//working old
// <div className="entries-container">
//   {this.props.allEntries.map(entry => {
//     return <Fragment>
//     <div onClick={this.handleModalClick} data-toggle="modal" data-target={".bd-example-modal-lg-" + entry.id} id={entry.id} key={entry.id} className="single-entry">
// {
//   entry.user ?
//   <Fragment key={entry.id}>
//     <strong><p>{entry.title}</p></strong>
//     <p className="entry-content">{entry.content.substring(0,110)}...</p>
//     <section className="entry-footer">
//       <hr></hr>
//       <div className="entry-footer-option container" style={{"display":"flex", "width":"auto", "justifyContent":"space-between"}}>
//         <div>
//           <button type="button" className="btn btn-light"><i className="glyphicon glyphicon-comment"></i> Comments</button>
//           <button type="button" className="btn btn-light"><i className="glyphicon glyphicon-share-alt"></i> Share</button>
//         </div>
//         <section className="entry-heading">
//           <div className="row">
//             <div className="col-md-3">
//               <div className="media">
//                 <div className="media-left">
//                   <a href="#">
//                     <img src={Faker.image.avatar()} width="40" height="40" alt="..."/>
//                   </a>
//                 </div>
//                 <div className="media-body">
//                   <h4 className="media-heading"><a onClick={this.handleUserClick} href="">{entry.user? entry.user.username : null}</a></h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="entry-user" >
//             <p className="entry-user" style={{fontSize:'10px',float:'right',marginTop:"10%"}}> <TimeAgo datetime={entry.created_at}/></p>
//           </div>
//         </section>
//       </div>
//     </section>
//   </Fragment>
//   :
//   null
// }
// </div>
// <div className="entry-modal">
//   <EntryModal/>
// </div>
//     </Fragment>
//   })
//
//   }
//
// </div>
