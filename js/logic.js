'use strict';
var gameLogic = (function() {

  var checkWinner = function(arr) {
    if (checkRows(arr) || checkColumns(arr) || checkDiagonals(arr)) {
      return true;
    }
    else {
      return false;
    }
  };

  var checkRows = function(arr) {
    var result = [];
    for (var i = 0 ; i < 3 ; i++) {

      for (var j = 0 ; j < 3 ; j++) {
        if (!arr[i][j]) {
          result[i] = false;
        }
      }
      if (result[i] !== false) {
        result[i] = true;
        return true;
      }
    }
    return false;
  };

  var checkColumns = function(arr) {
    var result = [];
    for (var i = 0 ; i < 3 ; i++) {

      for (var j = 0 ; j < 3 ; j++) {
        if (!arr[j][i]) {
          result[i] = false;
        }
      }
      if (result[i] !== false) {
        result[i] = true;
        return true;
      }
    }
    return false;
  };

  var checkDiagonals = function(arr) {
    var result,
        i, j;

    for (i = 0, j = 0 ; i < 3 ; i++, j++) {
      if (!arr[i][j]) {
        result = false;
      }
    }
    if (result !== false) return true;

    result = null;
    for (i = 0, j = 2 ; i < 3 ; i++, j--) {
      if (!arr[i][j]) {
        result = false;
      }
    }

    if (result !== false) return true;
    return false;
  };

  return {
    checkWinner: checkWinner
  };

})();