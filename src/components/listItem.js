import React, { Component } from 'react';
import {
    MorphIcon,
    CloseButton,
    NavButton,
    PlusButton,
} from 'react-svg-buttons';
var _ = require('lodash');
export default class ListItem extends Component {
    

    render() {
        var styles = _.cloneDeep(this.constructor.styles);

        return (
            <div style={styles.background}>
            <span style={styles.text}>{this.props.title}</span> 
            <span style={styles.buttonSpan}> 
                <button style={styles.buttonStyle}>
                <NavButton style={{color:"#FFFFFF"}} direction="right" opened={false} /> 
                </button>
                </span>
            </div>
        )

    }

}

ListItem.styles = {
    background: {
        padding: 20,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#29c1a0",
        height: 100,
    },
    text : {
       
        marginLeft: 10,
        color: "#FFFFFF",
        opacity: 0.9,
        fontSize: 20,
    },
    buttonStyle : {
        borderRadius: 50,
         backgroundColor: "#29c1a0",
    },
    buttonSpan : {
        padding: 20,
        marginTop: 40,
    }
}