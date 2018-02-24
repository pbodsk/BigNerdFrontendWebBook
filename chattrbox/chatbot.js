var WebSocket = require('ws');

var chatClient = new WebSocket('ws://localhost:3001');

chatClient.on('message', function incoming(data) {
  console.log('chatbot got a message');
   if(data.includes('chatbot:') > 0){
     chatClient.send('yessir');
   }
});

var chatbotGreeting = function() {
  if(chatClient.readyState === WebSocket.OPEN) {
    chatClient.send('The chatbot says 👋🏻');
  }
};

module.exports = chatbotGreeting;
