import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Recommendation_Modal = ({
  isVisible,
  onClose,
  onNext,
  onPrevious,
  modalContent,
  activeModalIndex,
  backgroundColor,
  boxData,
  progressBarData,
  getNextModalTitle,
  getPreviousModalTitle,
}) => {
  const switchToNextModal = () => {
    onClose(); // Close the current modal
    onNext(); // Switch to the next modal
  };
  const switchToPreviousModal = () => {
    onClose(); // Close the current modal
    onPrevious(); // Switch to the previous modal
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
              <Text style={styles.closeX}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1, backgroundColor }}>
            {/* Remove the placeholder View */}
            {/* Your scrollable content goes here */}
            {modalContent}
          </ScrollView>

          <View style={[styles.stickyBottom, { backgroundColor }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={switchToPreviousModal}>
            <Icon name="keyboard-arrow-left" size={30} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={switchToNextModal}>
            <Text style={styles.nextModalTitle}>Nästa: {getNextModalTitle()}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={switchToNextModal}>
            <Icon name="keyboard-arrow-right" size={30} color="#000" />
          </TouchableOpacity>
        </View>
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
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 2,
    borderTopColor: '#BDBDBD',
  },
  nextModalTitle: {
    textTransform: 'uppercase',
  },
  closeX: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  progressBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#BDBDBD',
    marginLeft: 2,
    marginRight: 2,
  },
  boldLine: {
    backgroundColor: '#666666',
  },
});

export default Recommendation_Modal;
