import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PhysicalHealth = ({ selectedTheme }) => {
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
      progressbarTitle: 'Mage & tarm',
      text: 'Träning handlar inte bara om att få starka muskler eller att påverka din vikt, utan har också bra fördelar för matsmältningen som vi inte alltid tänker på.',
      secondText: 'Fysisk aktivitet ger en signal till vår kropp att den ska hålla sig aktiv på mer än ett sätt. Precis som våra hjärtan pumpar snabbare och våra lungor arbetar hårdare under träning, reagerar vårt matsmältningssystem också positivt på ökad aktivitet.',
    },
    Theme_Stress: {
      text: 'Content specific to Stress...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'TCM rekommenderar regelbunden rörelse och motion för att upprätthålla tillräcklig Qi (energi) rörelse och flöde. Passande rörelse och motion kommer därför att föra Qi, främja nedbrytningen av mat, tarmrörelser och hormonproduktion. Genom regelbunden träning ökar det vitala flödet av Qi-energi, samtidigt som det minskar fuktighet inom kroppen. Fuktighet kan skada mjälteenergin och ses som övervikt, vilket kan påverka humöret genom att få individer att känna sig tröga, dimmiga i huvudet och till och med deprimerade.',
      secondText: 'Yin spelar en stor roll för mängden blod och andra vitala vätskor som finns i kroppen. Kraftig motion tömmer denna vitala energikälla och påverkar därför negativt fysisk och mental hälsa. Det är också viktigt att inte överanstränga kroppen med motion.',
    },
    // Add more themes as needed
  };

  // Get content based on the selectedTheme
  const content = contentByTheme[selectedTheme] || {};

  return (
      <View style={styles.wrapper}>
        {content.progressbarTitle && <Text>{content.progressbarTitle}</Text>}
      <Text style={styles.header}>Fysisk hälsa</Text>
      {content.text && <Text style={styles.text}>{content.text}</Text>}
      {content.secondText && <Text style={styles.text}>{content.secondText}</Text>}
      <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Övningar</Text>
        </View>  
    </View>
    );
  };
export default PhysicalHealth;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DBE4E7',
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
  secondaryHeaderContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',  // Add this line
    marginBottom: 10,
  },
  secondaryHeader: {
    textTransform: 'uppercase',
    marginLeft: 10,
},
});
