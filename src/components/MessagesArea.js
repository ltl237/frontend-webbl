import React, {Component,Fragment} from 'react';
import NewMessageForm from './NewMessageForm';
import TimeAgo from 'timeago-react'
import {connect} from 'react-redux';
import {userLoginFetch, loginUser} from '../redux/actions';

// helpers

class MessagesArea extends Component {

  state = {

  }
  // <TimeAgo datetime={entry.created_at}/>
  orderedMessages = messages => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      if (this.props.currentUserLoggedIn.id === message.user.id) {

        return <Fragment>
            <div className="single-message-container-div ">
            <div className="single-message-wrapper is-sender">
            <li className="single-message-li is-sender" key={message.id}>
                <span className="single-message-span">{message.text}</span>
              </li><br></br>
              <div className="user-timeago-message">{message.user.username} <small>(<TimeAgo datetime={message.created_at}/>)</small></div>
              </div>
            </div>
              </Fragment>
      } else {
        return <Fragment>
          <div className="single-message-container-div ">
          <div className="single-message-wrapper is-receiver">
            <li className="single-message-li is-receiver" key={message.id}>
              <span className="single-message-span">{message.text}</span>
            </li><br></br>
            <div className="user-timeago-message">{message.user.username} <small>(<TimeAgo datetime={message.created_at}/>)</small></div>
            </div>
          </div>
              </Fragment>

      }
    });
  };

  render(){
    console.log(this.props.conversation);
    console.log(this.props.conversation.messages);
    return (
      <div className="messagesArea-div" >
        <h2>{this.props.conversation.title}</h2>
        <div className='message-container'>{this.orderedMessages(this.props.conversation.messages)}</div>
        <NewMessageForm conversation_id={this.props.conversation.id} />
      </div>
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
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea);
