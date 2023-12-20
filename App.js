import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper'; // Import PaperProvider
import AuthenticatedScreen from './app/screens/AuthenticatedScreen';
import LandingPage from './app/screens/LandingPage';
import Login from './app/screens/Login';
import Register from './app/screens/Register';

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
    <PaperProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator>
            <Stack.Screen name="Authenticated" component={AuthenticatedScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
