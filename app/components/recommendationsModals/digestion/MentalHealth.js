import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MentalHealth = ({ selectedTheme }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      box1: 'Content specific to Anxiety...',
    },
    Theme_Fertility: {
      box1: 'Content specific to Fertility...',
    },
    Theme_Menopause: {
      box1: 'Content specific to Menopause...',
    },
    Theme_PMS: {
      box1: 'Content specific to PMS...',
    },
    Theme_SkinHair: {
      box1: 'Content specific to Skin & Hair...',
    },
    Theme_Sleep: {
      box1: 'Content specific to Sleep...',
    },
    Theme_StomachBowel: {
      box1: 'Att återansluta, vila och lugna systemet är nyckeln till läkning, särskilt för matsmältningen.\n\n Försök att göra följande andningsövning minst 2 gånger om dagen i 5 minuter varje gång. Det är bra att öva innan du går och lägger dig och när du vaknar. Om möjligt, försök öka antalet gånger du gör detta dagligen.\n\n Hitta en bekväm sittande eller liggande position på en lugn plats. Andas in djupt genom näsan och ner i magen medan du räknar till 4. Håll andan och räkna till 6. Andas ut långsamt genom munnen med puckereda läppar (som genom ett sugrör) och räkna till 8.\n\n Det kan verka lite svårt i början, men att öva några andetag om dagen kommer att ge dig ett lugn samt positiv effekt på nervus vagus (kranial nerv X). När vi tonifierar denna nerv kan vi förbättra och reglera matsmältningen.',
      box2: 'Lägg dig ner på en varm och bekvämt plats för att utföra massageövningen.  Den här övningen förbättrar blodcirkulationen till matsmältningsorganen och tarmarna och förbättrar leverns funktion.\n\n Gör så här: \n\n\u2022 Gnugga ricinolja över hela magen\n\n\u2022 Täck magen med en ren trasa eller använd ett medicinsk varmbandage\n\n\u2022 Vira en ren handduk runt din mage för att ytterligare isolera det\n\n\u2022 Placera en varmvattenflaska eller en värmedyna på handduken och håll den på magen i 45 minuter\n ',   
    },
    Theme_Stress: {
      box1: 'Content specific to Stress...',
    },
    // Add more themes as needed
  };

  const content = contentByTheme[selectedTheme] || {};

  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
  });

  const toggleBox = (box) => {
    setExpandedBoxes((prevState) => ({
      ...prevState,
      [box]: !prevState[box],
    }));
  };

  const renderContent = (box, fullText) => {
    return (
      <View style={styles.content}>
        {expandedBoxes[box] && (
          <Text style={styles.text}>
            {fullText}
          </Text>
        )}
      </View>
    );
  };

  const renderArrowIcon = (box) => {
    return expandedBoxes[box] ? (
      <Icon name="keyboard-arrow-up" style={styles.arrowIcon} />
    ) : (
      <Icon name="keyboard-arrow-down" style={styles.arrowIcon} />
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.introText}>
        <Text style={styles.header}>Mental hälsa</Text>
        <Text>
          Ingress
        </Text>
      </View>

      <TouchableOpacity onPress={() => toggleBox('box1')} style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.icon}>
            <Icon name="favorite" style={styles.heartIcon} />
          </Text>
          <Text style={styles.secondHeader}>
            Andningsövning
          </Text>
          {renderArrowIcon('box1')}
        </View>
        {renderContent('box1', contentByTheme[selectedTheme]?.box1)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box2')} style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.icon}>
            <Icon name="favorite" style={styles.heartIcon} />
          </Text>
          <Text style={styles.secondHeader}>
            Massage
          </Text>
          {renderArrowIcon('box2')}
        </View>
        {renderContent('box2', contentByTheme[selectedTheme]?.box2)} 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E1D8CE',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  introText: {
    marginBottom: 30,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  heartIcon: {
    fontSize: 24,
    color: 'lightgrey',
  },
  secondHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  content: {
    marginTop: 10,
  },
  text: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 5,
    fontSize: 24,
  },
});

export default MentalHealth;
