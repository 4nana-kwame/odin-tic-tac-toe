const GameStart = (function () {
  const startBtn = document.querySelector('#start');
  const heading = document.querySelector('h1');
  const gameContainer = document.querySelector('.game-container');
  const scoreBoard = document.querySelector('.score-board');
  const player1 = document.querySelector('#player1');
  const player2 = document.querySelector('#player2');
  const playerDisplayName1 = document.querySelector('#p1');
  const playerDisplayName2 = document.querySelector('#p2');
  const playerScore1 = document.querySelector('.score1');
  const playerScore2 = document.querySelector('.score2');
  const tieScore = document.querySelector('.tie-score');

  const playerMarker = {
    player1: 'X',
    player2: 'O',
    status: true,
    changeStatus() {
      return this.status = !this.status;
    }
  }

  startBtn.addEventListener('click', startGame);

  function startGame() {
    gameContainer.innerHTML = '';
    let gameOver = false;
    let gameResult;
    let scoreCount = 0;
    const resetBtn = document.createElement('button');
    const currentPlayerMove = document.createElement('div');
    currentPlayerMove.textContent = `${player1.value}'s move.`;
    resetBtn.id = 'start';
    resetBtn.textContent = 'Reset';
    const gameGrid = document.createElement('div');
    gameGrid.classList.add('game-grid');

    const winningCombos = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
          [0, 4, 8], [2, 4, 6] // diagonals
        ];
      const gameBoard = [null, null, null, null, null, null, null, null, null];

    for (let i = 0; i < 9; i++) {
      const gridTile = document.createElement('div');
      gridTile.classList.add('grid-tile');
      gridTile.classList.add('grid-text');
      gridTile.setAttribute('data-index', i);

      gridTile.addEventListener('click', markTileAndCheckWinner);

      function markTileAndCheckWinner() {
        const status = playerMarker.changeStatus();
        const tileIndex = parseInt(gridTile.dataset.index);

        if (!status) {
          gridTile.textContent = playerMarker.player1;
          gridTile.style.color = '#830564';
          gridTile.style.pointerEvents = 'none';
          currentPlayerMove.textContent = `${player2.value}'s turn.`;
          gameBoard[tileIndex] = playerMarker.player1;
        } else {
          gridTile.textContent = playerMarker.player2;
          gridTile.style.color = '#167004';
          gridTile.style.pointerEvents = 'none';
          currentPlayerMove.textContent = `${player1.value}'s turn.`;
          gameBoard[tileIndex] = playerMarker.player2;
        }

        for (let i = 0; i < winningCombos.length; i++) {
          const gridTiles = document.querySelectorAll('.grid-tile');

          let combo = winningCombos[i];
          const [a, b, c] = combo;
          
          if (
            gameBoard[a] !== null &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
          ) {
            if (gameBoard[a] === playerMarker.player1) {
              gameResult = `${player1.value} wins! 🎉`;
              currentPlayerMove.textContent = gameResult;
              scoreCount++;
              playerScore1.textContent = scoreCount;
            } else if (gameBoard[a] === playerMarker.player2) {
              gameResult = `${player2.value} wins! 🎉`;
              currentPlayerMove.textContent = gameResult;
              scoreCount++;
              playerScore2.textContent = scoreCount;
            }

            gameOver = true;

            for (let gridTile of gridTiles) {
              gridTile.style.pointerEvents = 'none';
            }
          }
        }

        function checkNull(isNull) {
          return isNull !== null;
        }

        const noNull = gameBoard.every(checkNull);

        if (!gameOver && noNull) {
          gameResult = `It's a tie`;
          currentPlayerMove.textContent = gameResult;
          scoreCount++;
          tieScore.textContent = scoreCount;
        }
      }

      gameGrid.appendChild(gridTile);
    }

    playerDisplayName1.textContent = player1.value;
    playerDisplayName2.textContent = player2.value;

    gameContainer.appendChild(heading);
    gameContainer.appendChild(resetBtn);
    gameContainer.appendChild(scoreBoard);
    gameContainer.appendChild(currentPlayerMove);
    gameContainer.appendChild(gameGrid);
  }
})();