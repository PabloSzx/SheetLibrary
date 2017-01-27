import { FETCH_LIBRARY } from '../actions/types.js';

const INITIAL_STATE = { library:[] };

export function library(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LIBRARY:
      return { ...state, library: action.payload }
    default:
      return state;
  }
}
