# odin-tic-tac-toe

A simple browser-based implementation of Tic-Tac-Toe game, built using **HTML**, **CSS**, and **JavaScript**. This project follows the module pattern and is designed with minimal global scope usage as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Features

- 2-player mode (enter custom names)
- Dynamic gameboard rendering
- Win, tie, and score tracking
- Scoreboard that updates after each round
- Game restart functionality
- Modular architecture using IIFEs and factory functions

## Architecture

The project is built using the **Module Pattern** to encapsulate logic and limit global scope.

### `gameBoard` (Module)
Manages the internal game state as an array. Responsible for:
- Placing marks
- Returning the board state
- Resetting the board

### `createPlayer` (Factory Function)
Creates a player object with:
- Name
- Marker (X or O)
- Score handling

### `gameController` (Module)
Controls the flow of the game:
- Keeps track of whose turn it is
- Checks for wins or ties
- Updates scores
- Resets game state

### `displayController` (Module)
Handles all DOM-related logic:
- Renders the game board
- Updates score display
- Manages player inputs
- Displays game result messages