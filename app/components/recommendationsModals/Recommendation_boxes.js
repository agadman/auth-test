import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import Recommendation_Modal from './Recommendation_Modal';
import DietarySupplements from './DietarySupplements';
import DietAndRecipes from './DietAndRecipes';
import MentalHealth from './MentalHealth';
import PhysicalHealth from './PhysicalHealth';

// Assume you have the image file in the same folder as this component
import IconImage from '../../../assets/icons/rosemary_icon.png';

const Recommendation_boxes = ({ boxData }) => {
  const [activeBox, setActiveBox] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(0);

  const windowWidth = Dimensions.get('window').width;
  const boxWidth = (windowWidth - 60) / 2;

  const toggleModal = (boxTitle) => {
    setActiveBox(boxTitle);
    setModalVisible(true);
  };

  const nextModal = () => {
    const currentIndex = boxData.findIndex((box) => box.title === activeBox);
    const nextIndex = (currentIndex + 1) % boxData.length;
    setActiveBox(boxData[nextIndex].title);
    setModalVisible(true);
    setActiveModalIndex(nextIndex);
  };

  const getNextModalTitle = () => {
    const currentIndex = boxData.findIndex((box) => box.title === activeBox);
    const nextIndex = (currentIndex + 1) % boxData.length;
    return boxData[nextIndex].title;
  };

  const getModalContent = () => {
    switch (activeBox) {
      case 'Kost & recept':
        return <DietAndRecipes />;
      case 'Kosttillskott':
        return <DietarySupplements />;
      case 'Mental hälsa':
        return <MentalHealth />;
      case 'Fysisk hälsa':
        return <PhysicalHealth />;
      default:
        return null;
    }
  };

  const getBackgroundColor = (boxType) => {
    switch (boxType) {
      case 'Kost & recept':
        return '#DDE5DF';
      case 'Kosttillskott':
        return '#EDDAD5';
      case 'Mental hälsa':
        return '#E1D8CE';
      case 'Fysisk hälsa':
        return '#DBE4E7';
      default:
        return '#FFFF'; // Default color
    }
  };

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.boxHeader}>Tips & recept</Text>
      <View style={styles.boxRow}>
        {boxData.map((item, index) => (
          <Pressable key={index} onPress={() => toggleModal(item.title)}>
            <View style={{ ...styles.box, backgroundColor: item.color, width: boxWidth }}>
              <Image source={IconImage} style={styles.icon} />
              <Text style={styles.boxText}>{item.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <Recommendation_Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        boxType={activeBox}
        onNext={nextModal}
        nextModalTitle={getNextModalTitle()}
        modalContent={getModalContent()}
        totalComponents={boxData.length}
        activeModalIndex={activeModalIndex}
        backgroundColor={getBackgroundColor(activeBox)} // Pass the background color dynamically
      />
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
    marginBottom: 30,
    width: '100%',
    textAlign: 'left',
  },
  boxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  box: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 25,
    borderRadius: 8,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Recommendation_boxes;
