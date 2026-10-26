const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

function updateStatus(message) {
  statusText.textContent = message;
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }

  if (board.every((cell) => cell !== '')) {
    return { winner: 'draw', combo: null };
  }

  return null;
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (!gameActive || board[index] || cell.disabled) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const result = checkWinner();

  if (result) {
    gameActive = false;

    if (result.winner === 'draw') {
      updateStatus("It's a draw!");
    } else {
      updateStatus(`Player ${result.winner} wins!`);
    }

    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o');
  });

  updateStatus("Player X's turn");
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

updateStatus("Player X's turn");
