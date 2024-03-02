import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../components/Colors';

const MyPackage = () => {
  return (
    <View style={styles.container}>
        <Text>My Package</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: COLORS.background,
  },
});

export default MyPackage;
