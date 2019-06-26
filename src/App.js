import React, {Component,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginSignupContainer from "./containers/LoginSignupContainer"
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');

class App extends Component {
  state = {
    currentUser: {}
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      fetch("https://threes-nutz-backend.herokuapp.com/api/v1/auto_login", {
      // fetch("http://localhost:3000/api/v1/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          localStorage.removeItem("user_id")
          // alert(response.errors)
        } else {
          this.setState({
            currentUser: response
          })
        }
      })
    }
  }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
    })
  }

  render(){
    return (
      <div className="App">
          <LoginSignupContainer setCurrentUser={this.setCurrentUser}/>
      </div>
    );
  }
}

export default App;
