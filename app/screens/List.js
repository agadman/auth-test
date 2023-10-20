import { View, Button } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const List = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('details')} title='Open details'></Button>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'></Button>
        </View>
    )
}
export default List;