import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Keyboard,
  Animated,
  Dimensions,
  UIManager,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import socket from "../socketConfig";
import { connect } from "react-redux";

class Participant extends Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.text1}>{this.props.item.username}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",

    borderBottomWidth: 1,
    borderColor: "#2d3136",
  },
  text1: {
    color: "white",
    fontSize: 20,
  },
});
export default Participant;
