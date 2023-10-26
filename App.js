import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import LandingPage from './app/screens/LandingPage';
import Login from './app/screens/Login';  
import Register from './app/screens/Register';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Inside' : 'LandingPage'}>
        <Stack.Screen name='LandingPage' component={LandingPage} options={{ headerShown: false }} />
        {user ? ( 
          <Stack.Screen name='Inside' component={Home} options={{ headerShown: false }} />
        ) : null}
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />  
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
  }