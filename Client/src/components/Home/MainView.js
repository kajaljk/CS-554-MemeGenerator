import MemeList from '../MemeList';
import React from 'react';  
import { connect } from 'react-redux'; 

import {
  HOME_PAGE_LOADED 
} from '../../constants/actionTypes';
 
const mapStateToProps = state => ({
  ...state.memeList,  
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload })
});

const MainView = props => { 
  return ( 

     <div className="col-md-12"> 
      <MemeList
        pager={props.pager}
        memes={props.memes}
        loading={props.loading}
        memesCount={props.memesCount}
        currentPage={props.currentPage} />
    </div>
      
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
