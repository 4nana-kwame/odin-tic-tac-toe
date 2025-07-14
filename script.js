const GameStart = (function () {
  const startBtn = document.querySelector('#start');
  const heading = document.querySelector('h1');
  const gameContainer = document.querySelector('.game-container');
  const scoreBoard = document.querySelector('.score-board');
  const player1 = document.querySelector('#player1');
  const player2 = document.querySelector('#player2');
  const playerDisplayName1 = document.querySelector('#p1');
  const playerDisplayName2 = document.querySelector('#p2');

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
    const resetBtn = document.createElement('button');
    const currentPlayerMove = document.createElement('div');
    currentPlayerMove.textContent = `${player1.value}'s move.`;
    resetBtn.id = 'start';
    resetBtn.textContent = 'Reset';
    const gameGrid = document.createElement('div');
    gameGrid.classList.add('game-grid');

    for (let i = 0; i < 9; i++) {
      const gridTile = document.createElement('div');
      gridTile.classList.add('grid-tile');
      gridTile.classList.add('grid-text');

      gridTile.addEventListener('click', markTile);

      function markTile() {
        const status = playerMarker.changeStatus();

        if (!status) {
          gridTile.textContent = playerMarker.player1;
          gridTile.style.color = '#830564';
          gridTile.style.pointerEvents = 'none';
          currentPlayerMove.textContent = `${player2.value}'s turn.`;
        } else {
          gridTile.textContent = playerMarker.player2;
          gridTile.style.color = '#167004';
          gridTile.style.pointerEvents = 'none';
          currentPlayerMove.textContent = `${player1.value}'s turn.`;
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