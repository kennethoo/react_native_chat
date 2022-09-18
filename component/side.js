import React,{Component}  from "react"
import { Share,StyleSheet, Text, View,TextInput ,TouchableOpacity,FlatList,SafeAreaView,Keyboard,Animated,Dimensions,UIManager,KeyboardAvoidingView,Platform,ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Participant from "../component/participant"
import {connect} from "react-redux"
import socket from "../socketConfig";
class Side extends Component{
    onShare = async () => {
        try {
          const result = await Share.share({
            message:`${this.props.room.room}`,
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };



leaveRoom=()=>{
    this.props.UpdateRoom({})
    socket.disconnect()
    this.props.navigation.navigate('Home')
}

render(){

    return(
       <SafeAreaView  style={styles.rrhhr} >
       <View style={styles.page}>
       <ScrollView style={styles.page}>
       <View style={styles.bar}>
              <TouchableOpacity
               onPress={()=>{ this.props.navigation.navigate('chat')}}
               style={styles.close}>
              <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>

              <View style={styles.tilte}>
                  <Text style={styles.text1}>Details</Text>
              </View>
          </View>
<View style={styles.wraperrtr}>
<View style={styles.boxx}>
          <View style={styles.titeromm}>
          <Text style={styles.text2}>ROOM ID</Text>
           </View>

          <View>
          <Text style={styles.text2}>{this.props.room.room?this.props.room.room:""}</Text>
           </View>
          </View>


          <View style={styles.wraperrtrpe}>
<Text style={styles.text4}>Members</Text>
          </View>

          <View style={styles.wrtapjdjd}>

          {this.props.room.members?.map(item=>{
              return(
                <Participant key={item.socketId} item={item} />
              )
          })}

          </View>
          <TouchableOpacity 
          activeOpacity={0.7}
          onPress={()=>{this.onShare()}}
          style={styles.exitRou} >
              <Text style={styles.text5}>Share Room ID</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{this.leaveRoom()}} 
          style={styles.exitRou} >
              <Text style={styles.text5}>Exit Group</Text>
          </TouchableOpacity>
</View>
    
       </ScrollView>
    
       </View>
       </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    boxx:{
       borderWidth:1,
    padding:10,
       borderColor:"#fff",
       borderRadius:5
    },
    text5:{
color:"#fff",
fontSize:20,

    },
    wrtapjdjd:{

    },
    exitRou:{
height:50,
justifyContent:"center",
alignItems:"center",
margin:10,
borderRadius:5,
backgroundColor:"rgba(255, 255, 255,0.1)"
    },
    text4:{
marginTop:10,
paddingTop:10,
paddingBottom:10,
color:"#fff",
fontWeight:"600",
fontSize:20,
borderColor:"#fff",
    },
    titeromm:{
height:30,
justifyContent:"center"
    },
    text2:{
color:"#fff",
fontWeight:"600",
fontSize:17
    },
    box:{
    flexDirection:"row",
   justifyContent:"center",
   height:60,
   alignItems:"center",
   borderBottomWidth:1,
   borderColor:"#2d3136"
    },
    tex:{
        color:"white",
        fontSize:20
    },
    page:{
        backgroundColor:"#1f2125",
      minHeight:"100%",
      marginTop:Platform.OS === 'android' ? 25 : 0,
    },
    bar:{
        height:60,
        flexDirection:"row",
        alignItems:"center"
    },
    close:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center"
    },
    tilte:{
        height:60,
        justifyContent:"center"
    },
    text1:{
        fontSize:20,
        color:"#fff",
        fontWeight:"600"
    },
    wraperrtr:{
        padding:20
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
export default connect(mapstateToProps,mapDispatchToProps)(Side)