import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

const MyAccount = () => {
    return (
        <View style={styles.container}>
            <Text>Min hälsa</Text>
        </View>
    )
}
export default MyAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5DED5'
    },
 })