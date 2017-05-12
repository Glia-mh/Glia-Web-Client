import React, { Component } from 'react';
import Conversation from 'chat-template/dist/Conversation';
import { ChatFeed, Message } from 'react-chat-ui'
var _ = require('lodash');

import PubNub from 'pubnub';

const pubnub = new PubNub({
    subscribeKey: "sub-c-db3b3db0-2d30-11e7-87b6-02ee2ddab7fe",
    publishKey: "pub-c-db8bb359-b20e-415f-80d9-0958db03625c",
    ssl: true,
  });

export default class Chat extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            messages: [
            ],
            channelID: "Conversation " + this.props.conversationData.conversationID,
        }

       
    }
    messageListener = {
        message: (m) => {
            var newMessage = new Message({id: m.message.such.user._id, message: m.message.such.text})
            var newList = this.state.messages;
            newList.push(newMessage);
            this.setState({messages: newList})
        }
    }

    componentWillMount() {
        //Set up pubnub stuff
        console.log(this.props.conversationData.conversationID);
        console.log("Did mount called!");

        pubnub.setUUID(this.props.conversationData.counselorID);

        pubnub.history({
            channel: this.state.channelID,
            count: 10,
        },(status, response) => {
           
            var newMessages = [];
            for(var i = 0; i < response.messages.length; i++) {
                var obj = response.messages[i].entry.such;
                console.log(obj);
                var message = new Message({id: obj.user._id, message: obj.text })
                newMessages.push(message);
            }
            this.setState({
                messages: newMessages,
            })
        })
    }
    componentDidMount() {
        pubnub.addListener(this.messageListener);
        pubnub.subscribe({
            channels: [this.state.channelID],
            withPresence: true,
        })
    }

    _pushMessage(recipient, message) {
        var newMessage = {
            createdAt: new Date(),
            text: message,
            user : {
                _id: this.props.conversationData.counselorID,
                avatar: "https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png"
            }
        }
    pubnub.publish({
        channel: this.state.channelID,
        message : {
            such: newMessage,
        }
    },(response, error) => {
        console.log(response);
    })
  }

  _onMessageSubmit(e) {
    var input = this.refs.message;
    e.preventDefault();
    if (!input.value) {return false;}
    this._pushMessage(this.state.curr_user, input.value)
    input.value = '';
  }

    render() {
        console.log(this.props.conversationData);
        var styles = _.cloneDeep(this.constructor.styles);
        return (
            <div>
            <ChatFeed
            style={{padding: 10}}
            messages={this.state.messages} // Boolean: list of message objects
            isTyping={false} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={
                    {
                    text: {
                        fontSize: 15,
                    },
                    chatbubble: {
                       
                        borderRadius: 70,
                        padding: 10
                    },
                    userBubble: {
                        backgroundColor: '#2dd1ae'
                    }
                }
            } />

            <form onSubmit={this._onMessageSubmit.bind(this)}>
                <input ref="message" placeholder="Type a message..." style={styles.inputStyle} />
            </form>

            </div>

        )
    }
}

Chat.styles = {
    background: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flex: 1,
        backgroundColor: "#2dd1ae"
    },
    inputStyle : {
        borderWith: 0,
        padding: 10,
        marginLeft: 20,
        borderRadius: 10,
        fontSize: 20,
        marginTop: 50,
        height: 30,
        width: '80%',
    }
}