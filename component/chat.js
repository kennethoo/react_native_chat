
import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput ,TouchableOpacity,FlatList,SafeAreaView,Keyboard,Animated,Dimensions,UIManager,KeyboardAvoidingView,Platform} from 'react-native';
import Message from "../component/message"
import EventJoin from "../component/eventJoin"
import { Entypo } from '@expo/vector-icons';
import EventLeave from "../component/Eventleave"
import { Feather } from '@expo/vector-icons'; 
import socket from '../socketConfig';
import { Ionicons } from '@expo/vector-icons'; 
import AutoExpandingTextInput from "../component/AutoExpandingTextInput"
import {connect} from "react-redux"
class Chat extends Component{

    state={
        messageList:[],
        id:"",
        message:""
    }
    constructor(props){
        super(props);
        this.flatListRef = null;
    }
   
saveinput=(data)=>{
this.setState({
    message:data
})
}

realtime=()=>{
    let option={
        type:"eventJoin"
    }
    socket.emit("new-mesage",option)
    socket.on("groupmessage",data=>{
    let list =[...this.state.messageList,data]
    this.setState({
        messageList:list
    })
        
    })


    socket.on("room-updated",data=>{
        this.props.UpdateRoom(data)
     })


     socket.on("room-join",(data)=>{
        if(data.succes==true){
            this.props.UpdateRoom(data.data)
           // this.props.navigate.navigate("chat")
        }else{

        }
        })
  
}

sendMessage=()=>{
    if(this.state.message.length>0){
        let option  ={
            type:"message",
            content:this.state.message
        }
        socket.emit("new-mesage",option)
        this.setState({
            message:""
        })
    }
   
}

componentDidMount=()=>{
    if(this.props.room.room){
    this.realtime()
    }else{
        this.props.navigation.navigate('Home')
    }
}

 
    render(){
        const renderItem = ({ item }) => (
      item.type=="message"?<Message id={this.state.id} item={item}/>:item.type=="eventJoin"?<EventJoin item={item}/>:<EventLeave item={item}/>
       
          );
       
        return(
            <SafeAreaView style={styles.wrapertr}>
<KeyboardAvoidingView
style={styles.wraperr}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                         <View style={styles.wraperr} >
            <View style={styles.bar}>
                <View style={styles.boxone}>
                <View style={styles.icon}>
                    <Text style={styles.iconT}>R</Text>
                    
                </View>
                <View style={styles.info}>
                    <Text style={styles.incot} >{this.props.room.room}</Text>
                    <Text style={styles.incot}>{this.props.room.room?this.props.room.members.length:""} members</Text>
                </View>

                </View>
                <TouchableOpacity
                onPress={()=>{ this.props.navigation.navigate('side')}}
                 style={styles.boxtwo}>
                <Text style={styles.text2}>
                <Entypo name="info-with-circle" size={24} color="white" />
                </Text>

                </TouchableOpacity>
            </View>

            <View style={styles.boxMesage}>
<FlatList
style={styles.boxMesage}
 data={this.state.messageList}
 onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
   onLayout={() => this.flatList.scrollToEnd({animated: true})}
 ref={ref => this.flatList = ref}
    renderItem={renderItem}
    horizontal={false}
    keyExtractor={item => item.id}
/>


            </View>
            <View  style={styles.boxSendMesage}>
            <View  style={styles.wraperrr}>
            <View style={styles.bakciif}>
            <Feather name="plus" size={24} color="white" />
            </View>
            <AutoExpandingTextInput text={this.state.message} saveinput={this.saveinput} style={styles.textInput}/>
           
            <TouchableOpacity 
            onPress={this.sendMessage}
            activeOpacity={1}
            style={styles.bakciif}>
            <Ionicons name="send-sharp" size={24} color="white" />
            </TouchableOpacity>
            </View>
            </View>
            </View>
            </KeyboardAvoidingView>
            </SafeAreaView>
   
        )
    }





 
}


 

const styles = StyleSheet.create({
    wrapertr:{
flex:1,
        marginTop:Platform.OS === 'android' ? 25 : 0,
    },
    wraperr:{
        position:"relative",
        width:"100%",
flex:1,

     backgroundColor:"#1f2125"

    },
    bar:{
        width:"100%",
        height:80,
        paddingLeft:20,
       paddingRight:20,
       justifyContent:"space-between",
       alignItems:"center",
       flexDirection:"row",
        backgroundColor:"#212529"
    },
    icon:{
        width:50,
        height:50,
       
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        
        backgroundColor:"#909090"
    },
    iconT:{
        fontSize:20,
        fontWeight:"600"
    },
    boxone:{
        flexDirection:"row",
        alignItems:"center"
    },
    info:{


       marginLeft:10,
        justifyContent:"center"
    },
    incot:{
        color:"white",
        margin:2,
        fontSize:16
    },
    boxtwo:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,

    },
    text2:{
        color:"#191919"
    },
    boxMesage:{
  
       flex:1,
       paddingBottom:10

    },
    boxSendMesage:{

        height:80,
        alignItems:"center",
       justifyContent:"center",
       backgroundColor:"#212529",
       padding:10
    },

    wraperrr:{
        width:"98%",
        maxHeight:70,
  padding:10,
  flexDirection:"row",
  backgroundColor:"rgba(255,255,255,0.1)",
borderRadius:30
  
    },
    textInput:{
       borderWidth:1,
flex:1,
display:"flex",
color:"white",
fontSize:15,
maxHeight:50
    },
    bakciif:{
        width:50,
        alignItems:"center",
     
       justifyContent:"center"
    }
})


const mapstateToProps=(state)=>{
    return{
        room:state.room, 

    }
    }
    

    const mapDispatchToProps=(dispatch)=>{
        return{
            UpdateRoom:(data)=>{
       dispatch({ type:"UPDATE_ROOM", data:data})
            }
        }
    }
export default  connect(mapstateToProps,mapDispatchToProps)(Chat)