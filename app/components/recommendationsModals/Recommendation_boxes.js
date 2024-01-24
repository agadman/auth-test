import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import Recommendation_Modal from './Recommendation_Modal';
import DietarySupplements from './digestion/DietarySupplements';
import DietAndRecipes from './digestion/DietAndRecipes';
import DietAndRecipesTwo from './digestion/DietAndRecipesTwo';
import MentalHealth from './digestion/MentalHealth';
import PhysicalHealth from './digestion/PhysicalHealth';
import StomachHealth from './digestion/StomachHealth';
import { FontAwesome5 } from 'react-native-vector-icons';

import IconImage from '../../../assets/icons/rosemarygreen50.png';
const imageSource = require('../../../assets/icons/logo.png');

const Recommendation_boxes = ({ boxData, selectedBox, onSelectBox }) => {
  const filteredBoxData = boxData.filter((box) => box.title !== 'Recept');

  const updatedBoxData = [
    { title: 'Allt du behöver veta', color: '#F1ECEA' },
    ...boxData,
  ];

  const [activeBox, setActiveBox] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(0);

  const windowWidth = Dimensions.get('window').width;
  const boxWidth = (windowWidth - 60) / 2;

  const toggleModal = (boxTitle) => {
    setActiveBox(boxTitle);

    const currentIndex = updatedBoxData.findIndex((box) => box.title === boxTitle);
    setActiveModalIndex(currentIndex);
    setModalVisible(true);
  };

  const nextModal = () => {
    const currentIndex = updatedBoxData.findIndex((box) => box.title === activeBox);
    const nextIndex = (currentIndex + 1) % updatedBoxData.length;

    setActiveBox(updatedBoxData[nextIndex].title);
    setModalVisible(true);
    setActiveModalIndex(nextIndex);
  };

  const getNextModalTitle = () => {
    const currentIndex = updatedBoxData.findIndex((box) => box.title === activeBox);
    const nextIndex = (currentIndex + 1) % updatedBoxData.length;
  
    // Check if the current box is "Fysisk hälsa" (PhysicalHealth)
    if (activeBox === 'Fysisk hälsa') {
      // Return "Allt du behöver veta" as the next title
      return 'Allt du behöver veta';
    }
  
    // Return the default next title
    return updatedBoxData[nextIndex].title;
  };

  const getModalContent = () => {
    switch (activeBox) {
      case 'Allt du behöver veta':
        return <StomachHealth selectedTheme={selectedBox} />;
      case 'Kost & recept':
        return <DietAndRecipes selectedTheme={selectedBox} />;
      case 'Recept': 
        return <DietAndRecipesTwo />;
      case 'Kosttillskott':
        return <DietarySupplements selectedTheme={selectedBox} />;
      case 'Mental hälsa':
        return <MentalHealth />;
      case 'Fysisk hälsa':
        return <PhysicalHealth selectedTheme={selectedBox} />;
      default:
        return null;
    }
  };

  const getBackgroundColor = (boxType) => {
    switch (boxType) {
      case 'Allt du behöver veta':
        return '#F1ECEA';
      case 'Kost & recept':
        return '#DDE5DF';
      case 'Recept':
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

  const progressBarData = ['Allt du behöver veta', 'Kost & recept', 'Recept', 'Kosttillskott', 'Mental hälsa', 'Fysisk hälsa'];

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBar}>
        {progressBarData.map((boxTitle, index) => (
          <Text
            key={index}
            style={[
              styles.progressBarLine,
              { fontWeight: activeModalIndex === index ? 'bold' : 'normal' },
            ]}
          >
            {boxTitle}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.boxContainer}>
      {/* Row for "Allt du behöver veta" box */}
      <Pressable onPress={() => toggleModal('Allt du behöver veta')}>
        <View style={styles.AllAboutBoxContainer}>
          <View style={styles.AllAboutBoxContent}>
            <Image source={imageSource} style={styles.logoImage} />
            <Text style={styles.AllAboutBoxText}>Allt du behöver veta</Text>
          </View>
          <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIcon} />
        </View>
      </Pressable>
      
      {/* Row for "Tips & recept" text */}
      <Text style={styles.boxHeader}>Tips & recept</Text>

       {/* Row for the rest of the boxes, including "Kost & Recept" */}
       <View style={styles.boxRow}>
        {filteredBoxData.map((item, index) => (
          <Pressable key={index} onPress={() => toggleModal(item.title)}>
            <View
              style={{
                ...styles.box,
                backgroundColor: item.color,
                width: boxWidth,
              }}
            >
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
        getNextModalTitle={getNextModalTitle}  // Pass the function as a prop
        modalContent={getModalContent()}
        totalComponents={updatedBoxData.length}
        activeModalIndex={activeModalIndex}
        backgroundColor={getBackgroundColor(activeBox)}
        boxData={updatedBoxData}
        progressBarData={progressBarData}
        onSelectBox={onSelectBox}
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
  AllAboutBoxContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Adjusted margin
    padding: 15,
  },
  AllAboutBoxContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 15,
  },
  AllAboutBoxText: {
    fontSize: 16,
    color: '#333',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginRight: 30,
  },
  boxHeader: {
    fontSize: 24,
    marginBottom: 10, // Adjusted margin
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
    marginBottom: 10,
    resizeMode: 'contain',
  },
  boxText: {
    fontSize: 16,
    textAlign: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  progressBarLine: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Recommendation_boxes;
