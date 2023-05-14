import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

class EventJoin extends Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.tex}>{this.props.item.username} :</Text>
        <Text style={styles.tex}> Join</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "center",
    height: 60,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#2d3136",
  },
  tex: {
    color: "white",
    fontSize: 20,
  },
});
export default EventJoin;
