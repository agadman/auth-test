import React, { useState } from 'react';
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

const tabIcons = {
  Home: 'home',
  Upptäck: 'search',
  Vänner: 'wechat',
  'My account': 'user',
};

const TabNavigator = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          const defaultColor = '#AB978A';
          const activeColor = '#D09082';
          const iconColor = selectedTab === route.name ? activeColor : defaultColor;
          const iconName = tabIcons[route.name] || 'home';

          return <FontAwesome name={iconName} size={size} color={iconColor} />;
        },
        tabBarLabelStyle: {
          color: '#AB978A', // Set the default color for the label
        },
      })}
      tabBarOptions={{
        activeTintColor: '#D09082', // Color for the active tab (used for both icon and label)
        inactiveTintColor: '#AB978A', // Color for inactive tabs
        style: { backgroundColor: '#FFFFFF' }, // Background color of the tab bar
        tabBarStyle: { borderTopWidth: 0 }, // Remove top border
        tabBarItemStyle: { marginVertical: 5 }, // Adjust vertical margin for each tab
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
        listeners={{
          tabPress: () => handleTabPress('Home'),
        }}
      />
      <Tab.Screen
        name="Upptäck"
        component={Explore}
        options={{ headerShown: false }}
        listeners={{
          tabPress: () => handleTabPress('Upptäck'),
        }}
      />
      <Tab.Screen
        name="Vänner"
        component={Friends}
        options={{ headerShown: false }}
        listeners={{
          tabPress: () => handleTabPress('Vänner'),
        }}
      />
      <Tab.Screen
        name="My account"
        component={MyAccount}
        options={{ headerShown: false }}
        listeners={{
          tabPress: () => handleTabPress('My account'),
        }}
      />
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
