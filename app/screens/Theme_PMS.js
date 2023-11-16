import React from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable, ImageBackground } from 'react-native';
import Recommendation_boxes from '../components/Recommendation_boxes';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../components/Colors';

const Theme_PMS = () => {
  const navigation = useNavigation();

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
        <Recommendation_boxes />
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
