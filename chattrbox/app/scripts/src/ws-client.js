let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting');
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  }
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log('message: ' + e.data);
    //Apparently we need to stringify to not get a warning here
    let data = JSON.parse(JSON.stringify(e.data));
    handlerFunction(data);
  }
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
