import { FETCH_LIBRARY, FETCH_LACUERDA, FETCH_ULTIMATEGUITAR, CLEAN_APIFETCH } from '../actions/types.js';

const INITIAL_STATE = { library:[] };

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
    default:
      return state;
  }
}
