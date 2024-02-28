import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../components/Colors';

const ExpertDetails = () => {
  const route = useRoute();
  const { expertId } = route.params;

  // Assuming that expertsData is available in ExpertDetails (you may need to pass it from the parent component)
  const expertsData = [
    { 
        id: 1, 
        name: 'Patricia Ramirez Berglund', 
        image: require('../../assets/patricia.png'), 
        title: 'Dr Akupunktur & Orientalisk medicin', 
        text1: 'Patricia har en doktorsexamen i akupunktur och orientalisk medicin. Hon är licensierad i Commonwealth of Massachusetts och delstaten New York i USA. Hon bedriver för närvarande privatpraktik i Stockholm.',
        text2: 'Som örtläkare är Patricia specialiserad på behandling av hudåkommor och autoimmuna sjukdomar. Efter att ha arbetat för Initiative for Women (IWD) vid NYU Hospital for Joint Diseases i New York City (2010), blev hon särskilt intresserad av kvinnors hälsofrågor. Patricias övertygelse är att genom utbildning av patienter inom livsstilsförändringar, funktionell näring och användningen av örter som medicin samt Yang Sheng (närande liv) praxis, kan människor påverka sin resa mot välbefinnande. Hennes passion är att stärka människors hälsa och välbefinnande genom behandling och integration av sinne/kropp/ande.' ,
    },
    { id: 2, name: 'Fia Hobbs', image: require('../../assets/fia_hobbs.jpeg'), title: 'Dr Akupunktur & Orientalisk medicin', text: 'test2' },
    { id: 3, name: 'Expert 3', image: require('../../assets/patricia.jpeg'), title: 'Dr Akupunktur & Orientalisk medicin', text: 'test3' },
    // Add more experts as needed
  ];

  // Find the selected expert based on expertId
  const selectedExpert = expertsData.find((expert) => expert.id === expertId);

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.introductoryBox}>
          <Text style={styles.header}>Våra experter</Text>
        </View>
        {selectedExpert && (
          <View style={styles.expertDetails}>
            <Image source={selectedExpert.image} style={styles.expertImage} />
            <View style={styles.text}>
                <Text style={styles.expertName}>{selectedExpert.name}</Text>
                <Text style={styles.title}>{selectedExpert.title}</Text>
                <Text>{selectedExpert.text1}</Text>
                <Text>{selectedExpert.text2}</Text>
            </View>
          </View>
        )}
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
  introductoryBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    paddingLeft: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
  expertDetails: {
    alignItems: 'center',
  },
  expertImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  text: {
    width: '100%',
  },
  expertName: {
    marginTop: 10,
    fontSize: 16,
  },
  title: {},
});

export default ExpertDetails;
