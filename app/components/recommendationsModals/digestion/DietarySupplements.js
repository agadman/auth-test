import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DietarySupplements = () => {
  return (
          <View style={styles.wrapper}>
            <Text style={styles.header}>Kosttillskott</Text>
            <Text>Text om Kosttillskott....</Text>
          </View>
  );
};
export default DietarySupplements;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EDDAD5',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});
