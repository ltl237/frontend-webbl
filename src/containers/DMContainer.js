import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

import ConversationsCables from '../components/ConversationsCables'
import { API_ROOT } from '../constants';
import NewConversationForm from '../components/NewConversationForm';
import MessagesArea from '../components/MessagesArea';

import {getProfileFetch, logoutUser, loginUser, viewSingleEntry} from '../redux/actions';

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    console.log(conversation);
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    );
  });
};

class DMContainer extends Component {



  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    //             {this.state.isViewingChat ? ({this.props.profileToView.username ? <ProfileContainer/> : <Fragment> {this.props.isCreatingNewEntryBool ?  <EntryForm /> : <EntriesContainer/>}</Fragment>}) : <ChatContainer/>}


    fetch(`${API_ROOT}/conversations`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
// Only, if we are saving JWT token in localStorage
          "Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
      .then(res => res.json())
      .then(conversations => {
        console.log(conversations)
        this.setState({conversations})
      })

        // this.setState({ conversations }));
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    console.log(conversation);
    // debugger
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    console.log("edddboi", message);
    // debugger
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );

    // if (conversation.messages.length > 0) {
    //   console.log(conversation)
    //
    //   // debugger
      conversation.messages = [...conversation.messages, message];
    // } else {
    //   console.log("no messages in here", conversation);
    //
    // }
    this.setState({ conversations });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    // console.log(this.state);
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <ConversationsCables
            userId= {this.props.currentUserLoggedIn.id}
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>DM Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    );
  };


  //MY CLASS ///
  // render() {
  //   console.log("DMContainer", this.props);
  //   return (
  //     <div>
  //       {this.props.currentUserLoggedIn.username} - {this.props.userToDM.username}
  //       <ConversationsCables/>
  //     </div>
  //   );
  // }
  //MY CLASS ///
}

const mapStateToProps = state => ({
  currentUserLoggedIn: state.usersReducer.currentUserLoggedIn,
  userToDM: state.conversationsReducer.userToDM
})
const mapDispatchToProps = dispatch => ({
  // userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
  // loginUser: userObj => dispatch(loginUser(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(DMContainer);


// {this.props.isDMingBool ?
//   <div className="dm-div dm-user-" style={{position:"absolute", top:"50%", border:"1px solid black", height:"300px", zIndex:"5"}}>
//   CHAT WITH: {this.props.userToDM.username}
//   <button onClick={this.props.isDMing}>close</button>
//   </div>
// :
//   null
// }
