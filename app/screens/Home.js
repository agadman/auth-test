import { View, Button } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
 
    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            // Add any additional cleanup or state management you may need here
 
            // Navigate to the "LandingPage" after successful sign-out
            navigation.navigate('LandingPage');
        } catch (error) {
            console.log('Sign out error:', error);
            // Handle sign-out error here, if necessary
        }
    };
 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('details')} title='Open details'></Button>
            <Button onPress={handleLogout} title='Logout'></Button>
        </View>
    );
 };
 
 export default Home;