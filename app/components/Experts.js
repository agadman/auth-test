import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../components/Colors';

const Experts = () => {
  const expertsData = [
    { id: 1, name: 'Patricia Ramirez Berglund', image: require('../../assets/patricia.jpeg'), title: 'Dr Akupunktur & Orientalisk medicin' },
    { id: 2, name: 'Fia Hobbs', image: require('../../assets/patricia.jpeg'), title: 'Dr Akupunktur & Orientalisk medicin' },
    { id: 3, name: 'Expert 3', image: require('../../assets/patricia.jpeg'), title: 'Dr Akupunktur & Orientalisk medicin' },
    // Add more experts as needed
  ];

  // Adjust the number of experts to be initially visible
  const initialVisibleExperts = 2.5;
  const expertItemWidth = 120; // Adjust as needed

  return (
    <View style={styles.wrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.expertsContainer, { width: initialVisibleExperts * expertItemWidth + (initialVisibleExperts - 1) * 20 }]}>
            {expertsData.map((expert) => (
            <View key={expert.id} style={styles.expertItem}>
                <Image source={expert.image} style={styles.expertImage} />
                <Text style={styles.expertName}>{expert.name}</Text>
                <Text style={styles.title}>{expert.title}</Text>
            </View>
            ))}
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 60,
    }, 
    expertsContainer: {
        flexDirection: 'row',
        maxWidth: 120,
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
      title: {
      
      }
});

export default Experts;
