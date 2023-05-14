import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import socket from "../socketConfig";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
class Create extends Component {
  state = {
    username: "",
    clicked: false,
  };

  saveUsename = (text) => {
    this.setState({
      username: text,
    });
  };

  reatime = () => {
    socket.on("room-create", (data) => {
      this.props.UpdateRoom(data);
      this.setState({
        clicked: false,
      });
      this.props.navigate.navigate("chat");
    });
  };

  componentDidMount = () => {
    this.reatime();
  };
  componentWillUnmount = () => {
    console.log("unonted");
  };
  create = () => {
    if (this.state.clicked == false) {
      if (this.state.username.length > 0) {
        let username = this.state.username;
        socket.auth = { username };
        socket.connect();
        this.setState({
          clicked: true,
        });
        socket.emit("create-Room", "new");
      }
    }
  };
  render() {
    return (
      <View style={styles.wraperr}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              this.props.handleChange(true, false, false);
            }}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.boxee}>
            <Text style={styles.textt}>CREATE A CHAT</Text>
          </View>
        </View>

        <TextInput
          onChangeText={(text) => {
            this.saveUsename(text);
          }}
          style={styles.username}
          placeholder={"Username"}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={this.create} style={styles.create}>
          <Text style={styles.text}>CREATE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textt: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  wraperr: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    maxWidth: 400,

    maxHeight: 400,

    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  back: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    position: "absolute",
    left: 0,
  },
  top: {
    top: 0,
    left: 0,
    width: "100%",
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  username: {
    width: "95%",
    maxWidth: 230,
    height: 50,

    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  create: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    width: 200,
    borderWidth: 2,
    margin: 50,
    borderColor: "#2ecc71",
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});

const mapstateToProps = (state) => {
  return {
    room: state.room,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateRoom: (data) => {
      dispatch({ type: "UPDATE_ROOM", data: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(Create);
