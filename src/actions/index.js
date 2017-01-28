import Firebase from 'firebase';
import _ from 'lodash';
import {
  FETCH_LIBRARY, FETCH_LACUERDA
} from './types';
import $ from 'jquery';

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

export function fetchLacuerda(artist,name) {
  return dispatch => {
    $.getJSON('http://allorigins.us/get?url=' + encodeURIComponent(`http://acordes.lacuerda.net/${artist}/${name}.shtml`) + '&callback=?', function(data){
    // console.log(data.contents.split('<div id=t_body>')[1].split('</div>')[0]);
    // console.log(data.contents.split('<PRE>')[1].split('</PRE>')[0]);
    dispatch({
      type: FETCH_LACUERDA,
      payload: (data.contents.split('<PRE>')[1].split('</PRE>')[0]).replace(/<A>/g,"").replace(/<\/A>/g,"")
    });
    // console.log(data.contents.split('<PRE>')[1].split('</PRE>')[0]);
  });
  }
}
