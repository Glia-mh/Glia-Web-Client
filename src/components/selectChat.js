import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import ListItem from './listItem.js';
var _ = require('lodash');
import Sidebar from 'react-sidebar';
import SendBar from './sendBar.js';
import {
    MorphIcon,
    CloseButton,
    NavButton,
    PlusButton,
} from 'react-svg-buttons';
import Chat from './chat.js';


export default class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            isAuth: false,
            data: [],
            messages: [
                (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
                (new Message({ id: 0, message: "I'm you -- the blue bubble!" })) // Blue bubble
            ],
        }
    }
    componentWillMount() {
        //Send requests to the api
        if(this.props.match.params.counselorID !== "") {
            var url = "http://glia-env.y5rqrbpijs.us-west-2.elasticbeanstalk.com/Glia/counselor/" + this.props.match.params.counselorID + "/";
            fetch(url)
            .then((response) => {
                if(response.status === 200) {
                    console.log(response);
                    this.setState({
                        isAuth: true,
                    })
                }
                else {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
        var url = "http://glia-env.y5rqrbpijs.us-west-2.elasticbeanstalk.com/Glia/conversation/?format=json";
        fetch(url,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        }})
        .then((response) => {
            response.json()
            .then((data) => {
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

        if(this.state.isAuth === false) {
            return (<h1> Unauthorized request </h1>);
        }
        else if(this.state.data.length === 0) {
            return ( <h1> Loading... </h1>)
        }
        else {
            //Data is filled at this point
            var items = [];
            items.push(
                <div style={styles.background}> 
                    <img style={{width: 200, height: 70,}} src={require('../glialogo.png')}/>
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
                )
                }
            })
            return (
              <Sidebar sidebar={[items,list]}
              docked={true}
               >
               <div style={styles.background} />
               <Chat key={this.state.selectedIndex} conversationData={this.state.data[this.state.selectedIndex]} />
              </Sidebar>
            )
        }
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