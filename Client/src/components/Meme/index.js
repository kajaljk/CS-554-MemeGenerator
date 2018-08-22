import MemeMeta from './MemeMeta'; 
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux'; 
import { MEME_PAGE_LOADED, MEME_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.meme,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: MEME_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: MEME_PAGE_UNLOADED })
});

class Meme extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Memes.get(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() { 
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.meme.author.username;
    return (
      <div className="col-md-12">

        <div className="banner">
          <div className="container">

            <h1>{this.props.meme.title}</h1>
            <MemeMeta
              meme={this.props.meme}
              canModify={canModify} />

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meme);
