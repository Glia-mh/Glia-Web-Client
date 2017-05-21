import React, { Component } from 'react';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';

import FormInput from 'react-uikit-form/lib/form-input';
var _ = require('lodash');
import createHistory from 'history/createBrowserHistory';


const history = createHistory()

export default class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            counselorUsername: "",
            counselorPassword: "",
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
    this.setState({
      loading: !this.state.loading,
      progress: 0.5,
        });


    //Handle transition logic
    }


    render() {
        var styles = _.cloneDeep(this.constructor.styles);
        return (
            
            <div style={styles.background}>
                <div>
                    <img style={styles.centerImage} src={require('../glialogo.png')} alt="" />
                </div>
                <form>
                 <input 
                 ref="username"
                 placeholder="Username"
                 style={styles.inputStyle}/>
                 <br/>
                 <input style={styles.inputStyle}
                 ref="password"
                 type="password"
                 placeholder="Password"
                 />
                </form>
                    <LaddaButton
                    style={styles.buttonStyle}
                    loading={this.state.loading}
                    onClick={() => {
                        console.log(this.refs.username.value);
                        console.log(this.refs.password.value.toString());


                        this.toggle

                        var data = new FormData();
                        data.append("username",this.refs.username.value);
                        data.append("password", this.refs.password.value);

                        fetch('http://107.170.234.65:8000/api-token-auth/', {
                            method: "POST",
                            body : data,
                        })
                        .then((response) => {
                            console.log(response);
                            if(response.status === 200) {
                                response.json()
                                .then((data) => {
                                    console.log(data);
                                history.push('/select/' + data.token);
                                    location.reload();
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            this.refs.username = "";
                            this.refs.password = "";
                            location.reload();
                        })
                        }}
                    data-color="#29c1a0"
                    data-size={XL}
                    data-style={SLIDE_UP}
                    data-spinner-size={30}
                    data-spinner-color="#FFFFFF"
                    data-spinner-lines={12}
                    >
                    Login
                </LaddaButton>
              

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
        marginTop: 20,
         backgroundColor: '#2dd1ae',
        height: 30,
        width: 280,
    }
}