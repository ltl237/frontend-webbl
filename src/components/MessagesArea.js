import React, {Component,Fragment} from 'react';
import NewMessageForm from './NewMessageForm';
import TimeAgo from 'timeago-react'
import {connect} from 'react-redux';
import {userLoginFetch, loginUser, fetchAllUsers} from '../redux/actions';

// helpers

class MessagesArea extends Component {

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  state = {

  }
  // <TimeAgo datetime={entry.created_at}/>
  orderedMessages = messages => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    const objDiv = document.querySelector('.messagesArea-div')

    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight
    }
    // console.log(sortedMessages);
    // console.log(me);
    // debugger
    return sortedMessages.map(message => {
      if (this.props.currentUserLoggedIn.id === message.user.id) {
        // console.log(message);
        return <Fragment key={message.id}>
            <div className="single-message-container-div " >
            <div className="single-message-wrapper is-sender">
            <li className="single-message-li is-sender" key={message.id}>
                <span className="single-message-span sender-span"><strong>{message.text}</strong></span>
              </li><br></br>
              <div className="user-timeago-message">{message.user.username} <small>(<TimeAgo datetime={message.created_at}/>)</small></div>
              </div>
            </div>
              </Fragment>
      } else {
        return <Fragment key={message.id}>
          <div className="single-message-container-div ">
          <div className="single-message-wrapper is-receiver">
            <li className="single-message-li is-receiver" key={message.id}>
              <span className="single-message-span receiver-span"><strong>{message.text}</strong></span>
            </li><br></br>
            <div className="user-timeago-message">{message.user.username} <small>(<TimeAgo datetime={message.created_at}/>)</small></div>
            </div>
          </div>
              </Fragment>

      }
    });
  };

  renderConversationTitle = () => {
    let user1 = this.props.conversation.title.split("-")[0]
    let user2 = this.props.conversation.title.split("-")[1]

    let user1Name = this.props.allUsers.filter(user => user.id.toString() === user1 )[0].username
    let user2Name = this.props.allUsers.filter(user => user.id.toString() === user2 )[0].username

    return <Fragment><p className="convo-title-p">{user1Name} - {user2Name}</p></Fragment>
  }

  render(){
    // console.log(this.props.conversation);
    // console.log(this.props.conversation.messages);
    return (
      <Fragment>
      <div className="messagesArea-div" >
        {this.renderConversationTitle()}
        <div className='message-container'>{this.orderedMessages(this.props.conversation.messages)}</div>
      </div>
      <NewMessageForm conversation_id={this.props.conversation.id} />
      </Fragment>
    )
  }
}

// const MessagesArea = ({
//   conversation: { id, title, messages },
// }) => {
//   return (
//     <div className="messagesArea">
//       <h2>{title}</h2>
//       <ul>{orderedMessages(messages)}</ul>
//       <NewMessageForm conversation_id={id} />
//     </div>
//   );
// };

// export default MessagesArea;
const mapStateToProps = state => ({
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
  allUsers: state.usersReducer.allUsers
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea);
