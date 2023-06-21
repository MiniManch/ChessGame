// Move Piece by dragging & Set piece images.
const pieces = document.querySelectorAll('.piece');
const squares = document.querySelectorAll('.square');
let board = [
  //  a       b       c       d       e       f       g       h
  [
    { color: 'black', piece: 'rook' }, { color: 'black', piece: 'knight' }, { color: 'black', piece: 'bishop' }, { color: 'black', piece: 'queen' }, { color: 'black', piece: 'king' }, { color: 'black', piece: 'bishop' }, { color: 'black', piece: 'knight' }, { color: 'black', piece: 'rook' }
  ], // 8
  [
    { color: 'black', piece: 'pawn' }, { color: 'black', piece: 'pawn' }, { color: 'black', piece: 'pawn' }, { color: 'black', piece: 'pawn' }, { color: 'black', piece: 'pawn' }, { color: 'black', piece: 'pawn' }, { color: 'black', piece: 'pawn' }, { color: 'black', piece: 'pawn' }
  ], // 7
  [
    { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }
  ], // 6
  [
    { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }
  ], // 5
  [
    { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }
  ], // 4
  [
    { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }, { color: null, piece: null }
  ], // 3
  [
    { color: 'white', piece: 'pawn' }, { color: 'white', piece: 'pawn' }, { color: 'white', piece: 'pawn' }, { color: 'white', piece: 'pawn' }, { color: 'white', piece: 'pawn' }, { color: 'white', piece: 'pawn' }, { color: 'white', piece: 'pawn' }, { color: 'white', piece: 'pawn' }
  ], // 2
  [
    { color: 'white', piece: 'rook' }, { color: 'white', piece: 'knight' }, { color: 'white', piece: 'bishop' }, { color: 'white', piece: 'queen' }, { color: 'white', piece: 'king' }, { color: 'white', piece: 'bishop' }, { color: 'white', piece: 'knight' }, { color: 'white', piece: 'rook' }
  ]  // 1
];


function setDragAndPieces(){
    for (piece of pieces){
        piece.setAttribute('draggable','true')
        piece.addEventListener('dragstart',dragStart)

        // Set image src based on the piece and color 
        if (piece.classList.contains('pawn')){
            if (piece.classList.contains('black')){
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png';
            }
            else{
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png';
            }
        }

        if  (piece.classList.contains('bishop')){
            if (piece.classList.contains('black')){
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png';
            }
            else{
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png';
            }
        }

        if (piece.classList.contains('knight')){
            if (piece.classList.contains('black')){
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png';
            }
            else{
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png';
            }
        }

        if  (piece.classList.contains('rook')){
            if(piece.classList.contains('black')){
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png';
            }
            else{
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png';   
            }
        }

         if (piece.classList.contains('king')){
            if(piece.classList.contains('black')){
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png';
            }
            else{
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png';
            }
        }

         if (piece.classList.contains('queen')){
            if (piece.classList.contains('black')){
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png';
            }
            else{
                piece.src = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png';

            }
        }
    }
}

// Dragging Functions

squares.forEach(square => {
    square.addEventListener('drop',dragDrop);
    square.addEventListener('dragover',dragOver)
});

let draggedPiece
let turn = 'white';

function dragStart(e){
    draggedPiece = (e.target)
}

function dragDrop(e){
    let droppedOnSquare = e.target;
    if (checkIfMoveLegit(droppedOnSquare,draggedPiece,board)){
        if (draggedPiece != null && draggedPiece != droppedOnSquare){
            turn = getOpponentColor(turn)
        }
    }
}

function dragOver(e){
    e.preventDefault()
}

// Checker if move can be done
 // Add the capturing part into the dragDrop funciton
function checkIfMoveLegit(squareTo,piece,board){
    // Check if its this colors turn
    if (turn != piece.classList[1]){
        return false;
    }

    // Check if piece it was dropped on is same color
    if (squareTo.classList.contains('piece') && squareTo.classList[1] == piece.classList[1]){
        return false
    }

    // Get current Position and possible moves from that position
    pieceName = piece.classList[2];
    position = piece.parentElement.id;
    let moveList = calculateLegalMoves(pieceName,position,board);

    if (squareTo.id && moveList.includes(squareTo.id)){
        let row = 8 - parseInt(squareTo.id[1]);
        let col = squareTo.id.charCodeAt(0) - 'a'.charCodeAt(0);
        let  old_row = 8 - parseInt(piece.parentElement.id[1]);
        let old_col = piece.parentElement.id.charCodeAt(0) - 'a'.charCodeAt(0);

        // Change board
        // Add to new position
        board[row][col].color = piece.classList[1];
        board[row][col].piece = piece.classList[2];

        // remove from last position
        board[old_row][old_col].color = null
        board[old_row][old_col].piece = null

        squareTo.append(piece);
        console.log(board)

        return true
    }
    else if(moveList.includes(squareTo.parentElement.id && squareTo.parentElement.id)){
         console.log('this is trying to take with a pawn')
        const row = 8 - parseInt(squareTo.parentElement.id[1]);
        const col = squareTo.parentElement.id.charCodeAt(0) - 'a'.charCodeAt(0);
        let  old_row = 8 - parseInt(piece.parentElement.id[1]);
        let old_col = piece.parentElement.id.charCodeAt(0) - 'a'.charCodeAt(0);

        // Add to new position
        board[row][col].color = piece.classList[1]
        board[row][col].piece = piece.classList[2]

        // remove from last position
        board[old_row][old_col].color=null
        board[old_row][old_col].piece = null

        // Remove from display
        squareTo.parentElement.append(piece)
        squareTo.remove()
        console.log(board)

        return true

    }  

}

function getOpponentColor(currentColor) {
  return currentColor === 'white' ? 'black' : 'white';
}


// Get piece by class,  understand its possible moves, check which ones are possible!
function calculateLegalMoves(piece, currentPosition, board) {
  const row = 8 - parseInt(currentPosition[1]);
  const col = currentPosition.charCodeAt(0) - 'a'.charCodeAt(0);
  const currentColor = board[row][col].color;
  const opponentColor = getOpponentColor(currentColor);
  let legalMoves = [];

  if (piece === 'pawn') {
    // Pawn moves
    const direction = (currentColor === 'white') ? -1 : 1;
    const initialRow = (currentColor === 'white') ? 6 : 1;

    // Move one step forward if the square is empty
    if (row + direction >= 0 && row + direction < 8 && board[row + direction][col].piece === null) {
      legalMoves.push([row + direction, col]);
    }

    // Move two steps forward if it's the pawn's initial move and the squares are empty
    if (row === initialRow && board[row + direction][col].piece === null && board[row + (2 * direction)][col].piece === null) {
      legalMoves.push([row + (2 * direction), col]);
    }

    console.log(currentColor,opponentColor)
        // Capture diagonally if there is an opponent's piece
    if (col - 1 >= 0 && row + direction >= 0 && row + direction < 8) {
      const leftCapture = board[row + direction][col - 1];
      console.log('left',leftCapture)
      if (leftCapture.piece !== null && leftCapture.color === opponentColor) {
        legalMoves.push([row + direction, col - 1]);
      }
    }
    if (col + 1 < 8 && row + direction >= 0 && row + direction < 8) {
      const rightCapture = board[row + direction][col + 1];
      console.log('right',rightCapture)

      if (rightCapture.piece !== null && rightCapture.color === opponentColor) {
        console.log('heyo1')
        legalMoves.push([row + direction, col + 1]);
      }
    }

  } else if (piece === 'knight') {
    // Knight moves
    const moves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1]
    ];
    for (const move of moves) {
      const newRow = row + move[0];
      const newCol = col + move[1];
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (board[newRow][newCol].piece === null || board[newRow][newCol].color === opponentColor) {
          legalMoves.push([newRow, newCol]);
        }
      }
    }
  } else if (piece === 'bishop') {
    // Bishop moves
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ];
    for (const direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];
      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const targetPiece = board[newRow][newCol].piece;
        if (targetPiece === null) {
          legalMoves.push([newRow, newCol]);
        } else if (board[newRow][newCol].color === opponentColor) {
          legalMoves.push([newRow, newCol]);
          break; // Stop searching in this direction after capturing a piece
        } else {
          break; // Stop searching in this direction if a piece of the same color is encountered
        }
        newRow += direction[0];
        newCol += direction[1];
      }
    }
  } else if (piece === 'rook') {
    // Rook moves
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    for (const direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];
      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const targetPiece = board[newRow][newCol].piece;
        if (targetPiece === null) {
          legalMoves.push([newRow, newCol]);
        } else if (board[newRow][newCol].color === opponentColor) {
          legalMoves.push([newRow, newCol]);
          break; // Stop searching in this direction after capturing a piece
        } else {
          break; // Stop searching in this direction if a piece of the same color is encountered
        }
        newRow += direction[0];
        newCol += direction[1];
      }
    }
  } else if (piece === 'queen') {
    // Queen moves
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ];
    for (const direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];
      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const targetPiece = board[newRow][newCol].piece;
        if (targetPiece === null) {
          legalMoves.push([newRow, newCol]);
        } else if (board[newRow][newCol].color === opponentColor) {
          legalMoves.push([newRow, newCol]);
          break; // Stop searching in this direction after capturing a piece
        } else {
          break; // Stop searching in this direction if a piece of the same color is encountered
        }
        newRow += direction[0];
        newCol += direction[1];
      }
    }
  } else if (piece === 'king') {
    // King moves
    const moves = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    for (const move of moves) {
      const newRow = row + move[0];
      const newCol = col + move[1];
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (board[newRow][newCol].piece === null || board[newRow][newCol].color === opponentColor) {
          legalMoves.push([newRow, newCol]);
        }
      }
    }
  }

  legalMoves = legalMoves.map(move => String.fromCharCode(move[1] + 'a'.charCodeAt(0)) + (8 - move[0]));

  return legalMoves;
}




// function calculateLegalMoves(piece, currentPosition, board) {
//     console.log(currentPosition)
//   let col = currentPosition.charAt(0).charCodeAt(0) - 97;
//   let row = 8 - parseInt(currentPosition[1], 10);
//   let legalMoves = [];

//   if (isNaN(col) || col < 0 || col >= 8 || isNaN(row) || row < 0 || row >= 8) {
//     console.log(col)
//     console.log(row)
//     console.log('Invalid position');
//     return legalMoves;
//   }

//   if (piece === 'pawn') {
//     const direction = (currentColor === 'white') ? -1 : 1; // Determine the forward direction based on the color
//     const initialRow = (currentColor === 'white') ? 6 : 1; // Determine the initial row for the pawn based on the color

//     // Move one step forward if the square is empty
//     if (row + direction >= 0 && row + direction < 8 && board[row + direction][col].color === null) {
//       legalMoves.push([row + direction, col]);
//     }

//     // Move two steps forward if it's the pawn's initial move and the squares are empty
//     if (row === initialRow && board[row + direction][col].color === null && board[row + (2 * direction)][col].color === null) {
//       legalMoves.push([row + (2 * direction), col]);
//     }

//     // Capture diagonally if there is an opponent's piece
//     if (col - 1 >= 0 && board[row + direction][col - 1].color === getOpponentColor(currentColor)) {
//       legalMoves.push([row + direction, col - 1]);
//     }
//     if (col + 1 < 8 && board[row + direction][col + 1].color === getOpponentColor(currentColor)) {
//       legalMoves.push([row + direction, col + 1]);
//     }
//   } else if (piece === 'knight') {
//     // Knight moves
//     const moves = [
//       [-2, -1],
//       [-2, 1],
//       [-1, -2],
//       [-1, 2],
//       [1, -2],
//       [1, 2],
//       [2, -1],
//       [2, 1]
//     ];
//     for (const move of moves) {
//       const newRow = row + move[0];
//       const newCol = col + move[1];
//       if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
//         if (board[newRow][newCol].color !== currentColor) {
//           legalMoves.push([newRow, newCol]);
//         }
//       }
//     }
//   } else if (piece === 'bishop') {
//     // Bishop moves
//     const directions = [
//       [1, 1],
//       [1, -1],
//       [-1, 1],
//       [-1, -1]
//     ];
//     for (const direction of directions) {
//       let newRow = row + direction[0];
//       let newCol = col + direction[1];
//       while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
//         if (board[newRow][newCol].color === currentColor) {
//           break;
//         }
//         legalMoves.push([newRow, newCol]);
//         if (board[newRow][newCol].color !== null) {
//           break;
//         }
//         newRow += direction[0];
//         newCol += direction[1];
//       }
//     }
//   } else if (piece === 'rook') {
//     // Rook moves
//     const directions = [
//       [1, 0],
//       [-1, 0],
//       [0, 1],
//       [0, -1]
//     ];
//     for (const direction of directions) {
//       let newRow = row + direction[0];
//       let newCol = col + direction[1];
//       while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
//         if (board[newRow][newCol].color === currentColor) {
//           break;
//         }
//         legalMoves.push([newRow, newCol]);
//         if (board[newRow][newCol].color !== null) {
//           break;
//         }
//         newRow += direction[0];
//         newCol += direction[1];
//       }
//     }
//   } else if (piece === 'queen') {
//     // Queen moves
//     const directions = [
//       [1, 0],
//       [-1, 0],
//       [0, 1],
//       [0, -1],
//       [1, 1],
//       [1, -1],
//       [-1, 1],
//       [-1, -1]
//     ];
//     for (const direction of directions) {
//       let newRow = row + direction[0];
//       let newCol = col + direction[1];
//       while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
//         if (board[newRow][newCol].color === currentColor) {
//           break;
//         }
//         legalMoves.push([newRow, newCol]);
//         if (board[newRow][newCol].color !== null) {
//           break;
//         }
//         newRow += direction[0];
//         newCol += direction[1];
//       }
//     }
//   } else if (piece === 'king') {
//     // King moves
//     const moves = [
//       [-1, -1],
//       [-1, 0],
//       [-1, 1],
//       [0, -1],
//       [0, 1],
//       [1, -1],
//       [1, 0],
//       [1, 1]
//     ];
//     for (const move of moves) {
//       const newRow = row + move[0];
//       const newCol = col + move[1];
//       if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
//         if (board[newRow][newCol].color !== currentColor) {
//           legalMoves.push([newRow, newCol]);
//         }
//       }
//     }
//   }

//   legalMoves = legalMoves.map(move => String.fromCharCode(move[1] + 'a'.charCodeAt(0)) + (8 - move[0]));
//   console.log('aftermove',board)
//   return legalMoves;
// }


// Checker of if pin, or if stalemate, or if checkmate

// Timer change on turn change

// Switch sides button before game starts

const switchButton = document.getElementById('switchButton');

let isSwitchedOn = false;

document.getElementById('switchButton').addEventListener('click', function() {

    isSwitchedOn = !isSwitchedOn;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            // Get the color of the current square
            const color = board[i][j].color;

            // Flip the color of the square
            if (color === 'white') {
                board[i][j].color = 'black';
            } else if (color === 'black') {
                board[i][j].color = 'white';
            }
        }
    }


    var pieces = document.getElementsByClassName('piece');

    for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].classList.contains('white')) {
            pieces[i].classList.remove('white');
            pieces[i].classList.add('black');
        } else if (pieces[i].classList.contains('black')) {
            pieces[i].classList.remove('black');
            pieces[i].classList.add('white');
        }
    }
    setDragAndPieces();
});

// Start game

// Score

console.log(board ,'start of board')
setDragAndPieces();
