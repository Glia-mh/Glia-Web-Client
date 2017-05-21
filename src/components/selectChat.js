import React, { Component } from 'react';


var _ = require('lodash');
import Sidebar from 'react-sidebar';

import Chat from './chat.js';
import PubNub from 'pubnub';


export default class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            isAuth: false,
            data: [],
            numUsers: 0,
        }
    }
    componentWillMount() {

  // this.props.match.params.token or w/e
        //Send requests to the api
        var url = "http://107.170.234.65:8000/Glia/conversation/";
        fetch(url,{
            headers: {
                'Accept': 'application/json',
                'Authorization' : "Token " + this.props.match.params.token,
                'Content-Type': 'application/json',
        }})
        .then((response) => {
            console.log(response);
            response.json()
            .then((data) => {
                console.log(data);
                var newArr = [];
                for(var i = 0; i < data.length; i++) {
                    newArr.push(data[i]);
                }
                this.setState({
                    data: newArr,
                });
            })
        })
    }
    selectConversation(e, i) {
        this.setState({
            selectedIndex: i,
        });
    }

    render() {

        var styles = _.cloneDeep(this.constructor.styles);
            //Data is filled at this point
        var items = [];
        items.push(
            <div style={styles.background}> 
                <img style={{width: 200, height: 70,}} src={require('../glialogo.png')} alt=""/>
            </div>
        )
        var list = this.state.data.map((datum, i) => {
            //  console.log(this.state.data[i]);
            if(i === this.state.selectedIndex) {
                return (
                    <div key={i}
                    onClick={(e) => this.selectConversation(e, i)}
                    >
                        <h2 key={i} style={styles.selectedText}> {datum.conversationTitle} </h2>
                    </div> 
                        )
                }
            else {
                return (
                <div key={i}
                onClick={(e) => this.selectConversation(e, i)}
                >
                <h2 key={i} style={styles.text}> {datum.conversationTitle} </h2>
                </div>
            )}
        })

        console.log(this.state.data[this.state.selectedIndex]);
        console.log(this.state.selectedIndex);
        if(this.state.data.length == 0) {
            return <h1> Loading ... </h1>
        }
        return (
            <Sidebar sidebar={[items,list]}
            docked={true}
            >
            <div style={styles.background}/>
            <Chat key={this.state.selectedIndex} conversationData={this.state.data[this.state.selectedIndex]} />
            </Sidebar>
        )
    }
}

ChatList.styles = {
    container : {
        display: 'flex',
    },
    listCont: {
       flex: 1,
    },
    
    chat :{
        flexGrow: 3,
        flex: 3,
    },
    button : {
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#FFFFFF",
        height: 100,
    },
     background: {
        padding: 20,
        justifyContent: 'center',
        
        marginBottom: 10,
        backgroundColor: "#29c1a0",
        height: 70,
    },
    text: {
        padding: 15,
        fontFamily: 'Lato',
        fontSize: 25,
        color: "#686868",
        opacity: 0.8,
    },
    selectedText : {
        color: "#000000",
        padding: 15,
        fontFamily: 'Lato',
        fontSize: 25,
        
    }
}