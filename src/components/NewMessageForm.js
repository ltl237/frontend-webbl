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
      <div className="newMessageForm form-group">
        <form onSubmit={this.handleSubmit}>
          <br />
          <textarea
            style={{height:"2.3em",width:"35em",verticalAlign:"middle",display:"inline-block"}}
            type="text"
            className="form-control"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-light" value="Send !">Send !</button>
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
