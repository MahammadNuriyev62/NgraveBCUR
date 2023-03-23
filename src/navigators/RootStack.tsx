import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import ScanQRScreen from "../screens/ScanQR";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ScanQR" component={ScanQRScreen} />
    </Stack.Navigator>
  );
}
