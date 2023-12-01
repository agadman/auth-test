import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from 'react-native-vector-icons';
import Recommendation_Modal from './Recommendation_Modal';

const Recommendation_boxes = () => {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  const boxData = [
    { title: 'Kost & recept', route: 'MageTarm', color: '#D1E0D5', icon: 'apple' },   // Light green
    { title: 'Kosttillskott', route: 'MageTarm', color: '#EDDAD5', icon: 'capsules' },  // Light red
    { title: 'Mental hälsa', route: 'MageTarm', color: '#E1D8CE', icon: 'leaf' },    // Light brown
    { title: 'Fysisk hälsa', route: 'MageTarm', color: '#DFE5EB', icon: 'dumbbell' },    // Light blue
  ];

  const iconContainerColors = ['#709078', '#D09082', '#AB978A', '#577D9F'];

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.boxHeader}>Rekommendationer</Text>
      <View style={styles.boxRow}>
        {boxData.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              if (item.title === 'Kosttillskott') {
                toggleModal(); // Open the modal when 'Kosttillskott' is pressed
              } else {
                navigation.navigate(item.route);
              }
            }}
          >
            <View style={{ ...styles.box, backgroundColor: item.color }}>
              {item.icon && (
                <View style={{ ...styles.iconContainer, backgroundColor: iconContainerColors[index] }}>
                  <FontAwesome5 name={item.icon} size={20} color="#fff" style={styles.icon} />
                </View>
              )}
              <Text style={styles.boxText}>{item.title}</Text>
              <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIcon} />
            </View>
          </Pressable>
        ))}
      </View>

      <Recommendation_Modal isVisible={isModalVisible} onClose={toggleModal} />
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  box: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row', // Align icon and text in a row
  },
  boxText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10, // Add some space between the icon and text
  },
  iconContainer: {
    borderRadius: 50, // Make it a circle
    padding: 15, // Adjust the padding as needed
    marginRight: 10, // Add some space between the icon and text
  },
  arrowIcon: {
    marginLeft: 'auto', // Push the arrow to the right side
  },
  // Modal Styles
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default Recommendation_boxes;
