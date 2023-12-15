import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DietAndRecipes = () => {
  return (
          <View style={styles.wrapper}>
            <Text style={styles.header}>Recept</Text>
            <Text style={styles.text}>Här har vi samlat några recept som är bra för din mage och tarm. Om du vill spara ett recept kan du hjärtmarkera det och hitta det i din receptsamling i din profil.</Text>
          </View>
  );
};
export default DietAndRecipes;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, // Use flex to take up the entire available space
    backgroundColor: '#DDE5DF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20, // Add padding if needed
    paddingBottom: 200, // Add padding if needed
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  secondHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 20,
  },
});