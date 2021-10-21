import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import Login from "./components/Login";
import List from "./components/List";
const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "Login";


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      value: null,
      fontsLoaded: false,
    };  
  }
  componentDidMount = async () => {

  };
  render() {
    return (
      <NavigationContainer initialRouteName={INITIAL_ROUTE_NAME}>

	
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
            }}
          >
		  <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="List" component={List} />
            
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
