import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Access-Control-Allow-Origin" : "*",
        // "Access-Control-Allow-Credentials" : true,
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(this.state)
    })
    .then(messagesData => {
      console.log(messagesData);
    })
    this.setState({ text: '' });
    // .then(res => res.json())
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
