import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ActionCable, ActionCableConsumer } from 'react-actioncable-provider';
import PresenceCable from '../components/PresenceCable'
import ConversationsCables from '../components/ConversationsCables'
import { API_ROOT } from '../constants';
import NewConversationForm from '../components/NewConversationForm';
import MessagesArea from '../components/MessagesArea';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import {getProfileFetch, fetchAllUsers,logoutUser, loginUser, viewSingleEntry} from '../redux/actions';




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
      .then((conversations) => {
        // console.log(conversations)
        // debugger
        const myConversations = conversations.filter(conversation => {
          let titleArr = conversation.title.split("-")
          return titleArr.includes(this.props.currentUserLoggedIn.id.toString())
        })
        // console.log(myConversations);
        this.setState({conversations: myConversations})
      })

  };

  mapConversations = (conversations, handleClick) => {
    return conversations.map(conversation => {
      // console.log(conversation);

      let user1 = conversation.title.split("-")[0]
      let user2 = conversation.title.split("-")[1]

      let user1Name = this.props.allUsers.filter(user => user.id.toString() === user1 )[0].username
      let user2Name = this.props.allUsers.filter(user => user.id.toString() === user2 )[0].username

      return (
        <li className="list-group-item" key={conversation.id} onClick={() => handleClick(conversation.id)}>
          {user1Name} - {user2Name}
        </li>
      );
    });
  };

  findActiveConversation = (conversations, activeConversation) => {

    const conversationFound = conversations.find(
      conversation => conversation.id === activeConversation
    );
    return conversationFound
  };
  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    // console.log("i have received conversation -",conversation);
    // debugger
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };
  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    // console.log(conversation);

    conversations.forEach((conversation,idx) => {
      if (conversation.id === message.conversation_id) {
        const newUpdatedConversation = {...conversation}
        conversations[idx] = newUpdatedConversation
      }
    })
    // debugger
    // this.setState({conversations: []})
    this.setState({ conversations: conversations });
  };


  render = () => {
    const { conversations, activeConversation } = this.state;
    // console.log(this.state);
    return (
      <div className="conversationsList" style={{height:"80em"}}>
        <PresenceCable/>
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
        <h2 style={{textAlign:"center",color:"white"}}>Webbl Chats</h2>

        <div className="map-conversations" style={{height:"5em",overflow:"scroll",width:"fit-content", margin:"0 auto",marginBottom:"5em"}}>{this.mapConversations(conversations, this.handleClick)}</div>
        {activeConversation ? (
          <MessagesArea
            conversation={this.findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    );
  };


//active onverstion


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
  userToDM: state.conversationsReducer.userToDM,
  allUsers: state.usersReducer.allUsers
})
const mapDispatchToProps = dispatch => ({
  // userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
  // loginUser: userObj => dispatch(loginUser(userObj))
  fetchAllUsers: () => dispatch(fetchAllUsers())
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
