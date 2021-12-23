
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigation from "./DrawerNavigator";

import Home from "../screens/Home";
import Help from "../screens/Help";
import Settings from "../screens/Settings";
import Login from '../screens/Login';
import Order from '../screens/Order';


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown: false
};

const HelpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Yardım" component={Help} />
    </Stack.Navigator>
  );
}
const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Ana Sayfa" component={DrawerNavigation} />
      </Stack.Navigator>
  );
}



const MainStackNavigator = ({route}) => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home"  component={Home} />
      <Stack.Screen name="Ana Sayfa" component={Home} />
      <Stack.Screen name="Siparis" component={Order} />
    </Stack.Navigator>
  );
}

const SettingsStackNavigator = ({route}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" initialParams={{ params: route.params.params}} component={Settings} />
    </Stack.Navigator>
  );
}

export { HelpStackNavigator, MainStackNavigator, SettingsStackNavigator,LoginStackNavigator};