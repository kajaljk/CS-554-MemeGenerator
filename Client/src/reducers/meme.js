import {
  MEME_PAGE_LOADED,
  MEME_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case MEME_PAGE_LOADED:
      return {
        ...state,
        meme: action.payload 
      };
    case MEME_PAGE_UNLOADED:
      return {}; 
    default:
      return state;
  }
};
