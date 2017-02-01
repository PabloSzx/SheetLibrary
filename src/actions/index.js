import Firebase from 'firebase';
import _ from 'lodash';
import {
  FETCH_LIBRARY, FETCH_LACUERDA, FETCH_ULTIMATEGUITAR, CLEAN_APIFETCH, SELECT_POST, DESELECT_POST, SELECT_LANGUAGE
} from './types';
import $ from 'jquery';
import { english, spanish } from './language';

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

export function fetchLacuerda(name,artist) {
  return dispatch => {
    $.getJSON('http://allorigins.us/get?url=' + encodeURIComponent(`http://acordes.lacuerda.net/${artist}/${name}.shtml`) + '&callback=?', function(data){
    // $.getJSON('http://allorigins.us/get?url=' + encodeURIComponent(`http://tabs.ultimate-guitar.com/m/${artist}/${name}_crd.htm`) + '&callback=?', function(data){
// console.log(data.contents);
    // console.log(data.contents.split('<div id=t_body>')[1].split('</div>')[0]);
    // console.log(data.contents.split('<PRE>')[1].split('</PRE>')[0]);
    // console.log((data.contents.split('<PRE>')[1].split('</PRE>')[0]).replace(/<A>/g,"").replace(/<\/A>/g,""));
    // console.log('á');
    // console.log(data.contents.split('<pre class="js-tab-content">'));
    // const oldArray = (data.contents.split('<PRE>')[1].split('</PRE>')[0].split(' '));
    // console.log(data.contents.substring(data.contents.indexOf('�',317)));
    try {
    dispatch({
      type: FETCH_LACUERDA,
      payload: (data.contents.split('<PRE>')[1].split('</PRE>')[0]).replace(/<A>/g,"").replace(/<\/A>/g,"")
      // payload: (data.contents.split('<pre class="js-tab-content">')[1].split('</pre>')[0]).replace(/<span>/g,"").replace(/<\/span>/g,"")
    });
    }
    catch (err) {
      console.log('Cancion no encontrada en lacuerda.net');

      // dispatch({
      //   type: FETCH_LACUERDA,
      //   payload: ''
      //   // payload: (data.contents.split('<pre class="js-tab-content">')[1].split('</pre>')[0]).replace(/<span>/g,"").replace(/<\/span>/g,"")
      // });
    }
    // console.log(data.contents.split('<PRE>')[1].split('</PRE>')[0]);
  });
  }
}

export function cleanApiFetch() {
  return dispatch => {
  dispatch({
    type: CLEAN_APIFETCH,
    payload: null
  });
  }
}

export function fetchUltimateguitar(name,artist) {
  return dispatch => {
    // $.getJSON('http://allorigins.us/get?url=' + encodeURIComponent(`http://acordes.lacuerda.net/${artist}/${name}.shtml`) + '&callback=?', function(data){
    $.getJSON('http://allorigins.us/get?url=' + encodeURIComponent(`http://tabs.ultimate-guitar.com/${artist[0]}/${artist}/${name}_crd.htm`) + '&callback=?', function(data){
// console.log(data.contents);
    // console.log(data.contents.split('<div id=t_body>')[1].split('</div>')[0]);
    // console.log(data.contents.split('<PRE>')[1].split('</PRE>')[0]);
    // console.log((data.contents.split('<PRE>')[1].split('</PRE>')[0]).replace(/<A>/g,"").replace(/<\/A>/g,""));
    // console.log('á');
    // console.log(data.contents.split('<pre class="js-tab-content">'));
    // const oldArray = (data.contents.split('<PRE>')[1].split('</PRE>')[0].split(' '));
    // console.log(data.contents.substring(data.contents.indexOf('�',317)));
    try {
    dispatch({
      type: FETCH_ULTIMATEGUITAR,
      // payload: (data.contents.split('<PRE>')[1].split('</PRE>')[0]).replace(/<A>/g,"").replace(/<\/A>/g,"")
      payload: (data.contents.split('<pre class="js-tab-content">')[1].split('</pre>')[0]).replace(/<span>/g,"").replace(/<\/span>/g,"")
    });
    }
    catch (err) {
      console.log('Cancion no encontrada en ultimate-guitar.com');
      // dispatch({
      //   type: FETCH_ULTIMATEGUITAR,
      //   // payload: (data.contents.split('<PRE>')[1].split('</PRE>')[0]).replace(/<A>/g,"").replace(/<\/A>/g,"")
      //   payload: ''
      // });
    }
    // console.log(data.contents.split('<PRE>')[1].split('</PRE>')[0]);
  });
  }
}

export function selectPost(id) {

  return dispatch => {
  dispatch({
    type: SELECT_POST,
    payload: id
  });
  }

}

export function deselectPost(id) {
  return dispatch => {
  dispatch({
    type: DESELECT_POST,
    payload: id
  });
  }
}

export function selectLanguage(language) {
  return dispatch => {
    console.log('entro al selectLanguage');
    console.log(language);
    let data;
    switch (language) {
      case 'spanish':
        data = spanish
        break;
      default:
        data = english;

    }
    dispatch({
      type: SELECT_LANGUAGE,
      payload: data
    });
  }
}
