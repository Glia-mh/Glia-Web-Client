

import React, { Component } from 'react';
var _ = require('lodash');

export default class MessageBubble extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFlagged: false,
        }
        //props.message should correspond to exactly one message
    }


    render() {
        var styles = _.cloneDeep(this.constructor.styles);


        var styleList = [styles.messageStyle];
        if(this.props.isOwnMessage) {
            styleList.push(styles.yourMessageStyle);

        }
       
        if(this.props.isOwnMessage) {
            return (
                 <div>
                <div style={styles.rightMessageStyle}> 
                    <p style={styles.counselorText}>{this.props.message.text}</p>
                </div>
                <p style={styles.textStyle}>Sent By: {this.props.message.user.name}</p>
            </div>
            )
        }
        else if(this.state.isFlagged) {
            return (
                 <div>
                <div style={styles.flaggedBG}
                onClick={() => {
                    this.setState({
                        isFlagged: false,
                    })
                }}
                > 
                    <p>{this.props.message.text}</p>
                </div>
                <p style={styles.textStyle}>Sent By: {this.props.message.user.name}</p>
            </div>
            )
        }
        return (
            <div>
                
                <div style={styles.textCont}
                onClick={() => {
                    this.setState({
                        isFlagged: true,
                    })
                }}
                > 
                    <p>{this.props.message.text}</p>
                </div>
                <p style={styles.textStyle}>Sent By: {this.props.message.user.name}</p>
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
    flaggedBG : {
        backgroundColor: "#F44336",
        borderRadius: 40,
        paddingTop: 3,
        width: 100,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
    },
    textCont: {
        backgroundColor: "#dbdbdb",
        borderRadius: 40,
        paddingTop: 3,
        width: 100,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
    },
    textStyle : {
        opacity: 0.8,
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
    rightMessageStyle : {
        backgroundColor: "#2dd1ae",
        paddingTop: 3,
        borderRadius: 40,
        width: 100,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
    },
    counselorText : {
        color: "#FFFFFF",
    }
}
