// Game board
const gameBoard = (function () {
  const board = Array(9).fill(null);

  function setMark(index, marker) {
    if (board[index] === null) {
      board[index] = marker;
      return true;
    }

    return false;
  }

  function getBoard() {
    return board.slice();
  }

  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      board[i] = null;
    }
  }

  return {setMark, getBoard, resetBoard};
})();

// Create player for game
const createPlayer = function (playerName, marker) {
  let score = 0;

  function getScore() {
    return score;
  }

  function incrementScore() {
    return score++;
  }

  return {playerName, marker, getScore, incrementScore};
}

// Game controller
const gameController = (function () {
  const player1 = createPlayer('Player 1', 'X');
  const player2 = createPlayer('Player 2', 'O');

  let playerTurn = false;
  let isGameOver = false;
  let winner;

  function getCurrentPlayer() {
    return playerTurn ? player2 : player1;
  }

  function switchCurrentPlayer() {
    playerTurn = !playerTurn;
  }

  let tieScore = 0;

  function getTieScore() {
    return tieScore;
  }

  function incrementTieScore() {
    return tieScore++;
  }

  function playRound(index) {
    if (isGameOver) return;

    const successful = gameBoard.setMark(index, getCurrentPlayer().marker);

    if (!successful) return;

    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    const board = gameBoard.getBoard();

    for (let i = 0; i < winningCombos.length; i++) {
      const combo = winningCombos[i];
      const [a, b, c] = combo;

      if (
        board[a] !== null &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        if (board[a] === player1.marker) {
          player1.incrementScore();
          winner = `${player1.playerName} wins!`;
          isGameOver = true;
        } else if (board[a] === player2.marker) {
          player2.incrementScore();
          winner = `${player2.playerName} wins!`;
          isGameOver = true;
        }
      }
    }

    const fullBoard = board.every(item => item !== null);

      if (fullBoard && !isGameOver) {
        incrementTieScore();
        winner = 'Tie';
        isGameOver = true;
      }

      if (!isGameOver) {
        switchCurrentPlayer();
      }
  }

  function getIsGameOver() {
    return isGameOver;
  }

  function getScores() {
    return {
      player1: player1.getScore(),
      player2: player2.getScore(),
      tie: getTieScore()
    };
  }

  function getWinner() {
    return winner;
  }

  function resetGame() {
    gameBoard.resetBoard();

    winner = null;
    tieScore = 0;
    playerTurn = false;
    isGameOver = false;
  }

  return {
    getCurrentPlayer,
    playRound,
    getIsGameOver,
    getScores,
    getWinner,
    resetGame
  };
})();

// Display game in DOM
const displayController = (function () {
  const gameContainer = document.querySelector('.game-container');
  const heading = document.querySelector('h1');
  const player1Input = document.querySelector('#player1');
  const player2Input = document.querySelector('#player2');
  const startBtn = document.querySelector('#start');
  const scoreBoard = document.querySelector('.score-board');

  startBtn.addEventListener('click', startGame);

  function startGame() {
    gameContainer.innerHTML = '';
    gameController.getIsGameOver();

    const resetBtn = document.createElement('button');
    resetBtn.id = 'start';
    resetBtn.textContent = 'Play again';
    const currentPlayer = document.createElement('div');
    currentPlayer.textContent = `${player1Input.value}'s move`;
    const gameGrid = document.createElement('div');
    gameGrid.classList.add('game-grid');

    for (let i = 0; i < 9; i++) {
      const gridTile = document.createElement('div');
      gridTile.classList.add('grid-tile');
      gridTile.classList.add('grid-text');
      gridTile.setAttribute('data-index', i);

      gameGrid.appendChild(gridTile);
    }

    gameContainer.appendChild(heading);
    gameContainer.appendChild(resetBtn);
    gameContainer.appendChild(scoreBoard);
    gameContainer.appendChild(currentPlayer);
    gameContainer.appendChild(gameGrid);
  }
})();

// const GameStart = (function () {
//   const startBtn = document.querySelector('#start');
//   const heading = document.querySelector('h1');
//   const gameContainer = document.querySelector('.game-container');
//   const scoreBoard = document.querySelector('.score-board');
//   const player1 = document.querySelector('#player1');
//   const player2 = document.querySelector('#player2');
//   const playerDisplayName1 = document.querySelector('#p1');
//   const playerDisplayName2 = document.querySelector('#p2');
//   const playerScore1 = document.querySelector('.score1');
//   const playerScore2 = document.querySelector('.score2');
//   const tieScore = document.querySelector('.tie-score');

//   const playerMarker = {
//     player1: 'X',
//     player2: 'O',
//     status: true,
//     changeStatus() {
//       return this.status = !this.status;
//     }
//   }

//   let scorePlayer1 = 0;
//   let scorePlayer2 = 0;
//   let scoreTie = 0;

//   startBtn.addEventListener('click', startGame);

//   function startGame() {
//     gameContainer.innerHTML = '';
//     let gameOver = false;
//     let gameResult;
//     const resetBtn = document.createElement('button');
//     const currentPlayerMove = document.createElement('div');
//     currentPlayerMove.textContent = `${player1.value}'s move.`;
//     resetBtn.id = 'start';
//     resetBtn.textContent = 'Play again';
//     const gameGrid = document.createElement('div');
//     gameGrid.classList.add('game-grid');

//     const winningCombos = [
//           [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
//           [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
//           [0, 4, 8], [2, 4, 6] // diagonals
//     ];

//     function markTileAndCheckWinner(event) {
//       const gridTile = event.target;
//       const status = playerMarker.changeStatus();
//       const tileIndex = parseInt(gridTile.dataset.index);

//       if (!status) {
//         gridTile.textContent = playerMarker.player1;
//         gridTile.style.color = '#830564';
//         gridTile.style.pointerEvents = 'none';
//         currentPlayerMove.textContent = `${player2.value}'s turn.`;
//         gameBoard[tileIndex] = playerMarker.player1;
//       } else {
//         gridTile.textContent = playerMarker.player2;
//         gridTile.style.color = '#167004';
//         gridTile.style.pointerEvents = 'none';
//         currentPlayerMove.textContent = `${player1.value}'s turn.`;
//         gameBoard[tileIndex] = playerMarker.player2;
//       }

//       for (let i = 0; i < winningCombos.length; i++) {
//         const gridTiles = document.querySelectorAll('.grid-tile');

//         let combo = winningCombos[i];
//         const [a, b, c] = combo;
          
//         if (
//           gameBoard[a] !== null &&
//           gameBoard[a] === gameBoard[b] &&
//           gameBoard[a] === gameBoard[c]
//         ) {
//           if (gameBoard[a] === playerMarker.player1) {
//             gameResult = `${player1.value} wins! 🎉`;
//             currentPlayerMove.textContent = gameResult;
//             scorePlayer1++;
//             playerScore1.textContent = scorePlayer1;
//           } else if (gameBoard[a] === playerMarker.player2) {
//             gameResult = `${player2.value} wins! 🎉`;
//             currentPlayerMove.textContent = gameResult;
//             scorePlayer2++;
//             playerScore2.textContent = scorePlayer2;
//           }

//           gameOver = true;

//           for (let gridTile of gridTiles) {
//             gridTile.style.pointerEvents = 'none';
//           }
//         }
//       }

//       if (!gameOver) {
//         const boardFull = gameBoard.every(tile => tile !== null);
          
//         if(boardFull) {
//           gameResult = `It's a tie.`;
//           currentPlayerMove.textContent = gameResult;
//           scoreTie++;
//           tieScore.textContent = scoreTie;
//           gameOver = true;
//         }
//       }
//     }
      
//     for (let i = 0; i < 9; i++) {
//       const gridTile = document.createElement('div');
//       gridTile.classList.add('grid-tile');
//       gridTile.classList.add('grid-text');
//       gridTile.setAttribute('data-index', i);

//       gridTile.addEventListener('click', markTileAndCheckWinner);
//       gameGrid.appendChild(gridTile);
//     }

//     function clearGridTiles() {
//       const gridTiles = document.querySelectorAll('.grid-tile');

//       gridTiles.forEach(tile => {
//         tile.style.pointerEvents = 'auto';
//         tile.innerHTML = '';
//       });

//       currentPlayerMove.textContent = `${player1.value}'s move.`;

//       for (let i = 0; i < gameBoard.length; i++) {
//         gameBoard[i] = null;
//       }

//       playerMarker['status'] = true;
//       gameOver = false;
//     }

//     resetBtn.addEventListener('click', clearGridTiles);

//     playerDisplayName1.textContent = player1.value;
//     playerDisplayName2.textContent = player2.value;

//     gameContainer.appendChild(heading);
//     gameContainer.appendChild(resetBtn);
//     gameContainer.appendChild(scoreBoard);
//     gameContainer.appendChild(currentPlayerMove);
//     gameContainer.appendChild(gameGrid);
//   }
// })();