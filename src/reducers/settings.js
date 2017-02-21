// import _ from 'lodash';
import
{ FETCH_SETTINGS, DESELECT_ALL }
from '../actions/types.js';

const INITIAL_STATE = {
};

export function settings(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SETTINGS:
      return { ...state, [action.id]: action.payload };
    case DESELECT_ALL:
      return { ...state, [action.id]: { ...state[action.id], selected: action.payload } };
    default:
      return state;
  }
}
