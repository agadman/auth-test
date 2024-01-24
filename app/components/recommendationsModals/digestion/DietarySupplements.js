import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DietarySupplements = ({ selectedTheme }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      text: 'Content specific to Anxiety...',
    },
    Theme_Fertility: {
      text: 'Content specific to Fertility...',
    },
    Theme_Menopause: {
      text: 'Content specific to Menopause...',
    },
    Theme_PMS: {
      text: 'Content specific to PMS...',
    },
    Theme_SkinHair: {
      text: 'Content specific to Skin & Hair...',
    },
    Theme_Sleep: {
      text: 'Content specific to Sleep...',
    },
    Theme_StomachBowel: {
      text: 'Text om Kosttillskott....',
      secondText: 'Mera text...',
    },
    Theme_Stress: {
      text: 'Content specific to Stress...',
    },
    // Add more themes as needed
  };

  // Get content based on the selectedTheme
  const content = contentByTheme[selectedTheme] || {};

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Kosttillskott</Text>
      {content.text && <Text style={styles.text}>{content.text}</Text>}
      {content.secondText && <Text style={styles.text}>{content.secondText}</Text>}
    </View>
  );
};
export default DietarySupplements;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#EDDAD5',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
  },
});
