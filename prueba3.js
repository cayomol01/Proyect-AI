import { hasSequence4 } from "./Check4";

// Example usage
const board = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'X', 'X', 'X', 'X', ' '],
    [' ', ' ', ' ', 'O', 'O', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ];
  
  const hasSequence = hasSequence4(board);
  console.log('Has sequence of 4:', hasSequence);
  