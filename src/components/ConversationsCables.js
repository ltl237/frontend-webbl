//ConversationsCables.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// ACTIONS
import { appendNewConversation } from '../redux/actions'



class ConversationsCables extends Component {

  // If a new broadcasted conversation from websockets is received, check if user is one of the user ids to whom the conversation belongs to (users are serialized). If so, appended into the list of conversations. Channels are private but this double-checks subscribers on the client-side.
  // handleReceivedConversation = (response) => {
  //   const { conversation } = response;
  //   // debugger
  //   if (conversation.users.map((i)=> i.id).includes(this.props.userId)) {
  //     this.props.appendNewConversation(conversation);
  //   }
  // };


  render() {
    console.log('CONVO');
    return (
      this.props.userId
      ? <ActionCable
            channel={{
              channel: 'MessagesChannel'
            }}
            onReceived={(response) => this.props.handleReceivedMessage(response)}
        />
      : null
    );
  }
};

// REDUX PROPS
const mapStateToProps = state => ({
  conversationsOnScreen: state.userConversationsReducer.conversationsOnScreen
})

const mapDispatchToProps = dispatch => ({

    appendNewConversation: (newConversation) => dispatch(appendNewConversation(newConversation)),

})


export default connect(mapStateToProps, mapDispatchToProps)(ConversationsCables);

// import React, { Fragment } from 'react';
// import { ActionCable } from 'react-actioncable-provider';
//
// const Cable = ({ conversations, handleReceivedMessage }) => {
//   return (
//     <Fragment>
//       {conversations.map(conversation => {
//         return (
//           <ActionCable
//             key={conversation.id}
//             channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
//             onReceived={handleReceivedMessage}
//           />
//         );
//       })}
//     </Fragment>
//   );
// };
//
// export default Cable;
