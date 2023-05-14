import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import BoxHome from "./component/HomeBox";
import Chat from "./component/chat";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Side from "./component/side";
import rootReducer from "./reducers/rootReducer";
const store = createStore(rootReducer);
const Stack = createNativeStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    background: "rgb(242, 242, 242)",
  },
};
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={{ backgroundColor: "red" }} theme={MyTheme}>
        <Stack.Navigator screenOptions={{ animationEnabled: false }}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={BoxHome}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
            name="chat"
            component={Chat}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
            name="side"
            component={Side}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
