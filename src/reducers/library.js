import { FETCH_LIBRARY, FETCH_LACUERDA, FETCH_ULTIMATEGUITAR, CLEAN_APIFETCH, SELECT_POST, DESELECT_POST, SELECT_LANGUAGE, FETCH_ERROR } from '../actions/types.js';
import _ from 'lodash';
import { spanish } from '../actions/language';
const INITIAL_STATE = { library:[], selectedPostIds:[], language: spanish, fetchError: '' };

export function library(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LIBRARY:
      return { ...state, library: action.payload }
    case FETCH_LACUERDA:
      return { ...state, lacuerda: action.payload, ultimateguitar: '' }
    case FETCH_ULTIMATEGUITAR:
      return { ...state, ultimateguitar: action.payload, lacuerda: '' }
    case FETCH_ERROR:
      return { ...state, fetchError: action.payload }
    case CLEAN_APIFETCH:
      return { ...state, lacuerda: '', ultimateguitar: '', fetchError: ''}
    case SELECT_POST:
      return { ...state, selectedPostIds: [...(state.selectedPostIds), action.payload]}
    case DESELECT_POST:
      return { ...state, selectedPostIds: _.without(state.selectedPostIds, action.payload)}
    case SELECT_LANGUAGE:
      return { ...state, language: action.payload }
    default:
      return state;
  }
}
