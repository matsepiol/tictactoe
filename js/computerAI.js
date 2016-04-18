'use strict';
var computerAI = (function() {
    // first analize is there a way to win in one move, if not check if the opponent is not one move away from winning, else pick randomly from what positions are left

  // diff = difficulty level of AI
  var choosePosition = function(userArray, computerArray, diff) {
    var chosenPosition;
    if (diff === 'easy') {
      chosenPosition = chooseOtherPosition(computerArray, userArray);
    }
    else if (diff === 'medium' || diff === 'hard') {
      chosenPosition = analizeBoard(computerArray, userArray) || analizeBoard(userArray, computerArray) || chooseOtherPosition(computerArray, userArray, diff);
    }

    return chosenPosition;
  };

  // analize if there is a possibility to win in one move
  var analizeBoard = function(currentArray, opponentArray) {
    var endangeredPosition = analizeRows(currentArray, opponentArray) || analizeColumns(currentArray, opponentArray) || analizeDiagonals(currentArray, opponentArray);
    return endangeredPosition;

    function analizeRows(currentArray, opponentArray) {
      var position = [null, null];

      for (var i = 0 ; i < 3 ; i++) {
        var count = 0;
        for (var j = 0 ; j < 3 ; j++) {
          if (!currentArray[i][j]) {
            count++;
            position = [i, j];
          }
        }
        if (count === 1 && typeof opponentArray[position[0]][position[1]] === 'undefined') {
          return position;
        }
      }
    }

    function analizeColumns(currentArray, opponentArray) {
      var position = [null, null];

      for (var i = 0 ; i < 3 ; i++) {
        var count = 0;
        for (var j = 0 ; j < 3 ; j++) {
          if (!currentArray[j][i]) {
            count++;
            position = [j, i];
          }
        }
        if (count === 1 && typeof opponentArray[position[0]][position[1]] === 'undefined') {
          return position;
        }
      }
    }

    function analizeDiagonals(currentArray, opponentArray) {
      var count = 0,
          position = [null, null],
          i, j;

      for (i = 0, j = 0 ; i < 3 ; i++, j++) {
        if (!currentArray[i][j]) {
          count++;
          position = [i, j];
        }
      }
      if (count === 1 && typeof opponentArray[position[0]][position[1]] === 'undefined') return position;

      count = 0;
      position = [null, null];

      for (i = 0, j = 2 ; i < 3 ; i++, j--) {
        if (!currentArray[i][j]) {
          count++;
          position = [i, j];
        }
      }
      if (count === 1 && typeof opponentArray[position[0]][position[1]] === 'undefined') return position;
    }
  };

  var chooseOtherPosition = function(computerArray, userArray, diff) {
    var possiblePositions = [],
        i, j;  
  
    for (i = 0 ; i < 3 ; i++) {
      for (j = 0; j < 3 ; j++) {
        if (typeof computerArray[i][j] === 'undefined' && typeof userArray[i][j] === 'undefined') {
          possiblePositions.push([i, j]); // creating array of empty positions
        }
      }
    }

    // on hard level user should not be able to win - if user won't make a mistake, there will be draw
    if (diff === 'hard' && possiblePositions.length > 3) {
      for (i = possiblePositions.length - 1; i >= 0 ; i--) {
        if (possiblePositions[i][0] === 1 && possiblePositions[i][1] === 1) {
          return [1,1]; // if possible, put mark in center
        }
        else if (possiblePositions[i][0] === 1 || possiblePositions[i][1] === 1) {
          possiblePositions.splice(i, 1); // if center taken, put mark in the corner (most efficient move)
        }
      }
    }

    return possiblePositions[Math.floor(Math.random()*possiblePositions.length)]; //choose position randomly from possible options
  };

  return {
    choosePosition: choosePosition
  };

})();