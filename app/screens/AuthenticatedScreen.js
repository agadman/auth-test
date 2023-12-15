import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Explore from './Explore';
import Friends from './Friends';
import MyAccount from './MyAccount';
import Theme_StomachBowel from './Theme_StomachBowel'; 
import Theme_PMS from './Theme_PMS'; 
import { FontAwesome } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Theme_StomachBowel" component={Theme_StomachBowel} options={{ headerShown: false }} />
      <Stack.Screen name="Theme_PMS" component={Theme_PMS} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <FontAwesome name="home" size={size} color={color} />;
          }
          if (route.name === 'Upptäck') {
            return <FontAwesome name="search" size={size} color={color} />;
          }
          if (route.name === 'Vänner') {
            return <FontAwesome name="wechat" size={size} color={color} />;
          }
          if (route.name === 'My account') {
            return <FontAwesome name="user" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Upptäck" component={Explore} options={{ headerShown: false }} />
      <Tab.Screen name="Vänner" component={Friends} options={{ headerShown: false }} />
      <Tab.Screen name="My account" component={MyAccount} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const AuthenticatedScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main"component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthenticatedScreen;
