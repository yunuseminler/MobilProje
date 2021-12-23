import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {SettingsStackNavigator} from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import Order from "../screens/Order";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Ana Sayfa" initialParams={{ params: navigation}} component={TabNavigator} />
      <Drawer.Screen name="Sipariş Oluştur" component={Order} />
      <Drawer.Screen name="Ayarlar" initialParams={{ params: navigation}} component={SettingsStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;