import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PhysicalHealth = () => {
  return (
          <View style={styles.wrapper}>
            <Text style={styles.header}>Fysisk hälsa</Text>
            <Text>Träning handlar inte bara om att få starka muskler eller att påverka din vikt, utan har också bra fördelar för matsmältningen som vi inte alltid tänker på. </Text>
            <Text>Fysisk aktivitet ger en signal till vår kropp att den ska hålla sig aktiv på mer än ett sätt. Precis som våra hjärtan pumpar snabbare och våra lungor arbetar hårdare under träning, reagerar vårt matsmältningssystem också positivt på ökad aktivitet.</Text>
          </View>
  );
};
export default PhysicalHealth;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DBE4E7',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});
