import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';  
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
     
      if(!this._validateForm(email, password)) return false;
      this.props.onSubmit(email, password);
    };
  }
  _validateEmail(email) {
    var re = /\S+@\S+\.\S+/;    return re.test(email);
  }
  _validateForm(email, password){
    if (email === "" || email === undefined) {
      alert("Email is required."); 
      return false;
    } 
    if(!this._validateEmail(email)){
      alert("Enter valid email ex. test@gmail.com"); 
      return false;
    }
    if(password === undefined || password === ""){
      alert("Password is required.");
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
    return ( 

      <div className="main-page-top">
        
        <div className='col-sm-10'>
            <h1>Login</h1>
        </div>

        <p className="text-xs-center col-sm-10">
            <Link to="/register">
              Need an account?
            </Link>
        </p>
        <ListErrors errors={this.props.errors} />

        <form onSubmit={this.submitForm(email, password)}>
          <div className='form-group'>
              <label className='col-sm-2 col-form-label' htmlFor="email">Email</label>
              <div className='col-sm-10'>
                  <input type='text' id='email' className='form-control' placeholder='Email' value={email} onChange={this.changeEmail} />
              </div>
          </div>
              
          <div className='form-group'>
              <label className='col-sm-2 col-form-label'  htmlFor="password">Password</label>
              <div className='col-sm-10'>
                  <input type='password' id='password' className='form-control' placeholder='Password' value={password} onChange={this.changePassword} />
              </div>
          </div>
          <div className='col-sm-10 '>
           <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={this.props.inProgress}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
