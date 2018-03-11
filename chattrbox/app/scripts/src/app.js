import socket from './ws-client';
import {ChatForm, ChatList, promptForUsername} from './dom';
import {UserStore} from './storage';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if(!username) {
  username = promptForUsername();
  userStore.set(username);
}

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);

    socket.init('ws://localhost:3001');

    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        let message = new ChatMessage({message: data});
        console.log('sending: ' + message +  ' data: ' + data);
        socket.sendMessage(message.serialize());
      })
      this.chatList.init();
    });

    socket.registerCloseHandler(() => {
      console.log('connection closed, attempting reconnect in 10 seconds');

      // window.setTimeout(function() {
      //   socket.init('ws://localhost:3001');
      // }, 10000);
    });

    socket.registerMessageHandler((data) => {
      let jsonMessage = JSON.parse(data);
      // let message = new ChatMessage({message: data});
      let message = new ChatMessage(jsonMessage);
      this.chatList.drawMessage(message.serialize());
      console.log(data);
    });
  }
}

class ChatMessage {
  constructor({
    message: m,
    user: u=username,
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
