import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput ,TouchableOpacity,FlatList,SafeAreaView} from 'react-native';
import {connect} from "react-redux"


class EventLeave extends Component{



componentDidMount=()=>{
    let data = this.props.room
    data.members.filter(item=>item.socketId!==this.props.item.socketId)
    let Updated = data.members.filter(item=>item.socketId!==this.props.item.socketId)
    data.members=Updated
    this.props.UpdateRoom(data)
    

}



    render(){
        return(
            <View style={styles.box}>
               <Text style={styles.tex}>{this.props.item.username} :</Text>
               <Text style={styles.tex}> Left</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

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
export default connect(mapstateToProps,mapDispatchToProps)(EventLeave)