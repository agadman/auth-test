import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Experts = () => {
  const expertsData = [
    { id: 1, name: 'Patricia Ramirez Berglund', image: require('../../assets/patricia.png'), title: 'Dr Akupunktur & Orientalisk medicin' },
    { id: 2, name: 'Fia Hobbs', image: require('../../assets/fia_hobbs.jpeg'), title: 'Dr Akupunktur & Orientalisk medicin' },
    { id: 3, name: 'Expert 3', image: require('../../assets/patricia.jpeg'), title: 'Dr Akupunktur & Orientalisk medicin' },
    // Add more experts as needed
  ];

  const navigation = useNavigation();
  const route = useRoute();

const handleExpertPress = (expertId) => {
  const currentScreen = route.name; // Get the name of the current screen using useRoute
  navigation.navigate('ExpertDetails', { expertId, previousScreen: currentScreen });
};


  const initialVisibleExperts = 2.5;
  const expertItemWidth = 140; // Adjust as needed
  const marginRight = 20;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.expertsHeader}>Våra Experter</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.expertsContainer}>
          {expertsData.map((expert) => (
            <Pressable
              key={expert.id}
              style={[styles.expertItem, { width: expertItemWidth, marginRight }]}
              onPress={() => handleExpertPress(expert.id)}
            >
              <Image source={expert.image} style={styles.expertImage} />
              <Text style={styles.expertName}>{expert.name}</Text>
              <Text style={styles.title}>{expert.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    marginLeft: '5%',
    marginBottom: 60,
    marginTop: 30,
  },
  expertsContainer: {
    flexDirection: 'row',
  },
  expertItem: {
    marginRight: 20,
  },
  expertImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  expertName: {
    marginTop: 10,
    fontSize: 16,
  },
  expertsHeader: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Experts;
