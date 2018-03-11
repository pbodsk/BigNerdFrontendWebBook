var WebSocket = require('ws');
var chatbotGreeting = require('./chatbot');

var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];

console.log('websockets server started');

ws.on('connection', function(socket){
  console.log('client connection established');
  if(messages.length > 0){
    socket.send('welcome to the chat, here\'s what has happened so far');
  }

  messages.forEach(function(msg){
    socket.send(msg);
  });

  // chatbotGreeting();

  socket.on('message', function(data){
    messages.push(data);
    ws.clients.forEach(function(clientSocket){
      clientSocket.send(data);
    });
  });
});
