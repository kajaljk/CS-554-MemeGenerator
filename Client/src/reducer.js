
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common'; 
import meme from './reducers/meme';  
import addMeme from './reducers/addMeme'; 
import memeList from './reducers/memeList';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({ 
  auth,
  common, 
  meme,
  addMeme,
  memeList,
  home,
  profile,
  settings,
  router: routerReducer
});
