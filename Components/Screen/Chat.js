import React, {Component} from 'react';
import {View, Text} from 'react-native';
import io from 'socket.io-client';
import {TextInput} from 'react-native-gesture-handler';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
  }
  componentDidMount() {
    this.socket = io('http://192.168.1.115:3000');
    this.socket.on('chatmessage', msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg],
      });
    });
  }
  render() {
    const chatMessages = this.state.chatMessages.map((changeMessage, key) => (
      <Text key={key}>{changeMessage}</Text>
    ));
    return (
      <View>
        <TextInput
          placeholder="Enter message..."
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
        {chatMessages}
      </View>
    );
  }
  submitChatMessage() {
    this.socket.emit('chatmessage', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }
}
