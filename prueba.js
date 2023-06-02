const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = ' ';

// Node class representing a game state
class Node {
  constructor(board, player) {
    this.board = board;
    this.player = player;
    this.children = [];
  }
}

// The main minimax function
function minimax(node, depth, maximizingPlayer) {
  // Base cases - check for terminal states
  const winner = checkWinner(node.board);
  if (winner === PLAYER_X) {
    return -1;
  }
  if (winner === PLAYER_O) {
    return 1;
  }
  if (isBoardFull(node.board)) {
    return 0;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (node.board[i] === EMPTY) {
        const childBoard = [...node.board];
        childBoard[i] = node.player;
        const childNode = new Node(childBoard, getOpponent(node.player));
        node.children.push(childNode);
        const eval = minimax(childNode, depth + 1, false);
        maxEval = Math.max(maxEval, eval);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (node.board[i] === EMPTY) {
        const childBoard = [...node.board];
        childBoard[i] = node.player;
        const childNode = new Node(childBoard, getOpponent(node.player));
        node.children.push(childNode);
        const eval = minimax(childNode, depth + 1, true);
        minEval = Math.min(minEval, eval);
      }
    }
    return minEval;
  }
}

// Function to find the best move using the minimax algorithm
function findBestMove(board) {
  const rootNode = new Node(board, PLAYER_O);
  minimax(rootNode, 3, true);

  let bestEval = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < rootNode.children.length; i++) {
    const childNode = rootNode.children[i];
    const eval = minimax(childNode, 0, false);

    if (eval > bestEval) {
      bestEval = eval;
      bestMove = i;
    }
  }

  console.log(rootNode.board)
  for(let i = 0; i<rootNode.children.length;i++){
    console.log(rootNode.children[i].board)
  }

  return bestMove;
}

// Function to check if the board is full
function isBoardFull(board) {
  return !board.includes(EMPTY);
}

// Function to check for a winner
function checkWinner(board) {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    return null;
  }

// Function to get the opponent player
function getOpponent(player) {
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
}

// Example usage
const board = [
  'X', 'O', 'X',
  ' ', 'O', ' ',
  ' ', ' ', ' '
];

const bestMove = findBestMove(board);
console.log('Best move:', bestMove);
