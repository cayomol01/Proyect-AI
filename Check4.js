const numRows = 6;
const numCols = 7;

const my_value = 1
const not_my_val = 2

function checkSequence(array, value, count) {
  let repetitionCount = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      repetitionCount++;
      
      if (repetitionCount === count) {
        return true;
      }
    } else {
      repetitionCount = 0;
    }
  }
  
  return false;
}


function hasSequence(board, value, count) {
  // Check diagonals
  for (let row = 0; row < numRows - 3; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      const diagonal = [
        board[row][col],
        board[row + 1][col + 1],
        board[row + 2][col + 2],
        board[row + 3][col + 3]
      ];
      
      if (checkSequence(diagonal, value, count)) {

        return true;
      }
      
      const reverseDiagonal = [
        board[row][col + 3],
        board[row + 1][col + 2],
        board[row + 2][col + 1],
        board[row + 3][col]
      ];
      
      if (checkSequence(reverseDiagonal,value, count)) {
        return true;
      }
    }
  }
  
  // Check horizontally
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      const horizontal = [
        board[row][col],
        board[row][col + 1],
        board[row][col + 2],
        board[row][col + 3]
      ];
      
      if (checkSequence(horizontal,value, count)) {
        return true;
      }
    }
  }
  
  // Check vertically
  for (let row = 0; row < numRows - 3; row++) {
    for (let col = 0; col < numCols; col++) {
      const vertical = [
        board[row][col],
        board[row + 1][col],
        board[row + 2][col],
        board[row + 3][col]
      ];
      
      if (checkSequence(vertical, value, count)) {
        return true;
      }
    }
  }
  
  return false;
}



class Node{
  constructor(board,maximizingPlayer, depth){
      this.board = board
      this.value = null
      this.children = []
      this.maximizingPlayer = maximizingPlayer
      this.depth = depth
      this.move = null
  }

}

function isColumnFull(board, columnIndex) {
  for (let row = 0; row < board.length; row++) {
    if (board[row][columnIndex] === 0) {
      return false; // Found an empty cell, column is not full
    }
  }
  return true; // All cells in the column are non-empty, column is full
}

function Available(board){
  let available_moves = []
  for(let i = 0; i<numCols;i++){
      if(isColumnFull(board,i)==false){
        available_moves.push(i)
      }
  }
  return available_moves
}

function checkWinner(board, symbol){

  //checkrows
  for(let i = 0; i<board.length;i++){
      if (board[i][0]==symbol && board[i][1]==symbol && board[i][2]==symbol){
          return true

      }
  }

  //Check columns
  for(let i = 0; i<board.length;i++){
      if (board[0][i]==symbol && board[1][i]==symbol && board[2][i]==symbol){
          return true
      }

  }

  //Negatively sloped diagonal
  if (board[0][0]==symbol && board[1][1]==symbol && board[2][2]==symbol){
      return true
  }

  if (board[2][0]==symbol && board[1][1]==symbol && board[0][2]==symbol){
      return true
  }

  return false


}


function AvailablePos(board, col){
  for(let i = 0; i<board.length; i++){
    if(board[i][col]!==0){
      if (i!==0){
        return i-1
      }
      else{
        return -1
      }
    }
    else{
      return i
    }
  }
}

function countConnectedChips(array, row, column, value) {
  const numRows = array.length;
  const numColumns = array[0].length;
  const targetChip = value;

  if (targetChip === undefined) {
    return 0; // Invalid move position
  }

  let count = 0;

  // Check vertically
  let r = row - 1;
  while (r >= 0 && array[r][column] === targetChip) {
    count++;
    r--;
  }

  r = row + 1;
  while (r < numRows && array[r][column] === targetChip) {
    count++;
    r++;
  }

  // Check horizontally
  let c = column - 1;
  while (c >= 0 && array[row][c] === targetChip) {
    count++;
    c--;
  }

  c = column + 1;
  while (c < numColumns && array[row][c] === targetChip) {
    count++;
    c++;
  }

  // Check diagonally down (top-left to bottom-right)
  r = row - 1;
  c = column - 1;
  while (r >= 0 && c >= 0 && array[r][c] === targetChip) {
    count++;
    r--;
    c--;
  }

  r = row + 1;
  c = column + 1;
  while (r < numRows && c < numColumns && array[r][c] === targetChip) {
    count++;
    r++;
    c++;
  }

  // Check diagonally up (bottom-left to top-right)
  r = row + 1;
  c = column - 1;
  while (r < numRows && c >= 0 && array[r][c] === targetChip) {
    count++;
    r++;
    c--;
  }

  r = row - 1;
  c = column + 1;
  while (r >= 0 && c < numColumns && array[r][c] === targetChip) {
    count++;
    r--;
    c++;
  }

  return count;
}


function Heuristic(board, value){
  let h = 0;
  let m = 1
  if (value!=my_value){
    m=-1
  }
  if(hasSequence(board, value, 2)){
    h = 0.1*m
  }
  if(hasSequence(board, value, 2)){
    h =  0.3*m
  }
  if(hasSequence(board, value, 3)){
    h = 0.9*m
  }
  if(hasSequence(board, value, 4)){
    h = 1.0*m
  }
}

function isTerminal(board){
  function Heuristic(board, value){
    let h = 0;
    let m = 1
    if (value!=my_value){
      m=-1
    }
    if(hasSequence(board, value, 2)){
      h = 0.1*m
    }
    if(hasSequence(board, value, 2)){
      h =  0.3*m
    }
    if(hasSequence(board, value, 3)){
      h = 0.9*m
    }
    if(hasSequence(board, value, 4)){
      h = 1.0*m
    }
  }
  if(Heuristic(board, my_value)==1 || Heuristic(board, not_my_val)==1){
    return true
  }
  if(Available(board).length == 0){
      return true
  }
  return false
}


function makeMove(board, row, column, symbol){
  console.log(board)
  console.log(row)
  console.log(column)
  board[row][column]= symbol
}


function minmax(node, depth, alpha, beta, maximizingPlayer){
  if (isTerminal(node.board) || depth==0){
      node.value = Heuristic(node.board)
      return  Heuristic(node.board)
  }
  if (maximizingPlayer){
      let value = -Infinity
      for(let i = 0; i<Available(node.board).length;i++){
          let b_copy = []


          for(let i = 0; i<node.board.length; i++){
              b_copy.push([])
              for(let j = 0; j<node.board[i].length; j++){
                  b_copy[i].push(node.board[i][j])
                  
              }
          }


          let b = Available(node.board)[i]

          console.log(b)

          makeMove(b_copy, AvailablePos(b_copy, b), b, my_value)

          let new_node = new Node(b_copy, false, node.depth+1)
          new_node.move = b

          /*  console.log("\nMaximizing")
          for(let i = 0; i<new_node.board.length;i++){
              console.log(new_node.board[i])
          } */


          value = Math.max(value, minmax(new_node, depth-1, alpha, beta, false))
          alpha = Math.max(alpha, value)

          if(alpha>=beta){
              break
          }

          node.children.push(new_node)


      }
      
      node.value = value
      return value
  }
  else{

      let value = Infinity
      for(let i = 0; i<Available(node.board).length;i++){

          let b_copy = []

          for(let i = 0; i<node.board.length; i++){
              b_copy.push([])
              for(let j = 0; j<node.board[i].length; j++){
                  b_copy[i].push(node.board[i][j])
                  
              }
          }

          let a =  Available(b_copy)[i][0]
          let b =  Available(b_copy)[i][1]

          makeMove(b_copy, AvailablePos(b_copy, b), b, not_my_val)



          makeMove(b_copy, AvailablePos(b_copy, b), b, not_my_val)

          let new_node = new Node(b_copy, true, node.depth+1)
          /* console.log("\nMinimizing")
          for(let i = 0; i<new_node.board.length;i++){
              console.log(new_node.board[i])
          }
*/
          value = Math.min(value, minmax(new_node, depth-1, alpha, beta, true))
          beta = Math.min(alpha, value)

          if(beta<=alpha){
              break
          }
          node.children.push(new_node)


      }
      node.value = value
      return value
  }
}

let count = 1
function FindBest(board, value){
  let moves = [];
  let move;
  if(count==0){
    move = 3
    count+=1
    return move
  }
  let root = new Node(board, true, 0)
  value = minmax(root, 2,  -Infinity,Infinity, true)
  console.log(value)

  //console.log("ccccc")
  //console.log(root.children.length)
  //console.log(root.children)
  let children = [...root.children]
  for(let i = 0; i< children.length; i++){
      if(children[i].value == value){
          move.push(children[i].move)
      }
  }
  let randomIndex = Math.floor(Math.random() * array.length);
  move = moves[randomIndex]
  
   while(stack.length !== 0){
      let lookat = stack.pop()
      console.log(lookat.depth)
      console.log(lookat.value)
      console.log(lookat.maximizingPlayer)
      console.log(lookat.move)
      lookat.board.forEach(element => {
          console.log(element)
      });
      console.log("")
      if (lookat){
          stack.push(...lookat.children)
      }
  }
  return move
  
}
const board = [
  [0, 0, 0, 0, 0, 0 ,0],
  [0, 0, 0, 0, 0, 0 ,0],
  [0, 0, 0, 0, 0, 0 ,0],
  [0, 0, 0, 0, 0, 0 ,0],
  [0, 0, 0, 1, 2, 0 ,0],
  [0, 0, 1, 2, 2, 0 ,0],
]



console.log(FindBest(board, 1))



/* let count = 0
let game = true
while(game){
  let ai = FindBest(board)
  console.log(ai)
  board[ai[0]][ai[1]]="O"

  console.log("AI moved: ", ai)
  board.forEach(element => {
      console.log(element)
  });

  if (Heuristic(board)==1){
      console.log("AI WON!")
      break;
  }
  else if(Heuristic(board)==0){
      console.log("TIE!")
      break;
  }

  my_move1 = Math.floor(Math.random() *3)
  my_move2 = Math.floor(Math.random() *3)

  while(availablePos(board, [my_move1, my_move2])==false){
      my_move1 = Math.floor(Math.random() *3)
      my_move2 = Math.floor(Math.random() *3) 
  }



  board[count][2] = "X"
  count+=1

  console.log("Me moved: ", [my_move1, my_move2])
  board.forEach(element => {
      console.log(element)
  });


  if (Heuristic(board)==-1){
      console.log("ME WON!")
      break;
  }
  else if(Heuristic(board)==0){
      console.log("TIE!")
      break;
  }


}

 */