
import MainView from './MainView';
import React from 'react'; 
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({ 
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'yours' : 'all';
    const memesPromise = this.props.token ?
      agent.Memes.all :
      agent.Memes.all;

    this.props.onLoad(tab, memesPromise, Promise.all([agent.Memes.getAll(), memesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="main-page-top">
      <div className='col-md-12 col-sm-10'>
          <h1>Memes</h1>
          <MainView />
      </div>
    </div> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
