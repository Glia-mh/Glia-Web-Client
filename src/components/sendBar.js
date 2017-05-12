import React, { Component } from 'react';
import {
    MorphIcon,
    CloseButton,
    NavButton,
    PlusButton,
} from 'react-svg-buttons';
import Form from 'react-uikit-form';
import FormInput from 'react-uikit-form/lib/form-input';

var _ = require('lodash');
export default class SendBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        }
    this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            message: e.target.value,
        });
    }

    render() {
        var styles = _.cloneDeep(this.constructor.styles);
        return (
            <div style={styles.cont}>
            <FormInput
            value={this.state.message}
            style={styles.inputStyle}
            placeholder='Enter Message'
            margin='right bottom'
            onChange={this.handleChange}
            />
            <PlusButton style={styles.sendButton} onClick={() => {
                this.setState({
                    message: "",
                })
            }}/>
            </div>
        )
    }
}

SendBar.styles = {
    cont : {
        display: 'flex',
    },
    sendButton : {
       marginTop: 20,
    },
    inputStyle : {
        position: 'fixed',
        fontSize: 20,
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
        marginBottom: 20,
        width: '50%',
        height: '10%',
        borderRadius: 10,
    }
}