import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";

import Join from "./join";
import Create from "./create";
class BoxHome extends Component {
  state = {
    defaultBox: true,
    join: false,
    create: false,
  };

  handleChange = (one, two, three) => {
    this.setState({
      defaultBox: one,
      join: two,
      create: three,
    });
  };

  componentDidMount = () => {};

  render() {
    return (
      <SafeAreaView style={styles.box}>
        <View style={styles.box}>
          {this.state.defaultBox == true ? (
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.text1}>JUST CHAT</Text>
              </View>
              <View style={styles.nextbox}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleChange(false, false, true);
                  }}
                  style={styles.choose}
                >
                  <Text style={styles.text2}>CREATE A CHAT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleChange(false, true, false);
                  }}
                  style={styles.choose}
                >
                  <Text style={styles.text2}>JOIN A CHAT</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text></Text>
          )}

          {this.state.create == true ? (
            <Create
              navigate={this.props.navigation}
              handleChange={this.handleChange}
            />
          ) : (
            <Text></Text>
          )}
          {this.state.join == true ? (
            <Join
              navigate={this.props.navigation}
              handleChange={this.handleChange}
            />
          ) : (
            <Text></Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    maxWidth: 400,
    height: "100%",
    maxHeight: 400,
    paddingVertical: 45,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  box: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34495E",
    marginTop: Platform.OS === "android" ? 25 : 0,
  },
  title: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "600",
    borderRadius: 10,
  },
  text1: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  nextbox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  choose: {
    height: 50,
    borderWidth: 1,
    width: "95%",
    opacity: 1,
    margin: 10,
    maxWidth: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#3498db",
  },
  text2: {
    color: "white",
    fontWeight: "600",
  },
});

export default BoxHome;
