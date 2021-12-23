import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginStackNavigator } from "./navigation/StackNavigator";


export default function App() {
  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
}
