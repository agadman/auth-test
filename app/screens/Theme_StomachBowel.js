import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, ImageBackground } from 'react-native';
import Recommendation_boxes from '../components/recommendationsModals/Recommendation_boxes';
import { COLORS } from '../components/Colors';
import AllAboutBox from '../components/AllAboutBox';

const Theme_StomachBowel = () => {
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
            <Text style={styles.header}>Mage & tarm</Text>
            <Text style={styles.text}>Maghälsa är en viktig del av Oomahs helhetssyn på hälsa. Allt fler upplever problem med magen och vi vill hjälpa fler till en balanserad och glad mage. Magen kan uppvisa flera olika symptom som kan orsaka stort obehag men också påverka både vår fysiska och psykiska hälsa.</Text>
            <Text style={styles.text}>En frisk och balanserad mage spelar en avgörande roll för det övergripande välbefinnandet. Därför erbjuder Oomah specialanpassade kostrekommendationer och recept som främjar en hälsosam och fungerande mage. Följ med!</Text>
        </View>
        <AllAboutBox text={'Allt om mage & tarm'} />
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
    marginBottom: 50,
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

export default Theme_StomachBowel;
