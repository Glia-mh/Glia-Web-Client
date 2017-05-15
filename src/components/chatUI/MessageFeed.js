import React, { Component } from 'react';
var _ = require('lodash');

import MessageBubble from './MessageBubble.js';

export default class MessageFeed extends Component {

    constructor(props) {
        super(props);
        //this.props.messages
    }

    render() {
        var styles = _.cloneDeep(this.constructor.styles);

        var messageList = this.props.messages.map((message,index) => {
            if(this.props.userID === message.user._id) {
                return (
                    <div style={styles.rightAlign}>
                        <MessageBubble message={message} isOwnMessage />
                    </div>
                )
            }
            else {
                return (
                    <div style={styles.leftBubble}>
                    <MessageBubble message={message} />
                    </div>
                )
            }
        });


        return (
            <div style={styles.container}>
            {messageList}
            </div> 
        )}
}

MessageFeed.styles = {
    container : {
        display: 'flex',
        flexDirection: 'column',
    },
    rightAlign: {
        marginLeft: 'auto',
        marginRight: 0,
        marginTop: 20,
    },
    leftBubble : {
        marginTop: 10,
    }
}