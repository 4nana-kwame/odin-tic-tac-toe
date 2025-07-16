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
  let playerInstance1;
  let playerInstance2;

  function init(p1, p2) {
    playerInstance1 = p1;
    playerInstance2 = p2;
  }

  let playerTurn = false;
  let isGameOver = false;
  let winner;

  function getCurrentPlayer() {
    return playerTurn ? playerInstance2 : playerInstance1;
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
        if (board[a] === playerInstance1.marker) {
          playerInstance1.incrementScore();
          winner = `${playerInstance1.playerName} wins! 🎉`;
          isGameOver = true;
        } else if (board[a] === playerInstance2.marker) {
          playerInstance2.incrementScore();
          winner = `${playerInstance2.playerName} wins! 🎉`;
          isGameOver = true;
        }
      }
    }

    const fullBoard = board.every(item => item !== null);

      if (fullBoard && !isGameOver) {
        incrementTieScore();
        winner = 'Tie!';
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
      player1: playerInstance1.getScore(),
      player2: playerInstance2.getScore(),
      tie: getTieScore()
    };
  }

  function getWinner() {
    return winner;
  }

  function resetGame() {
    gameBoard.resetBoard();

    winner = null;
    playerTurn = false;
    isGameOver = false;
  }

  return {
    init,
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
  let player1;
  let player2;

  const gameContainer = document.querySelector('.game-container');
  const heading = document.querySelector('h1');
  const player1Input = document.querySelector('#player1');
  const player2Input = document.querySelector('#player2');
  const startBtn = document.querySelector('#start');
  const scoreBoard = document.querySelector('.score-board');
  const p1 = document.querySelector('#p1');
  const p2 = document.querySelector('#p2');

  const resetBtn = document.createElement('button');
  resetBtn.id = 'start';
  resetBtn.textContent = 'Play Again';
  const gameGrid = document.createElement('div');
  gameGrid.className = 'game-grid';
  const displayCurrentPlayer = document.createElement('div');

  startBtn.addEventListener('click', startGame);

  function startGame() {
    gameContainer.innerHTML = '';

    if (!player1 || !player2) {
      const player1Value = player1Input.value || 'Player 1';
      const player2Value = player2Input.value || 'Player 2';

      player1 = createPlayer(player1Value, 'X');
      player2 = createPlayer(player2Value, 'O');

      p1.textContent = player1Value;
      p2.textContent = player2Value;
    }

    gameController.init(player1, player2);

    displayCurrentPlayer.textContent = `${player1.playerName}'s turn`;

    function getIndexAndPlay(event) {
      const markTarget = event.target;
      const target = parseInt(event.target.dataset.index);

      gameController.getCurrentPlayer();

      markTarget.textContent = gameController.getCurrentPlayer().marker;
      markTarget.style.pointerEvents = 'none';

      if (markTarget.textContent === 'X') {
        markTarget.style.color = '#830564';
      } else {
        markTarget.style.color = '#167004';
      }

      gameController.playRound(target);

      if (!gameController.getIsGameOver()) {
        displayCurrentPlayer.textContent = `${gameController.getCurrentPlayer().playerName}'s turn`;
      } else {
        displayCurrentPlayer.textContent = gameController.getWinner();

        const tiles = document.querySelectorAll('.grid-tile');

        tiles.forEach(tile => {
          tile.style.pointerEvents = 'none';
        });
      }

      const scores = gameController.getScores();
      document.querySelector('.score1').textContent = scores.player1;
      document.querySelector('.score2').textContent = scores.player2;
      document.querySelector('.tie-score').textContent = scores.tie;
    }

    for (let i = 0; i < 9; i++) {
      const tile = document.createElement('div');
      tile.classList.add('grid-tile', 'grid-text');
      tile.setAttribute('data-index', i);

      tile.addEventListener('click', getIndexAndPlay);

      gameGrid.appendChild(tile);
    }

    gameContainer.append(
      heading,
      resetBtn,
      scoreBoard,
      displayCurrentPlayer,
      gameGrid
    );
  }

  function reset() {
    gameController.resetGame();

    gameGrid.innerHTML = '';

    startGame();
  }

  resetBtn.addEventListener('click', reset);
})();