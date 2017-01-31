import { FETCH_LIBRARY, FETCH_LACUERDA, FETCH_ULTIMATEGUITAR, CLEAN_APIFETCH, SELECT_POST, DESELECT_POST } from '../actions/types.js';
import _ from 'lodash';
const INITIAL_STATE = { library:[], selectedPostIds:[] };

export function library(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LIBRARY:
      return { ...state, library: action.payload }
    case FETCH_LACUERDA:
      return { ...state, lacuerda: action.payload, ultimateguitar: null }
    case FETCH_ULTIMATEGUITAR:
      return { ...state, ultimateguitar: action.payload, lacuerda: null }
    case CLEAN_APIFETCH:
      return { ...state, lacuerda: null, ultimateguitar: null}
    case SELECT_POST:
      return { ...state, selectedPostIds: [...(state.selectedPostIds), action.payload]}
    case DESELECT_POST:
      return { ...state, selectedPostIds: _.without(state.selectedPostIds, action.payload)}
    default:
      return state;
  }
}
