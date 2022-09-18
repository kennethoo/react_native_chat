
import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput ,TouchableOpacity,FlatList,SafeAreaView,Keyboard,Animated,Dimensions,UIManager,KeyboardAvoidingView,Platform} from 'react-native';
class AutoExpandingTextInput extends Component {

    constructor(props) {
      super(props);
      this.state = {text: '', height: 0};
    }
saveChange=(text)=>{
    this.props.saveinput(text)
}
    render() {
      return (
        <TextInput
        placeholderTextColor="#fff" 
         placeholder={'Your Message'}
        style={styles.textInput}
          {...this.props}
          multiline={true}
          onChangeText={(text) => {
              //this.setState({ text })
              this.saveChange(text)
            
          }}
          onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height })
          }}
          style={[styles.textInput, {height: Math.max(30, this.state.height), maxHeight:50}]}
          value={this.props.text}
        />
      );
    }
  }



const styles = StyleSheet.create({

    wraperr:{
        position:"relative",
        width:"100%",
flex:1,
     backgroundColor:"#1f2125"

    },
    textInput:{

 flex:1,
 display:"flex",
 color:"white",
 fontSize:15,
 maxHeight:50
     },
})
  export default AutoExpandingTextInput