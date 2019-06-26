import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../redux/actions';


class Signup extends Component {

  state = {
    first_name:"",
    last_name:"",
    username: "",
    password: "",
    age: "",
    bio: ""
 }

 handleChange = event => {
     this.setState({
       [event.target.name]: event.target.value
     });
   }

   handleSubmit = event => {
     event.preventDefault()
     this.props.userPostFetch(this.state)
   }

   render() {
     return (
       <form onSubmit={this.handleSubmit}>
         <h1>Sign Up For An Account</h1>

         <label>First Name</label>
         <input
           name='first_name'
           placeholder='First Name'
           value={this.state.first_name}
           onChange={this.handleChange}
           /><br/>

         <label>Last Name</label>
         <input
           name='last_name'
           placeholder='Last Name'
           value={this.state.last_name}
           onChange={this.handleChange}
           /><br/>

         <label>Username</label>
         <input
           name='username'
           placeholder='Username'
           value={this.state.username}
           onChange={this.handleChange}
           /><br/>

         <label>Password</label>
         <input
           type='password'
           name='password'
           placeholder='Password'
           value={this.state.password}
           onChange={this.handleChange}
           /><br/>


           <label>Bio</label>
           <textarea
             name='bio'
             placeholder='Bio'
             value={this.state.bio}
             onChange={this.handleChange}
             /><br/>

             <label>Age</label>
             <input
               name='age'
               placeholder='Age'
               value={this.state.age}
               onChange={this.handleChange}
               /><br/>

         <input type='submit'/>
       </form>
     )
   }
 }

 const mapDispatchToProps = dispatch => ({
   userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
 })

 export default connect(null, mapDispatchToProps)(Signup);
