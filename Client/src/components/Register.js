import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';  
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});
 
class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();  
      if(!this._validateForm(username, email, password)) return;
      this.props.onSubmit(username, email, password);
    }
  }
 
  _validateEmail(email) {
    var re = /\S+@\S+\.\S+/;    return re.test(email);
  }
  _validateForm(username, email, password){
    if (username === "" || username === undefined) {
      alert("Username is required."); 
      return false;
    } 
    if (email === "" || email === undefined) {
      alert("Email is required."); 
      return false;
    }  
    if(!this._validateEmail(email)){
      alert("Enter valid email ex. test@gmail.com"); 
      return false;
    }
    if(password === undefined || password === "" || password.length < 4){
      alert("Password is required and should be at least four character long.");
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    this.props.onUnload();
  } 
  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="main-page-top">
        <div className='col-sm-10'>
            <h1>Register</h1>
        </div>

        <p className="text-xs-center col-sm-10">
            <Link to="/login">
              Already have an account?
            </Link>
        </p>
        <ListErrors errors={this.props.errors} />

        <form   onSubmit={this.submitForm(username, email, password)}>
          <div className='form-group'>
              <label className='col-sm-2 col-form-label' htmlFor="username">Username</label>
              <div className='col-sm-10'>
                  <input type='text' id='username' className='form-control' placeholder='Username' value={this.props.username} onChange={this.changeUsername} />
              </div>
          </div>
          <div className='form-group'>
                <label className='col-sm-2 col-form-label' htmlFor="email">Email</label>
                <div className='col-sm-10'>
                    <input type='text' id='email' className='form-control' placeholder='Email' value={this.props.email} onChange={this.changeEmail} />
                </div>
            </div>
                
            <div className='form-group'>
                <label className='col-sm-2 col-form-label'  htmlFor="password">Password</label>
                <div className='col-sm-10'>
                    <input type='password' id='password' className='form-control' placeholder='Password' value={this.props.password} onChange={this.changePassword} />
                </div>
            </div>
            <div className='col-sm-10 '>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={this.props.inProgress}>
                Sign up
              </button>
            </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
