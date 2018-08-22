import {
  ADDMEME_PAGE_LOADED,
  ADDMEME_PAGE_UNLOADED,
  MEME_SUBMITTED,
  ASYNC_START, 
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ADDMEME_PAGE_LOADED:
      return {
        ...state,
        memeSlug: action.payload ? action.payload.meme.slug : '',
        title: action.payload ? action.payload.meme.title : '',
        topTxt: action.payload ? action.payload.meme.topTxt : '',
        bottomTxt: action.payload ? action.payload.meme.bottomTxt : '' 
      };
    case ADDMEME_PAGE_UNLOADED:
      return {};
    case MEME_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === MEME_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
