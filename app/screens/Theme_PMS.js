import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../components/Colors';

const Theme_PMS = () => {
 
    return (
        <View style={styles.container}>
            <Text>PMS artiklar kommer här....</Text>
        </View>
    )
}
export default Theme_PMS;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
 })