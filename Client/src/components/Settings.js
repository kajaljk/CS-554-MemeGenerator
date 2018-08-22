import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = { 
      username: '', 
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }
 
  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, { 
        username: this.props.currentUser.username, 
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, { 
        username: nextProps.currentUser.username, 
        email: nextProps.currentUser.email
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}> 
          <div className='form-group'>
            <label className='col-sm-2 col-form-label' htmlFor="username">Username</label>
            <div className='col-sm-10'>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.updateState('username')} />
            </div>
          </div>

          <div className='form-group'>
            <label className='col-sm-2 col-form-label' htmlFor="email">Email</label>
            <div className='col-sm-10'>
              <input
                className="form-control form-control-lg"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.updateState('email')} readOnly/>
            </div>
          </div>

          <div className='form-group'>
            <label className='col-sm-2 col-form-label' htmlFor="password">Password</label>
            <div className='col-sm-10'>
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="New Password"
                value={this.state.password}
                onChange={this.updateState('password')} />
            </div>
          </div>
          <div className='col-sm-10 '>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={this.state.inProgress}>
              Update Settings
            </button> 
          </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class Settings extends React.Component {
  render() {
    return (
      <div className="main-page-top">
        <div className='row col-12'>
          <div  className=" col-6 col-sm-5">
            <h1>Your Settings</h1>  
          </div>
          <div  className=" col-6 col-sm-5">
            <button
              className="btn btn-outline-danger float-right "
              onClick={this.props.onClickLogout}>
              Logout
          </button>  
        </div>
        </div> 
        <ListErrors errors={this.props.errors} />
 
          <SettingsForm
            currentUser={this.props.currentUser}
            onSubmitForm={this.props.onSubmitForm} />

        
      </div> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
