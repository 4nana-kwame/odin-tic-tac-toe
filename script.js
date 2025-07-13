const GameStart = (function () {
  const startBtn = document.querySelector('#start');
  const heading = document.querySelector('h1');
  const gameContainer = document.querySelector('.game-container');
  const scoreBoard = document.querySelector('.score-board');
  const player1 = document.querySelector('#player1');
  const player2 = document.querySelector('#player2');
  const playerDisplayName1 = document.querySelector('#p1');
  const playerDisplayName2 = document.querySelector('#p2');

  startBtn.addEventListener('click', startGame);

  function startGame() {
    gameContainer.innerHTML = '';
    const resetBtn = document.createElement('button');
    const currentPlayerMove = document.createElement('div');
    currentPlayerMove.textContent = 'Placeholder';
    resetBtn.id = 'start';
    resetBtn.textContent = 'Reset';
    const gameGrid = document.createElement('div');
    gameGrid.classList.add('game-grid');

    for (let i = 0; i < 9; i++) {
      const gridTile = document.createElement('div');
      gridTile.classList.add('grid-tile');

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