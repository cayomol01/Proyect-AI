



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

function Available(board){
    let available_moves = []
    for(let i = 0; i<board.length; i++){
        for(let j = 0; j<board[i].length;j++){
            if(board[i][j]==" "){
                available_moves.push([i,j])
            }
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

function Heuristic(board){
    if(checkWinner(board, "X")==true){
        return -1
    }
    if(checkWinner(board, "O")==true){
        return 1
    }
    if(Available(board).length == 0){
        return 0
    }
    return 0.5
}

function isTerminal(board){
    if(checkWinner(board, "X")==true){
        return true
    }
    if(checkWinner(board, "O")==true){
        return true
    }
    if(Available(board).length == 0){
        return true
    }
    return false
}


function makeMove(board, row, column, symbol){
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

            let a = Available(node.board)[i][0]
            let b = Available(node.board)[i][1]

            makeMove(b_copy, a, b, "O")

            let new_node = new Node(b_copy, false, node.depth+1)
            new_node.move = [a,b]


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


            makeMove(b_copy, a, b, "X")

            let new_node = new Node(b_copy, true, node.depth+1)
            new_node.move = [a,b]

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


function FindBest(board){
    let root = new Node(board, true, 0)
    value = minmax(root, 9,  -Infinity,Infinity, true)
    console.log(value)
    let move = []
    //console.log("ccccc")
    //console.log(root.children.length)
    //console.log(root.children)
    let children = [...root.children]
    let stack = [...root.children]
    for(let i = 0; i< children.length; i++){
        if(children[i].value == value){
            move = children[i].move
        }
    }
     while(stack.length>0){
        lookat = stack.pop()
        if(lookat){
            lookat.board.forEach(element => {
                console.log(element)
            });
            if(lookat.children.length >0){
                stack.push(...lookat.children)
            }
            console.log(" ")
        }
    } 

    return move
/*     while(stack.length !== 0){
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
    } */
    
}


board =[["X", "X", "O"],
        ["O", "O", "X"],
        ["X", " ", " "]]

function availablePos(board, move){
    if(board[move[0]][move[1]]==" "){
        return true
    }
    else{
        return false
    }
}


console.log(FindBest(board))

let count = 0
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



    board[my_move1][my_move2] = "X"
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

