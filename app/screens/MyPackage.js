import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import Recommendation_boxes from '../components/recommendationsModals/Recommendation_boxes';
import { COLORS } from '../components/Colors';

const MyPackage = () => {
  const [boxData, setBoxData] = useState([
    { title: 'Kost & recept', color: '#D1E0D5', icon: 'apple' },
    { title: 'Recept' },
    { title: 'Kosttillskott', color: '#EDDAD5', icon: 'capsules' },
    { title: 'Mental hälsa', color: '#E1D8CE', icon: 'leaf' },
    { title: 'Fysisk hälsa', color: '#DFE5EB', icon: 'dumbbell' },
  ]);

  const selectedBox = 'Theme_StomachBowel';

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Mitt hälsopaket</Text>
            <Text style={styles.text}>Varsågod Namn!</Text>
            <Text style={styles.text}>Här får du ditt personliga hälsopaket. Vår analys av dina svar är baserad på kinesisk medicin, men de tips du får täcker in ett holistiskt hälsoperspektiv.</Text>
            <Text style={styles.text}>Ditt resultat visar att du kan ha en obalans i mjältens funktioner. En obalans i mjälten kan ge sympton som matsmältningsproblem, med svullen och spänd mage efter måltid, trötthet, svagt immunförsvar och känslomässiga störningar och en obalanserad menstrationscykel.</Text>
            <Text style={styles.text}>Vi har tagit fram tips, produkter, recept och övningar som du kan använda för att må bättre framöver. </Text>
            <Text style={styles.text}>Om det känns för mycket på en gång att förändra så börja med det du tycker verkar intressant eller funkar bäst för dig och dina vanor.</Text>
            <Text style={styles.text}>Favoritmarkera det du gillar, välj det du vill testa och skapa din egna hälsoplan.</Text>
        </View>
        <Recommendation_boxes boxData={boxData} setBoxData={setBoxData} selectedBox={selectedBox} />
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

});

export default MyPackage;
