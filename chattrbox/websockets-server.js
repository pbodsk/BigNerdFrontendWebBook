var WebSocket = require('ws');

var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];
var authorizedClients = [];

console.log('websockets server started');

ws.on('connection', function(socket){
  console.log('client connection established');
  // if(messages.length > 0){
  //   socket.send('welcome to the chat, here\'s what has happened so far');
  // }

  // messages.forEach(function(msg){
  //   socket.send(msg);
  // });

  socket.on('message', function(data){
    console.log('message received: ' + data);
    if (data == "Swordfish") {
      authorizedClients.push(socket);
      socket.send('welcome to the chat, here\'s what has happened so far');
      messages.forEach(function(msg){
        socket.send(msg);
      });
    }

    if(authorizedClients.indexOf(socket) > -1) {
      messages.push(data);

      authorizedClients.forEach(function(clientSocket){
        clientSocket.send(data);
      });

    }
    // ws.clients.forEach(function(clientSocket){
    //   clientSocket.send(data);
    // });
  });
});
