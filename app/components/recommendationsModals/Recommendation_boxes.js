import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import Recommendation_Modal from './Recommendation_Modal';
import DietarySupplements from './DietarySupplements';
import DietAndRecipes from './DietAndRecipes';
import MentalHealth from './MentalHealth';
import PhysicalHealth from './PhysicalHealth';

const Recommendation_boxes = ({ boxData }) => {
  const [activeBox, setActiveBox] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(0); // Initial value can be adjusted based on your logic

  const iconContainerColors = ['#709078', '#D09082', '#AB978A', '#577D9F'];

  const toggleModal = (boxTitle) => {
    setActiveBox(boxTitle);
    setModalVisible(true);
  };

  const nextModal = () => {
    const currentIndex = boxData.findIndex((box) => box.title === activeBox);
    const nextIndex = (currentIndex + 1) % boxData.length;
    setActiveBox(boxData[nextIndex].title);
    setModalVisible(true);
    setActiveModalIndex(nextIndex); // Add this line to update the activeModalIndex
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

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.boxHeader}>Rekommendationer</Text>
      <View style={styles.boxRow}>
        {boxData.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => toggleModal(item.title)}
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
      <Recommendation_Modal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          boxType={activeBox}
          onNext={nextModal}
          nextModalTitle={getNextModalTitle()}
          modalContent={getModalContent()}
          totalComponents={boxData.length}
          activeModalIndex={activeModalIndex}
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
    flexDirection: 'row',
  },
  boxText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 15,
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
});

export default Recommendation_boxes;