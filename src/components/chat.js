import React, { Component } from 'react';
var _ = require('lodash');

import PubNub from 'pubnub';

import MessageFeed from './chatUI/MessageFeed.js';

const pubnub = new PubNub({
    subscribeKey: "sub-c-db3b3db0-2d30-11e7-87b6-02ee2ddab7fe",
    publishKey: "pub-c-db8bb359-b20e-415f-80d9-0958db03625c",
    ssl: true,
  });

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export default class Chat extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            messages: [
            ],
            channelID: "Conversation " + this.props.conversationData.id,
            numUsers: 0,
        }

    }

    messageListener = {
        message: (m) => {
           
            var newMessage = m.message.such;
            var newList = this.state.messages;
            newList.push(newMessage);
            this.setState({messages: newList})
        },
        presence: (p) => {
            this.setState({ numUsers: p.occupancy })
        },
    }

    componentWillMount() {
        //Set up pubnub stuff
       
        pubnub.hereNow({
            channels: [this.state.channelID],

        },(status,response) => {
            this.setState({
                numUsers: response.totalOccupancy,
            })
        })
        pubnub.setUUID(this.props.conversationData.counselorID);

        pubnub.history({
            channel: this.state.channelID,
            count: 10,
        },(status, response) => {
            var newMessages = [];
            for(var i = 0; i < response.messages.length; i++) {
                var obj = response.messages[i].entry.such;
                newMessages.push(obj);
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
    componentWillUnmount() {
        pubnub.removeListener(this.messageListener);
        pubnub.unsubscribeAll();
    }

    _pushMessage(recipient, message) {
        
        var newMessage = {
            _id: guid(),
            createdAt: new Date(),
            text: message,
            user : {
                _id: 0,
                name:  this.props.conversationData.counselor.counselorName,
                avatar: "https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png"
            }
        }
      
    pubnub.publish({
        channel: this.state.channelID,
        
        message : {
            such: newMessage,
        }
    },(response, error) => {
        //TODO: Error handling
    
    })
  }

  _onMessageSubmit(e) {
    console.log(e);
    var input = this.refs.message;
    e.preventDefault();
    if (!input.value) {return false;}
    this._pushMessage(this.state.curr_user, input.value)
    input.value = '';
  }

    render() {
       
        var styles = _.cloneDeep(this.constructor.styles);
        return (
            <div style={styles.cont}>
                <p style={styles.countStyle}> {this.state.numUsers} user(s) in the conversation </p>
            <MessageFeed
            key={this.state.messages.length}
            messages={this.state.messages}
            userID={0}
            />
            <form onSubmit={this._onMessageSubmit.bind(this)}>
                <input ref="message" placeholder="Type a message..." style={styles.inputStyle} />
            </form>

            </div>

        )
    }
}

Chat.styles = {
    cont : {
        padding: 10,
    },
    countStyle : {
        padding: 20,
        fontSize: 20,
        color: "#dbdbdb",
    },
    background: {
        padding: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        flex: 1,
        backgroundColor: "#2dd1ae"
    },
    inputStyle : {
        borderWith: 0,
        padding: 10,
      
        borderRadius: 10,
        fontSize: 20,
        marginTop: 50,
        height: 30,
        width: '98%',
    }
}