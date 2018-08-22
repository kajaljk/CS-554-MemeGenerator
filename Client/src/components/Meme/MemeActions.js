import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { MEME_DELETE } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: MEME_DELETE, payload })
});

const MemeActions = props => {
  const meme = props.meme;
  const del = () => {
    props.onClickDelete(agent.Memes.del(meme.slug))
  };
  if (props.canModify) {
    return (
      <span>
 
        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Meme
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(MemeActions);
