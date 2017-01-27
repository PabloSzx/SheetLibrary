import Firebase from 'firebase';
import _ from 'lodash';
import {
  FETCH_LIBRARY
} from './types';

var Posts = Firebase.database().ref();

export function fetchLibrary(id) {
  return dispatch => {
    Posts = Firebase.database().ref(id);
    Posts.on('value', snapshot => {
      dispatch({
        type:  FETCH_LIBRARY,
        payload: snapshot.val()
      });
    });
  };
}

// export function fetchSong(props, key, id) {
//   return dispatch => {
//     Posts = Firebase.database().ref(id+'/'+key);
//     Posts.on('value', snapshot => {
//       dispatch({
//         type: FETCH_SONG,
//         payload: snapshot.val()
//       });
//     });
//   };
// }
//
export function createSong(song, id) {
  return dispatch => {
  Posts = Firebase.database().ref(id).push(song);
  }
}

export function deleteSong(key, id) {
  return dispatch => {
  Posts = Firebase.database().ref(id);
  Posts.child(key).remove();
  }
}

export function updateSong(key, song, id) {
  return dispatch => {
  Posts = Firebase.database().ref(id);
  Posts.child(key).update(song);
  }
}
