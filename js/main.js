'use strict';

var gameLogic = window.gameLogic, //logic.js
    computerAI = window.computerAI, //computerAI.js
    xArray = [new Array(3), new Array(3), new Array(3)],
    oArray = [new Array(3), new Array(3), new Array(3)],
    xCount = 0,
    oCount = 0,
    isPlayerTurn = true;

// default options
// gameType = PvP or PvC, turn = x or o, difficulty = easy, medium or hard.
var gameType = 'PvP',
    turn = 'x',
    difficulty = 'medium';

// default DOM elements checking
document.getElementById('pvp').checked = true;
document.getElementById('medium').checked = true;
document.getElementById('x-mark').checked = true;

var changeTurn = function() {
  var el = document.getElementsByClassName('current-turn-el')[0];

  isPlayerTurn = !isPlayerTurn;

  if (turn === 'x') {
    el.classList.remove('x');
    el.classList.add('o');
    turn = 'o';
  }
  else if (turn === 'o') {
    el.classList.remove('o');
    el.classList.add('x');
    turn = 'x';
  }
};

var clearGame = function() {
  var el = document.getElementsByClassName('element');

  xArray = [new Array(3), new Array(3), new Array(3)];
  oArray = [new Array(3), new Array(3), new Array(3)];
  xCount = 0;
  oCount = 0;

  for (var i = el.length - 1 ; i >= 0 ; i--) {
    el[i].parentNode.removeChild(el[i]);
  }

  changeTurn();

  if (!isPlayerTurn && gameType === 'PvC') {
    performComputerMove();
  }
};

var performComputerMove = function() {
  var computerMove = computerAI.choosePosition(xArray, oArray, difficulty); // computerAI.js 

  if (computerMove) {
    var chosenGrid = document.getElementById(computerMove[0] + '-' + computerMove[1]);
    markMove(chosenGrid);
  } 
};

var changeGameType = function(val) {
  var diffOptions = document.getElementsByClassName('difficulty')[0],
      playerMarkOption = document.getElementsByClassName('player-mark')[0];
  
  gameType = val;

  // if computer is playing, it's playing with O
  if (gameType === 'PvC') {
    diffOptions.classList.remove('hidden');
    playerMarkOption.classList.remove('hidden');

    if (turn === 'o') {
      performComputerMove();
    }
  }
  else {
    diffOptions.classList.add('hidden');
    playerMarkOption.classList.add('hidden');
  }
};

var changeGameDifficulty = function(val) {
  difficulty = val;
};

var changePlayerMark = function(val) {
  if (val !== turn) {
    isPlayerTurn = false;
    performComputerMove();
  }
};

var markMove = function(obj) {
  var row = obj.id.slice(0, 1),
      column = obj.id.slice(-1),
      isGameFinished = false;

  if (obj.getElementsByTagName('span').length) return;

  if (turn === 'x') { // put X on board
    var xEl = document.createElement('span');
    obj.appendChild(xEl);
    xArray[row][column] = true;
    xCount++;

    if (xCount >= 3) {
      isGameFinished = gameLogic.checkWinner(xArray); // logic.js
    }

    var elOpacity = window.getComputedStyle(xEl).opacity;
    if (elOpacity == 0) { // checking if styles are applied
      xEl.classList.add('x', 'element');
      if (isGameFinished) {
        window.alert('X wins!');
        clearGame();
        return;
      }   
    }
  }
  else if (turn === 'o') { // put O on board
    var oEl = document.createElement('span');
    obj.appendChild(oEl);
    oArray[row][column] = true;
    oCount++;

    if (oCount >= 3 ) {
      isGameFinished = gameLogic.checkWinner(oArray); // logic.js
    }

    var elOpacity = window.getComputedStyle(oEl).opacity;
    if (elOpacity == 0) { // checking if styles are applied
      oEl.classList.add('o', 'element');

      if (isGameFinished) {
        window.alert('O wins!');  
        clearGame();
        return;
      }
    }
  }

  if (xCount + oCount >= 9 && !isGameFinished) { 
    isGameFinished = true;
    window.alert('Draw!');
    clearGame();
    return;
  }

  changeTurn();

  if (!isPlayerTurn && !isGameFinished && gameType === 'PvC') {
    performComputerMove();
  }
};

var boxEl = document.getElementsByClassName('grid-element');
for (var i = 0 ; i < boxEl.length ; i++) {
  boxEl[i].addEventListener('click',  function() { markMove(this); });
}