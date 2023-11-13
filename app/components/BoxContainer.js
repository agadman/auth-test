import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BoxContainer = () => {
  const navigation = useNavigation();

  const boxData = [
    { title: 'Mage & tarm', image: require('../../assets/box_one_theme.jpg'), route: 'MageTarm' },
    { title: 'Sömn & energi', image: require('../../assets/box_two_theme.jpg'), route: 'MageTarm' },
    { title: 'Hud & hår', image: require('../../assets/box_three_theme.jpg'), route: 'MageTarm' },
    { title: 'Oro & ångest', image: require('../../assets/box_four_theme.jpg'), route: 'MageTarm' },
    { title: 'Fertilitet', image: require('../../assets/box_five_theme.jpg'), route: 'MageTarm' },
    { title: 'Stress', image: require('../../assets/box_six_theme.jpg'), route: 'MageTarm' },
    { title: 'Klimakterie', image: require('../../assets/box_seven_theme.jpg'), route: 'MageTarm' },
    { title: 'PMS', image: require('../../assets/box_eight_theme.jpg'), route: 'Theme_PMS' },
  ];

  const windowWidth = Dimensions.get('window').width;
  const boxWidth = (windowWidth - 50) / 2; 

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.boxHeader}>Läs om tema...</Text>
      <View style={styles.boxRow}>
        {boxData.map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate(item.route)}>
            <View style={{ ...styles.box, width: boxWidth }}>
              <Image source={item.image} style={styles.boxImage} />
              <Text style={styles.boxText}>{item.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    marginTop: 50,
    width: '90%',
    alignSelf: 'center',
  },
  boxHeader: {
    fontSize: 24,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
  },
  boxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    marginBottom: 10,
    alignItems: 'center',
  },
  boxImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  boxText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BoxContainer;
