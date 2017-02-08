import Firebase from 'firebase';
import $ from 'jquery';
import {
  FETCH_LIBRARY, FETCH_LACUERDA, FETCH_ULTIMATEGUITAR, CLEAN_APIFETCH,
  SELECT_POST, DESELECT_POST, SELECT_LANGUAGE, FETCH_ERROR, TOGGLE_HELP
} from './types';
import { english, spanish } from './language';

let Posts = Firebase.database().ref();

export function fetchLibrary(id) {
  return dispatch => {
    Posts = Firebase.database().ref(id);
    Posts.on('value', snapshot => {
      dispatch({
        type: FETCH_LIBRARY,
        payload: snapshot.val()
      });
    });
  };
}

export function createSong(song, id) {
  return () => {
  Posts = Firebase.database().ref(id).push(song);
};
}

export function deleteSong(key, id) {
  return () => {
  Posts = Firebase.database().ref(id);
  Posts.child(key).remove();
  };
}

export function updateSong(key, song, id) {
  return () => {
  Posts = Firebase.database().ref(id);
  Posts.child(key).update(song);
};
}

const zero = String.fromCharCode(8900);

export function fetchLacuerda(name, artist) {
  return dispatch => {
  $.ajaxSetup({
    contentType: 'application/x-www-form-urlencoded; charset=ISO-8859-1',
    beforeSend: (jqXHR) => {
      jqXHR.overrideMimeType('text/html; charset=ISO-8859-1');
    }
  });
  $.get(`http://allorigins.us/get?method=raw&url=${encodeURIComponent(`http://acordes.lacuerda.net/${artist}/${name}.shtml`)}&callback=?`, (data) => {
      try {
      dispatch({
        type: FETCH_LACUERDA,
        payload: (data.split('<PRE>')[1].split('</PRE>')[0]).replace(/<A>/g, zero)
        .replace(/<\/A>/g, zero).replace(/<em>/g, '').replace(/<\/em>/g, '')
        // payload: (data.contents.split('<PRE>')[1].split('</PRE>')[0])
      });
      } catch (err) {
        console.log(err);
        dispatch({
          type: FETCH_ERROR,
          payload: 'lacuerda.net'
        });
      }
  });
};
}

export function fetchUltimateguitar(name, artist) {
  return dispatch => {
    $.getJSON(`http://allorigins.us/get?url=${encodeURIComponent(`http://tabs.ultimate-guitar.com/${artist[0]}/${artist}/${name}_crd.htm`)}&callback=?`, (data) => {
    try {
    dispatch({
      type: FETCH_ULTIMATEGUITAR,
      payload:
      (data.contents.split('<pre class="js-tab-content">')[1].split('</pre>')[0])
      .replace(/<span>/g, zero).replace(/<\/span>/g, zero)
      .replace(/<em>/g, '').replace(/<\/em>/g, '')
      // payload: (data.contents.split('<pre class="js-tab-content">')[1].split('</pre>')[0])
    });
  } catch (err) {
      dispatch({
        type: FETCH_ERROR,
        payload: 'ultimate-guitar.com'
      });
    }
  });
};
}

export function cleanApiFetch() {
  return dispatch => {
  dispatch({
    type: CLEAN_APIFETCH,
    payload: null
  });
};
}


export function selectPost(id) {
  return dispatch => {
  dispatch({
    type: SELECT_POST,
    payload: id
  });
};
}

export function deselectPost(id) {
  return dispatch => {
  dispatch({
    type: DESELECT_POST,
    payload: id
  });
};
}

export function selectLanguage(language) {
  return dispatch => {
    let data;
    switch (language) {
      case 'spanish':
        data = spanish;
        break;
      default:
        data = english;

    }
    dispatch({
      type: SELECT_LANGUAGE,
      payload: data
    });
  };
}

export function toggleHelp(bool) {
  return dispatch => {
    dispatch({
      type: TOGGLE_HELP,
      payload: bool
    });
  };
}
