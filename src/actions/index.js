import Firebase from 'firebase';
import $ from 'jquery';
import {
  FETCH_LIBRARY, FETCH_LACUERDA, FETCH_ULTIMATEGUITAR, CLEAN_APIFETCH,
  SELECT_POST, DESELECT_POST, SELECT_LANGUAGE, FETCH_ERROR, TOGGLE_HELP,
  FETCH_SETTINGS, DESELECT_ALL
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

export function fetchLacuerda(name, artist) {
  return dispatch => {
  $.ajaxSetup({
    contentType: 'application/x-www-form-urlencoded; charset=ISO-8859-1',
    beforeSend: (jqXHR) => {
      jqXHR.overrideMimeType('text/html; charset=ISO-8859-1');
    }
  });
  $.get(`http://allorigins.us/get?method=raw&url=${encodeURIComponent(`http://acordes.lacuerda.net/${cleanAccent(artist)}/${cleanAccent(name)}.shtml`)}&callback=?`, (data) => {
      try {
      dispatch({
        type: FETCH_LACUERDA,
        payload:
        cleanExtra(data.split('<PRE>')[1].split('</PRE>')[0])
      });
      } catch (err) {
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
    $.getJSON(`http://allorigins.us/get?url=${encodeURIComponent(`http://tabs.ultimate-guitar.com/${artist[0]}/${cleanAccent(artist)}/${cleanAccent(name)}_crd.htm`)}&callback=?`, (data) => {
    try {
    dispatch({
      type: FETCH_ULTIMATEGUITAR,
      payload:
      cleanExtra(data.contents.split('<pre class="js-tab-content">')[1].split('</pre>')[0])
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

export function fetchSettings(id, language) {
  return dispatch => {
    Posts = Firebase.database().ref(`settings/${id}`);
    Posts.on('value', snapshot => {
      if (!snapshot.val()) {
        Firebase.database().ref(`settings/${id}`).update({ lang: language });
      }
      dispatch({
        type: FETCH_SETTINGS,
        id,
        payload: snapshot.val()
      });
    });
  };
}

export function updateSettings(id, settings) {
  return () => {
    Firebase.database().ref(`settings/${id}`).update(settings);
  };
}

export function deselectAll(id) {
  return dispatch => {
    dispatch({
      type: DESELECT_ALL,
      id,
      payload: []
    });
  };
}

const zero = String.fromCharCode(8900);

function cleanAccent(string) {
  return string
  .replace(/á/gi, 'a')
  .replace(/é/gi, 'e')
  .replace(/í/gi, 'i')
  .replace(/ó/gi, 'o')
  .replace(/ú/gi, 'u')
  .replace(/ñ/gi, 'n')
  .replace(/´/gi, '');
}

function cleanExtra(string) {
  return string
  .replace(/<A>/g, zero)
  .replace(/<\/A>/g, zero)
  .replace(/<span>/g, zero)
  .replace(/<\/span>/g, zero)
  .replace(/<em>/g, '')
  .replace(/<\/em>/g, '');
}
