import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, ImageBackground } from 'react-native';
import Recommendation_boxes from '../components/recommendationsModals/Recommendation_boxes';
import { COLORS } from '../components/Colors';

const Theme_PMS = () => {
  const [boxData, setBoxData] = useState([
    { title: 'Kost & recept', color: '#D1E0D5', icon: 'apple' },
    { title: 'Kosttillskott', color: '#EDDAD5', icon: 'capsules' },
    { title: 'Mental hälsa', color: '#E1D8CE', icon: 'leaf' },
    { title: 'Fysisk hälsa', color: '#DFE5EB', icon: 'dumbbell' },
  ]);

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.firstBox}>
          <ImageBackground
            source={require('../../assets/box_six_theme.jpg')}
            style={styles.boxBackground}>
          </ImageBackground>
        </View>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>PMS</Text>
            <Text style={styles.text}>Kvinnor kan uppleva premenstruellt syndrom (PMS) under dagarna före sin mens. Det är en kombination av fysiska och känslomässiga symptom som kan variera i intensitet och varaktighet för varje individ. PMS-symptom kan inkludera uppblåsthet, ömhet i brösten, humörsvängningar, irritabilitet, ångest, trötthet och matbegär. Den exakta orsaken till PMS är okänd, men hormonförändringar under menstruationscykeln anses vara en bidragande faktor.</Text>
            <Text style={styles.text}>För att lindra PMS-symptom finns det flera strategier du kan prova. Här hittar du detaljerade rekommendationer och produkter inom kost, tillskott samt mental & fysisk hälsa.</Text>
        </View>
        <Recommendation_boxes boxData={boxData} setBoxData={setBoxData} />
      </View>
    </ScrollView>
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
  firstBox: {
    width: '90%',
    aspectRatio: 1.5,
    overflow: 'hidden',
    borderRadius: 10,
  },
  headerContainer: {
    width: '90%',
    paddingTop: 20,
  },
  header: {
    fontSize: 30,
    paddingBottom: 20,
  },
  text: {
    paddingBottom: 10,
  },
  boxBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Theme_PMS;
