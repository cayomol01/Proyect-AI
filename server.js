
const io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('Cliente conectado!');
  socket.emit('message', 'Bienvenido!');
});

io.listen(4000);
console.log('Server started on port 3000');