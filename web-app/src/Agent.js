import React, { Component } from 'react';
import { Widget, addResponseMessage, addUserMessage, dropMessages } from 'react-chat-widget';
//import config from './config';
import 'react-chat-widget/lib/styles.css';//to get the style of it 

var request = require("request");

const appid='11117c8bb5adb87';
const apikey='3244e1da16d747391d68a8e5c6a75a25ab8458c1';
let agentUID="";
let customerUID ="";

// agentUID = 'agent-trial-12';
//const customerUID='client-trial-12';

class Agent extends Component {
    constructor(props){
      super(props);
      
    }
    componentDidMount() {
      console.log(this.props.match.url);
        var output = this.props.match.url.split(/[\/]+/)
        console.log(output)
        agentUID = output[2];
        customerUID = "phalachandra";
        let uid = localStorage.getItem(customerUID);
        let uidb=localStorage.getItem(agentUID);
        var flag=1;
        console.log("your an agent");
        this.getconversation(agentUID,customerUID,flag) ;     
      }
      render() {
        return (
          <div className="App">
            <Widget

              handleNewUserMessage={this.handleNewUserMessage}
              title='Client-Chat'
              subtitle=''
    
            />
          </div>
        );
      }
      handleNewUserMessage = (newMessage) => {
    
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
        console.log(newMessage);
         this.sendmessage(agentUID,customerUID,newMessage);
        var result=dropMessages();
        // create listener
        console.log("there is a not return type in dropmessage")
      //addUserMessage("everything is perfect now")
      //setTimeout(console.log("waited"),4000);
      this.getconversation(agentUID,customerUID,1);
      setTimeout(addUserMessage(newMessage),9000);
      //
        //this.getconversation(agentUID,customerUID);
        
    
      };
      getconversation=function (agentUID,customerUID,flag=0) {
        console.log(agentUID, customerUID)
        var options = {
          method: 'GET',
          url: 'https://api-eu.cometchat.io/v2.0/users/'+String(agentUID)+'/users/'+String(customerUID)+'/messages',
          //qs: {unread: 'true', undelivered: 'true'},
          headers: {
            appid: '11117c8bb5adb87',
            apikey: '3244e1da16d747391d68a8e5c6a75a25ab8458c1',
            'content-type': 'application/json',
            accept: 'application/json'
          }
        };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);    
          var j=JSON.parse(response["body"])
          console.log(j)
          j=j["data"]
          if(j.length===0){return }
          var x
          console.log("getconversation",j)
          if(flag){
          for(x in j){
            //console.log("x in j",j[x].data.text);
            if(j[x].sender===customerUID){
            addResponseMessage(String(j[x].data.text));}
            else{
              addUserMessage((String(j[x].data.text)))
            }
          }}
          //addUserMessage(newMessage)
          console.log("obj",j[0].data.text);
           //addUserMessage(String(j[j.length-1].data.text))
          console.log(typeof(j))
        });
      }
      sendmessage=function (agentUID,customerUID,newMessage) {
  var options = {
    method: 'POST',
    url: 'https://api-eu.cometchat.io/v2.0/users/'+String(agentUID)+'/messages',
    headers: {
      appid: '11117c8bb5adb87',
      apikey: '3244e1da16d747391d68a8e5c6a75a25ab8458c1',
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: '{"receiver":'+'"'+String(customerUID)+'"'+',"receiverType":"user","category":"message","type":"text","data":{"text":'+'"'+String(newMessage)+'"'+'}}'
};
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log("send message",body);
    return ;
    
  });
        }      
  }
export default Agent;
