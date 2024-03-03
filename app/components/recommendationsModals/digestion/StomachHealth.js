import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StomachHealth = ({ selectedTheme }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      header: 'Anxiety',
      text: 'Content specific to Anxiety...',
    },
    Theme_Fertility: {
      header: 'Fertility',
      text: 'Content specific to Fertility...',
    },
    Theme_Menopause: {
      header: 'Menopause',
      text: 'Content specific to Menopause...',
    },
    Theme_PMS: {
      header: 'PMS',
      text: 'Content specific to PMS...',
    },
    Theme_SkinHair: {
      header: 'Skin & Hair',
      text: 'Content specific to Skin & Hair...',
    },
    Theme_Sleep: {
      header: 'Sömn',
      text: 'Content specific to Sleep...',
    },
    Theme_StomachBowel: {
      progressbarTitle: 'Mage & tarm',
      header: 'Maghälsa',
      text: 'Problem med mage och tarm handlar oftast om två saker, vad du stoppar i dig och hur din vardag ser ut. Äter du regelbundet? Tar du dig tid att äta i lugn och ro? Ser du till att få i dig kost som hjälper din mage? Finns det utrymme för träning och återhämtning? Alla dessa delar är viktiga för att matsmältningen ska fungera.',
      secondText: 'Mycket handlar om bra rutiner och tid för lugn och ro. Här får du tips om vad du kan göra inom kost, kosttillskott, mental hälsa och fysisk hälsa.',
    },
    Theme_Stress: {
      header: 'Stress',
      text: 'Content specific to Stress...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
      header: 'Mjälten - The Transformer',
      text: 'Mjälten är ett av kroppens centrala organ och har en nyckelroll i vår kropp. Inom Traditionell Kinesisk medicin (TCM) så anses den bidra till att:',
    },
    // Add more themes as needed
  };

  // Get content based on the selectedTheme
  const content = contentByTheme[selectedTheme] || {};

  return (
    <View style={styles.wrapper}>
      {content.progressbarTitle && <Text>{content.progressbarTitle}</Text>}
      {content.header && <Text style={styles.header}>{content.header}</Text>}
      {content.text && <Text style={styles.text}>{content.text}</Text>}
      {content.secondText && <Text style={styles.text}>{content.secondText}</Text>}
    </View>
  );
};
export default StomachHealth;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F1ECEA',
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