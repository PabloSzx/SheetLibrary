import { FETCH_LIBRARY, FETCH_LACUERDA } from '../actions/types.js';

const INITIAL_STATE = { library:[] };

export function library(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LIBRARY:
      return { ...state, library: action.payload }
    case FETCH_LACUERDA:
      return { ...state, lacuerda: action.payload }
    default:
      return state;
  }
}
