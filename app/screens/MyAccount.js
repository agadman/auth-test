import { StyleSheet, View, Text, Button } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { COLORS } from '../components/Colors';

const MyAccount = () => {
    const navigation = useNavigation();
 
    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            // Navigate to 'LandingPage' and reset the stack
            navigation.dispatch(
                CommonActions.navigate({
                    name: 'LandingPage',
                })
            );
        } catch (error) {
            console.log('Sign out error:', error);
            // Handle sign-out error here, if necessary
        }
    };
 
    return (
        <View style={styles.container}>
            <Text>Min hälsa</Text>
            <Button onPress={handleLogout} title='Logout'></Button>
        </View>
    )
}
export default MyAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
 })