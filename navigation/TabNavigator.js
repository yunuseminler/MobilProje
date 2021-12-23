import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, SettingsStackNavigator } from "./StackNavigator";
import Help from "../screens/Help";

const Tab = createBottomTabNavigator();

const TabNavigator = ({route}) => {
  return (
    <Tab.Navigator initialRouteName="Ana Sayfa"
    screenOptions={{headerShown: false}}>
      <Tab.Screen name="Yardım" component={Help} />
      <Tab.Screen name="Ana Sayfa" initialParams={{ params: route.params.params}}  component={MainStackNavigator} />
      <Tab.Screen name="Ayarlar" initialParams={{ params: route.params.params}}component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;