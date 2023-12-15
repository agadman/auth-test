import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StomachHealth = () => {
  return (
          <View style={styles.wrapper}>
            <Text style={styles.header}>Maghälsa</Text>
            <Text>Problem med mage och tarm handlar oftast om två saker, vad du stoppar i dig och hur din vardag ser ut. Äter du regelbundet? Tar du dig tid att äta i lugn och ro? Ser du till att få i dig kost som hjälper din mage? Finns det utrymme för träning och återhämtning? Alla dessa delar är viktiga för att matsmältningen ska fungera.</Text>
            <Text>Mycket handlar om bra rutiner och tid för lugn och ro. Här får du tips om vad du kan göra inom kost, kosttillskott, mental hälsa och fysisk hälsa.</Text>
          </View>
  );
};
export default StomachHealth;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F1ECEA',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});