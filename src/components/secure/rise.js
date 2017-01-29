import _ from 'lodash';

const notes = {
  "C" : 0,
  "C#" : 1,
  "D" : 2,
  "D#" : 3,
  "E" : 4,
  "F" : 5,
  "F#" : 6,
  "G" : 7,
  "G#" : 8,
  "A" : 9,
  "A#" : 10,
  "B" : 11
}

function cleanDigit(digit) {
    let returnDigit = digit.trim().replace(/5/g,"").replace(/7/g,"").replace(/MAJ/g,"").replace(/M/g,"").replace(/SUS/g,"");
    returnDigit = returnDigit.replace(/<A>/g,"").replace(/<\/A>/g,"").split('/')[0];
    return returnDigit;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function rise(value,n) {
  try {
  let valueArray = value.split('\n');
  var digit;
  let lineArray = [];
  let returnArray = [];
  let lineReturnArray = [];
  let toReturn;
  let entered = false;

  _.map(valueArray, (l,indexdelinea) => {
    lineReturnArray = [];
    lineArray = l.split(' ');
    if (l.trim()) {
    _.map(lineArray, (v,indexdepalabraseparada) => {
      digit = v.toUpperCase().trim();
      entered = false;
      _.map(notes, (notaennumero, notaenletra)=> {
        if (notaenletra === cleanDigit(digit)) {
          if ((notaennumero+n)===- 1){
            toReturn = capitalizeFirstLetter(v.toUpperCase().replace(cleanDigit(digit),"B"));
          }
          else if ((notaennumero+n)=== 12){
            toReturn = capitalizeFirstLetter(v.toUpperCase().replace(cleanDigit(digit),"C"));
          }
          else {
            toReturn = capitalizeFirstLetter(v.toUpperCase().replace(cleanDigit(digit),Object.keys(notes)[notaennumero+n]));
          }
          entered = true;

        }
        else if ((notaennumero === 11) && (!entered)) {
          toReturn = v;
        }
      });
      lineReturnArray[indexdepalabraseparada] = toReturn;
    });
    returnArray[indexdelinea]= lineReturnArray.join(' ');
    }
    else {
      returnArray[indexdelinea] = l;
    }
  });
  return returnArray.join('\n');
}
catch (err) {
  console.log('No se puede subir de tono un campo vacio');
}

}

export default rise;
