import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Recommendation_Modal = ({
  isVisible,
  onClose,
  onNext,
  modalContent,
  totalComponents,
  activeModalIndex,
  backgroundColor,
  boxData,
  progressBarData,
}) => {
  const switchToNextModal = () => {
    onClose(); // Close the current modal
    onNext(); // Switch to the next modal
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBar}>
        {progressBarData.map((boxTitle, index) => (
          <Text
            key={index}
            style={[
              styles.progressBarLine,
              boxTitle === boxData[activeModalIndex]?.title ? styles.boldLine : null,
            ]}
          >
            {boxTitle}
          </Text>
        ))}
      </View>
    );
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
              <Text style={styles.nextModalTitle}>Nästa: {boxData[activeModalIndex + 1]?.title}</Text>
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
    borderTopWidth: 2, // Add a border at the bottom
    borderTopColor: '#BDBDBD', // Set the border color
  },
  nextModalTitle: {
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  progressBar: {
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
  },
});

export default Recommendation_Modal;
