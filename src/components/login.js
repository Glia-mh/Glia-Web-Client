import React, { Component } from 'react';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import Form from 'react-uikit-form';
import FormInput from 'react-uikit-form/lib/form-input';
var _ = require('lodash');

import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory
} from 'react-router-dom';

export default class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            counselorID: "",
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    toggle() {
    this.setState({
      loading: !this.state.loading,
      progress: 0.5,
        });


    //Handle transition logic
    }

    handleChange(value) {
        console.log(value.target.value);
        this.setState({
            counselorID: value.target.value,
        })
    }


    render() {
        var styles = _.cloneDeep(this.constructor.styles);
        return (
            
            <div style={styles.background}>
                <div>
                    <img style={styles.centerImage} src={require('../glialogo.png')} />
                </div>
                <form>
                 <FormInput
                    style={styles.inputStyle}
                    placeholder='Counselor ID'
                    margin='right bottom'
                    onChange={this.handleChange}
                    />
                </form>
                <Link to={'/select/' + this.state.counselorID}>
                    <LaddaButton
                    style={styles.buttonStyle}
                    loading={this.state.loading}
                    onClick={this.toggle}
                    data-color="#29c1a0"
                    data-size={XL}
                    data-style={SLIDE_UP}
                    data-spinner-size={30}
                    data-spinner-color="#FFFFFF"
                    data-spinner-lines={12}
                    >
                    Login
                </LaddaButton>
                </Link>

                <p style={styles.textStyle}> If you would like to be a counselor, please send an email to gliamentalhealth@gmail.com. </p>
            </div>
           
        )
    }
}

LoginPage.styles = {
    background : {
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#2dd1ae',
        height: '100vh',
    },
    textStyle : {
        marginTop: 100,
        opacity: 0.8,
        color: '#FFFFFF',
        fontSize: 20,
    },
    centerImage: {
        marginTop: 40,
        height: 150,
        width: 400,
    },
    buttonStyle : {
        backgroundColor: "#29c1a0",
        marginTop: 30,
        width: 300,
    },
    inputStyle : {
        borderWith: 0,
        padding: 10,
        color: '#FFFFFF',
        borderRadius: 10,
        fontSize: 20,
        marginTop: 50,
         backgroundColor: '#2dd1ae',
        height: 30,
        width: 280,
    }
}