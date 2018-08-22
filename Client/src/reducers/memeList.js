import { 
  SET_PAGE, 
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,  
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED 
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) { 
    case SET_PAGE:
      return {
        ...state,
        memes: action.payload.memes,
        memesCount: action.payload.memesCount,
        currentPage: action.page
      }; 
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager, 
        memes: action.payload[1].memes,
        memesCount: action.payload[1].memesCount,
        currentPage: 0 ,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};  
    case PROFILE_PAGE_LOADED: 
      return {
        ...state,
        pager: action.pager,
        memes: action.payload[1].memes,
        memesCount: action.payload[1].memesCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED: 
      return {};
    default:
      return state;
  }
};
