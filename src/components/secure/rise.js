import _ from 'lodash';

const up = {
  c: 'c#',
  'c#': 'd',
  d: 'd#',
  'd#': 'e',
  e: 'f',
  f: 'f#',
  'f#': 'g',
  g: 'g#',
  'g#': 'a',
  a: 'a#',
  'a#': 'b',
  b: 'c',
  do: 'do#',
  'do#': 're',
  re: 're#',
  're#': 'mi',
  mi: 'fa',
  fa: 'fa#',
  'fa#': 'sol',
  sol: 'sol#',
  'sol#': 'la',
  la: 'la#',
  'la#': 'si',
  si: 'do'
};

const down = {
  c: 'b',
  'c#': 'c',
  d: 'c#',
  'd#': 'd',
  e: 'd#',
  f: 'e',
  'f#': 'f',
  g: 'f#',
  'g#': 'g',
  a: 'g#',
  'a#': 'a',
  b: 'a#',
  do: 'si',
  'do#': 'do',
  re: 'do#',
  're#': 're',
  mi: 're#',
  fa: 'mi',
  'fa#': 'fa',
  sol: 'fa#',
  'sol#': 'sol',
  la: 'sol#',
  'la#': 'la',
  si: 'la#'
};


// 'DO' : 0,
// 'DO#' : 1,
// 'REB' : 1,
// 'DB' : 1,
// 'RE' : 2,
// 'RE#' : 3,
// 'MIB' : 3,
// 'EB' : 3,
// 'MI' : 4,
// 'FA' : 5,
// 'FA#' : 6,
// 'SOLB' : 6,
// 'GB' : 6,
// 'SOL' : 7,
// 'SOL#' : 8,
// 'LAB' : 8,
// 'AB' : 8,
// 'LA' : 9,
// 'LA#' : 10,
// 'SIB' : 10,
// 'BB' : 10,
// 'SI' : 11

const zero = String.fromCharCode(8900);

const trans = String.fromCharCode(8594);

function capitalizeFirstLetter(string) {
  if (string.charAt(0) === zero) {
    const str = string.charAt(1).toUpperCase() + string.slice(2).toLowerCase();
    return str;
  }
    const str = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    return str;
}

function isNote(string) {
  if (string.indexOf(zero) !== -1) {
    return true;
  }
  return false;
}

function riseSong(value, n) {
  if (value) {
  let lineArray = [];
  let lineReturnArray = [];
  const valueArray = value.split('\n');
  const returnArray = [];

  _.map(valueArray, (l, indexdelinea) => {
    lineReturnArray = [];
    lineArray = l.split(' ');
    if (l.trim()) {
      _.map(lineArray, (v, indexdepalabraseparada) => {
        if (isNote(v)) {
          if (n === 1) {
          lineReturnArray[indexdepalabraseparada] = v.replace(/maj/ig, trans)
          .replace(/do#|do|re#|re|mi|fa#|fa|sol#|sol|la#|la|si|c#|c|d#|d|e|f#|f|g#|g|a#|a|b/ig,
            // function (matched) { return capitalizeFirstLetter(up[matched.toLowerCase()]); }
            (matched) => (capitalizeFirstLetter(up[matched.toLowerCase()]))
          )
          .replace(/→/g, 'maj');
          } else if (n === -1) {
          lineReturnArray[indexdepalabraseparada] = v.replace(/maj/ig, trans)
          .replace(/do#|do|re#|re|mi|fa#|fa|sol#|sol|la#|la|si|c#|c|d#|d|e|f#|f|g#|g|a#|a|b/ig,
            // function (matched) { return capitalizeFirstLetter(down[matched.toLowerCase()]); }
            (matched) => (capitalizeFirstLetter(down[matched.toLowerCase()]))
          )
          .replace(/→/g, 'maj');
          }
        } else {
          lineReturnArray[indexdepalabraseparada] = v;
        }
      });
      returnArray[indexdelinea] = lineReturnArray.join(' ');
    } else {
      returnArray[indexdelinea] = l;
    }
  });
  return returnArray.join('\n');
  }
}

export default riseSong;
