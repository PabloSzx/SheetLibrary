import _ from 'lodash';
import
{ FETCH_LIBRARY, FETCH_LACUERDA, FETCH_ULTIMATEGUITAR, CLEAN_APIFETCH,
  SELECT_POST, DESELECT_POST, SELECT_LANGUAGE, FETCH_ERROR, TOGGLE_HELP,
  FETCH_SETTINGS
  }
from '../actions/types.js';
import { spanish, english } from '../actions/language';

const INITIAL_STATE = {
  library: [], selectedPostIds: [], language: spanish, fetchError: '', help: false
};

export function library(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LIBRARY:
      return { ...state, library: action.payload };
    case FETCH_LACUERDA:
      return { ...state, lacuerda: action.payload, ultimateguitar: '' };
    case FETCH_ULTIMATEGUITAR:
      return { ...state, ultimateguitar: action.payload, lacuerda: '' };
    case FETCH_ERROR:
      return { ...state, fetchError: action.payload };
    case CLEAN_APIFETCH:
      return { ...state, lacuerda: '', ultimateguitar: '', fetchError: '' };
    case SELECT_POST:
      return { ...state, selectedPostIds: [...(state.selectedPostIds), action.payload] };
    case DESELECT_POST:
      return { ...state, selectedPostIds: _.without(state.selectedPostIds, action.payload) };
    case SELECT_LANGUAGE:
      return { ...state, language: action.payload };
    case TOGGLE_HELP:
      return { ...state, help: action.payload };
    case FETCH_SETTINGS:
      if (action.payload) {
        if (action.payload.selected) {
          if (action.payload.lang === 'spanish') {
            return {
              ...state, selectedPostIds: action.payload.selected, language: spanish
            };
          } else if (action.payload.lang === 'english') {
            return {
              ...state, selectedPostIds: action.payload.selected, language: english
            };
          }
          }
        }
      return { ...state, selectedPostIds: [] };
    default:
      return state;
  }
}
