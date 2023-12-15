import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MentalHealth = () => {
  return (
          <View style={styles.wrapper}>
            <Text style={styles.header}>Mental hälsa</Text>
            <Text>Här har vi samlat några recept som är bra för din mage och tarm. Om du vill spara ett recept kan du hjärtmarkera det och hitta det i din receptsamling i din profil.</Text>
          </View>
  );
};
export default MentalHealth;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E1D8CE',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});
