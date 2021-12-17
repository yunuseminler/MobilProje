import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './components/HomeScreen';
import HelpScreen from './components/HelpScreen';
import ContactScreen from './components/ContactScreen';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: HelpScreen
  },
  Contact: {
    screen: ContactScreen
  }
}, {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: '#e91e63'
    }
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


