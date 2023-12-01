import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import DietarySupplements from './DietarySupplements';

const Recommendation_Modal = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.7}
      style={{ margin: 0 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.stickyTop}>
            <Text>Your Sticky Top Section</Text>
            <TouchableOpacity onPress={onClose}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1, backgroundColor: 'white' }} stickyHeaderIndices={[0]}>
            {/* Adding an empty View as a placeholder for sticky header */}
            <View style={{ height: 20, backgroundColor: 'white' }} />

            {/* Your scrollable content goes here */}
            <DietarySupplements />
          </ScrollView>

          <View style={styles.stickyBottom}>
            <Text>Your Sticky Bottom Section</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Recommendation_Modal;

const styles = StyleSheet.create({
    stickyTop: {
      backgroundColor: 'white',
      padding: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stickyBottom: {
      backgroundColor: 'white',
      padding: 20,
      alignItems: 'center',
    },   
  });
  
  
