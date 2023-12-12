import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Recommendation_Modal = ({ isVisible, onClose, onNext, nextModalTitle, modalContent, totalComponents, activeModalIndex, backgroundColor }) => {
  useEffect(() => {
    console.log('Next Modal title:', nextModalTitle);
  }, [nextModalTitle]);

  const switchToNextModal = () => {
    onClose(); // Close the current modal
    onNext(); // Switch to the next modal
  };

  const renderProgressBar = () => {
    const lines = Array.from({ length: totalComponents * 2 }, (_, index) => (
      <Text key={index} style={[styles.progressBarLine, shouldBoldLine(index) ? styles.boldLine : null]}>
        _
      </Text>
    ));
    return <View style={styles.progressBar}>{lines}</View>;
  };

  const shouldBoldLine = (index) => {
    const boxIndex = Math.floor(index / 2); // Each box represents 2 lines
    return boxIndex <= activeModalIndex;
  };

  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown" backdropOpacity={0.7} style={{ margin: 0 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={[styles.stickyTop, { backgroundColor }]}>
            {renderProgressBar()}
            <TouchableOpacity onPress={onClose}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0]}>
            {/* Adding an empty View as a placeholder for sticky header */}
            <View style={{ height: 20, backgroundColor }} />

            {/* Your scrollable content goes here */}
            {modalContent}
          </ScrollView>

          <View style={[styles.stickyBottom, { backgroundColor }]}>
            <TouchableOpacity onPress={switchToNextModal}>
              {nextModalTitle ? (
                <Text style={styles.nextModalTitle}>Nästa: {nextModalTitle}</Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  stickyTop: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickyBottom: {
    padding: 30,
    alignItems: 'center',
    borderTopWidth: 2,  // Add a border at the bottom
    borderTopColor: '#BDBDBD',  // Set the border color
  },
  nextModalTitle: {
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  progressBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#BDBDBD',
    marginLeft: 2,
    marginRight: 2,
  },
  boldLine: {
    backgroundColor: '#666666', // Change this to your desired color for bold lines
    height: 2, // Adjust the height as needed
  },
});

export default Recommendation_Modal;
