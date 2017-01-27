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

function rise(value,n) {
  let valueArray = value.split(' ');
  var digit;
  let returnArray = [];
  let toReturn;
  let entered = false;
  _.map(valueArray, (v,k) => {
    digit = v.toUpperCase();
    entered = false;
    if (_.map(notes, (note, key)=> {
      if (key === digit) {
        _.map(notes, (note2, key2) => {
          if ((note+n)===note2){
            toReturn = key2;
            entered = true;
            return key2;
          }
          else if ((note+n) === -1){
            toReturn = "B";
            entered = true;
            return "C";
          }
          else if ((note+n) === 12) {
            toReturn = "C";
            entered = true;
            return "C";
          }
        })
      }
      else if ((note === 11) && (!entered)) {
        toReturn = digit;
        return digit
      }
    })){
    returnArray[k] = toReturn;
    }
  });
    return returnArray.join(' ');


  // for (var i = 0; i < valueArray.length; i++) {
  //   digit = valueArray[i].toUpperCase();
  //   entered = false;
  //   if (_.map(notes, (note, key)=> {
  //     if (key === digit) {
  //       _.map(notes, (note2, key2) => {
  //         if ((note+n)===note2){
  //           toReturn = key2;
  //           entered = true;
  //           return key2;
  //         }
  //         else if ((note+n) === -1){
  //           toReturn = "B";
  //           entered = true;
  //           return "C";
  //         }
  //         else if ((note+n) === 12) {
  //           toReturn = "C";
  //           entered = true;
  //           return "C";
  //         }
  //       })
  //     }
  //     else if ((note === 11) && (!entered)) {
  //       toReturn = digit;
  //       return digit
  //     }
  //   })){
  //   returnArray[i] = toReturn;
  //   }
  // }
  // return returnArray.join(' ');
}

export default rise;
