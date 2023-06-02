

const io = require('socket.io-client');
const socket = io('http://localhost:4000');

tournamentID = "55555"


socket.on('connect', ()=>{
  console.log("Conectad@ al servidor");
    socket.emit('signin', {
      user_name: "Cayetano",
      tournament_id: tournamentID,
      user_role: 'player'
    });
});

socket.on('ok_signin', ()=>{
    console.log("Has ingresado correctamente!");
  });

socket.on('ready', (data)=>{
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var board = data.board;
    var c4_move = Math.floor(Math.random() * 7);
    
    console.log("ID del juego: " + gameID);
    console.log("ID del jugador: " + playerTurnID);
    console.log("Movimiento: " + c4_move);
    console.log("Tablero: "+"\n");
    board.forEach((value) => {
        console.log(value + "")
    })

    socket.emit('play', {
      tournament_id:tournamentID,
      player_turn_id: data.player_turn_id,
      game_id: data.game_id,
      movement:  Math.floor(Math.random() * 7+1)
    })
  })


  socket.on('finish', (data)=>{
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var winnerTurnID = data.winner_turn_id;
    var board = data.board;
    console.log("Juego terminado");
    board.forEach((value) => {
        console.log(value + "")
    })
    console.log("El ganador del juego fue: ", winnerTurnID)
    
    socket.emit('player_ready', {
      tournament_id: tournamentID,
      player_turn_id: playerTurnID,
      game_id: gameID
    });
  });

socket.on('disconnect', ()=>{
    console.log("Desconectado del servidor");
  }
);

socket.on('error', (error_info)=>{
    console.log("Error: " + error_info);
  }
);

