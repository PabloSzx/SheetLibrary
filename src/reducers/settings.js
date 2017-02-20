// import _ from 'lodash';
import
{ FETCH_SETTINGS }
from '../actions/types.js';

const INITIAL_STATE = {
};

export function settings(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SETTINGS:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
