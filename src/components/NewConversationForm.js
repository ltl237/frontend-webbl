import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewConversationForm extends React.Component {
  state = {
    title: ''
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state);
    // , {
    //   method: "GET",
    //   headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    // // Only, if we are saving JWT token in localStorage
    //       "Authorization": `Bearer ${localStorage.getItem("token")}`}
    // }


    fetch(`${API_ROOT}/conversations`, {
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
    .then(conversationsData => {
      console.log(conversationsData);
    })
    this.setState({ title: '' });
    // .then(res => res.json())
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
