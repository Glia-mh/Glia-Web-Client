

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
                    
                    <div><span style={styles.textStyle}>{this.props.message.user.name}</span></div>
                    <div style={styleList}>
                        <p>{this.props.message.text}</p>
                    </div>
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
        display: 'flex',
        flexDirection: 'column',
    },
    textStyle : {
        textAlign: 'center',
        color: "#dbdbdb",
        fontSize: 10,
    },
    messageStyle : {
        justifyContent: "center",
        backgroundColor: "#dbdbdb",
        borderRadius: 20,
        padding: 10,
    },
    yourMessageStyle : {
        backgroundColor: "#2dd1ae",
    },
}
