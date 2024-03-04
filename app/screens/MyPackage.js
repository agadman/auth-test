import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import Recommendation_boxes from '../components/recommendationsModals/Recommendation_boxes';
import { COLORS } from '../components/Colors';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MyPackage = () => {
  const [boxData, setBoxData] = useState([
    { title: 'Kost & recept', color: '#D1E0D5', icon: 'apple' },
    { title: 'Recept' },
    { title: 'Kosttillskott', color: '#EDDAD5', icon: 'capsules' },
    { title: 'Mental hälsa', color: '#E1D8CE', icon: 'leaf' },
    { title: 'Fysisk hälsa', color: '#DFE5EB', icon: 'dumbbell' },
  ]);

  const routeParams = useRoute().params || {};
  const { maxArea } = routeParams;

  // Directly set selectedBox based on maxArea
  const selectedBox = maxArea ? `Theme_${maxArea}` : 'Default_Theme';
  console.log('Tema mitt paket:' + selectedBox);

  const route = useRoute();
  const initialUserName = route.params?.userName || '';
  const [userName, setUserName] = useState(initialUserName);
  const [userId, setUserId] = useState('');

  // Initialize Firebase auth
  const auth = getAuth();

  useEffect(() => {
    // Check if the user is logged in and retrieve their display name and UID
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDisplayName = user.displayName;
        const userId = user.uid;
  
        if (userDisplayName) {
          // User is logged in and has a display name
          setUserName(userDisplayName);
          setUserId(userId); // Set the user ID in the state
        }
      }
      setIsLoading(false);
    });
  }, []);

  let packageText = ''; // Initialize an empty string to hold the package text

  // Check the value of maxArea and set packageText accordingly
  if (maxArea === 'Mjälte') {
    packageText = 'Ditt resultat visar att du kan ha en obalans i mjältens funktioner. En obalans i mjälten kan ge sympton som matsmältningsproblem, med svullen och spänd mage efter måltid, trötthet, svagt immunförsvar och känslomässiga störningar och en obalanserad menstrationscykel.';
  } else if (maxArea === 'Lever') {
    packageText = 'Ditt resultat visar att du kan ha en obalans i leverns funktioner. Enligt TCM är levern inte bara ett organ utan också ett funktionellt system som ser till att vi får en bra cirkulation av bland annat Qi, vår livsenergi, och blod genom kroppen. När leverenergin är balanserad och harmonisk så blir vi också emotionellt stabila, flexibla och får välfungerande processer i kroppen. En obalans i levern kan ge oss sämre välbefinnande, hormonell och gynekologisk ohälsa och ge ett försämrat matsmältningssystem.'; 
  } else if (maxArea === 'Njure') {
    packageText = 'Ditt resultat visar att du kan ha en obalans i njurarnas funktion. Enligt TCM fungerar njurarna som en rot i vår hälsa och är avgörande för att vi ska må bra både fysiskt och psykiskt. En obalans i njurarna kan försvåra vår reproduktion, skapa autoimmuna tillstånd och ge problem med våra ben. Bra njurar är också nödvändiga för vårt driv, fokus och vår mentala styrka.'; 
  } else if (maxArea === 'QI') {
    packageText = 'Ditt resultat visar att du kan ha en Qi-brist, en brist eller obalans av livsenergi i kroppen. Qi anses vara den grundläggande kraften som upprätthåller livet och främjar övergripande välbefinnande och förmågan att blomstra.\nQi-brist kan yttra sig som trötthet, en känsla av svaghet, dålig matsmältning, plötsliga svettningar och ökad mottaglighet för sjukdom.'; 
  } else {
    // Default text if maxArea doesn't match any specific case
    packageText = 'Grattis! Ditt resultat visar att du inte har några tydliga obalanser eller brist i din kropp.\nVi har ändå tagit fram tips, produkter, recept och övningar som du kan använda för att fortsätta må bra eller till och med ännu bättre framöver.';
  }

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Mitt hälsopaket</Text>
            <Text style={styles.text}>Varsågod {userName}!</Text>
            <Text style={styles.text}>Här får du ditt personliga hälsopaket. Vår analys av dina svar är baserad på kinesisk medicin, men de tips du får täcker in ett holistiskt hälsoperspektiv.</Text>
            <Text style={styles.text}>{packageText}</Text>
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
