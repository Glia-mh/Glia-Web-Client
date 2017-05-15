

import React, { Component } from 'react';
var _ = require('lodash');

export default class MessageBubble extends Component {

    constructor(props) {
        super(props);
        //props.message should correspond to exactly one message
    }


    render() {
        var styles = _.cloneDeep(this.constructor.styles);


        var styleList = [styles.messageStyle];
        if(this.props.isOwnMessage) {
            styleList.push(styles.yourMessageStyle);

        }
        console.log(styleList);
        return (
            <div style={styles.container}>
                <div style={styles.textCont}> 
                        <p>{this.props.message.text}</p>
                        <span style={styles.textStyle}>Sent By: {this.props.message.user.name}</span>
                </div>
            </div>
        )}

}

MessageBubble.styles = { 
    container : {
        display: 'flex',
    },
    imgContainer : {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    textCont: { 
        flexDirection: 'column',
        backgroundColor: "#dbdbdb",
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 5,
    },
    textStyle : {
        color: "#000000",
        fontSize: 10,
    },
    messageStyle : {
        justifyContent: "center",
        backgroundColor: "#dbdbdb",
    },
    yourMessageStyle : {
        backgroundColor: "#2dd1ae",
    },
}
