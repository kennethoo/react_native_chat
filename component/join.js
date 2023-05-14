import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import socket from "../socketConfig";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
class Join extends Component {
  state = {
    username: "",
    roomId: "",
    cliked: false,
  };

  saveUsename = (text) => {
    this.setState({
      username: text,
    });
  };

  realtime = () => {
    socket.on("room-join", (data) => {
      if (data.succes == true) {
        this.props.UpdateRoom(data.data);
        this.setState({
          clicked: false,
        });
        this.props.navigate.navigate("chat");
      } else {
        this.setState({
          clicked: false,
        });
      }
    });
  };

  saveRomm = (text) => {
    this.setState({
      roomId: "",
      roomId: text,
    });
  };

  joinRoom = () => {
    if (this.state.cliked == false) {
      if (this.state.username.length > 0 && this.state.roomId.length > 0) {
        let username = this.state.username;
        socket.auth = { username };
        socket.connect();
        socket.emit("join-a-Room", this.state.roomId);
      }
    }
  };

  componentDidMount = () => {
    this.realtime();
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
            <Text style={styles.textt}>JOIN A CHAT</Text>
          </View>
        </View>

        <TextInput
          style={styles.username}
          onChangeText={(text) => {
            this.saveUsename(text);
          }}
          placeholder={"Username"}
          autoCapitalize="none"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={styles.username}
          onChangeText={(text) => {
            this.saveRomm(text);
          }}
          placeholder={"ROOM ID"}
          autoCapitalize="none"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.joinRoom}
          style={styles.join}
        >
          <Text style={styles.text}>JOIN</Text>
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
  back: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    position: "absolute",
    left: 0,
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
  join: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    width: 200,
    borderWidth: 2,
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

export default connect(mapstateToProps, mapDispatchToProps)(Join);
