// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './components/HomeScreen';
import HelpScreen from './components/HelpScreen';
import SettingsScreen from './components/SettingsScreen';



export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createBottomTabNavigator({
    Help: {
      screen: HelpScreen
    },  
    Home: {
      screen: HomeScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  }, {
    initialRouteName: "Home"
  });
  

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
