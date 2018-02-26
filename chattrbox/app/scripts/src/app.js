import socket from './ws-client';

class ChatApp {
  constructor() {
    socket.init('ws://localhost:3001');

    socket.registerOpenHandler(() => {
      let message = new ChatMessage({ message: 'pow!'});

      socket.sendMessage(message.serialize());
    });

    socket.registerCloseHandler(() => {
      console.log('connection closed, attempting reconnect in 10 seconds');

      window.setTimeout(function() {
        socket.init('ws://localhost:3001');
      }, 10000);
    });

    socket.registerMessageHandler((data) => {
      console.log(data);
    });
  }
}

class ChatMessage {
  constructor({
    message: m,
    user: u='batman',
    timestamp: t=(new Date()).getTime()
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    }
  }
}
export default ChatApp;
