import React, { Component } from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import socket from "../socketConfig";

class Message extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <View
        style={
          socket.id == this.props.item.sender
            ? styles.messageme
            : styles.messagfriend
        }
      >
        <View
          style={
            socket.id == this.props.item.sender
              ? styles.boxmessage
              : styles.boxmessagef
          }
        >
          <View style={styles.textWrsrF}>
            <Text style={styles.text}>{this.props.item.content}</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.text}>{this.props.item.username}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageme: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
    marginTop: 20,
  },
  messagfriend: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
    marginTop: 20,
  },
  boxmessagef: {
    padding: 15,
    backgroundColor: "#2d3136",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  boxmessage: {
    padding: 15,
    backgroundColor: "#6f56e5",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  icon: {
    width: 40,
    height: 40,
  },

  textWrsrF: {
    maxWidth: 400,
  },
  text: {
    color: "white",
  },
  name: {
    marginTop: 10,
    justifyContent: "center",
  },
});
export default Message;
