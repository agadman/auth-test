import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const MentalHealth = ({ selectedTheme, userId }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      box1Header: 'Test',
      box1: 'Content specific to Anxiety...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Fertility: {
      box1Header: 'Test',
      box1: 'Content specific to Fertility...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Menopause: {
      box1Header: 'Test',
      box1: 'Content specific to Menopause...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_PMS: {
      box1Header: 'Test',
      box1: 'Content specific to PMS...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_SkinHair: {
      box1Header: 'Test',
      box1: 'Content specific to Skin & Hair...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Sleep: {
      box1Header: 'Test',
      box1: 'Content specific to Sleep...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_StomachBowel: {
      box1Header: 'Andningsövning',
      box1: 'Att återansluta, vila och lugna systemet är nyckeln till läkning, särskilt för matsmältningen.\n\n Försök att göra följande andningsövning minst 2 gånger om dagen i 5 minuter varje gång. Det är bra att öva innan du går och lägger dig och när du vaknar. Om möjligt, försök öka antalet gånger du gör detta dagligen.\n\n Hitta en bekväm sittande eller liggande position på en lugn plats. Andas in djupt genom näsan och ner i magen medan du räknar till 4. Håll andan och räkna till 6. Andas ut långsamt genom munnen med puckereda läppar (som genom ett sugrör) och räkna till 8.\n\n Det kan verka lite svårt i början, men att öva några andetag om dagen kommer att ge dig ett lugn samt positiv effekt på nervus vagus (kranial nerv X). När vi tonifierar denna nerv kan vi förbättra och reglera matsmältningen.',
      box2Header: 'Massage',
      box2: 'Lägg dig ner på en varm och bekvämt plats för att utföra massageövningen.  Den här övningen förbättrar blodcirkulationen till matsmältningsorganen och tarmarna och förbättrar leverns funktion.\n\n Gör så här: \n\n\u2022 Gnugga ricinolja över hela magen\n\n\u2022 Täck magen med en ren trasa eller använd ett medicinsk varmbandage\n\n\u2022 Vira en ren handduk runt din mage för att ytterligare isolera det\n\n\u2022 Placera en varmvattenflaska eller en värmedyna på handduken och håll den på magen i 45 minuter\n ',   
    },
    Theme_Stress: {
      box1Header: 'Test',
      box1: 'Content specific to Stress...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
    },
    // Add more themes as needed
  };

  const content = contentByTheme[selectedTheme] || {};

  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setExpandedBoxes(userData.expandedBoxes || {});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const toggleBox = async (box, isHeartIcon) => {
    const headerKey = `${box}Header`;
  
    if (isHeartIcon) {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
        await setDoc(
          userDocRef,
          {
            [box]: contentByTheme[selectedTheme][box], // Save the content
            [headerKey]: contentByTheme[selectedTheme][headerKey], // Save the header
          },
          { merge: true } // Add the merge option to update specific fields without overwriting the entire document
        );
  
        console.log(`Content and header for ${box} saved to Firestore`);
      } catch (error) {
        console.error('Error setting content and header:', error);
      }
    } else {
      setExpandedBoxes((prevState) => ({
        ...prevState,
        [box]: !prevState[box],
      }));
    }
  };
  
  
  const renderContent = (box, fullText) => {
    return (
      <View style={styles.content}>
        {expandedBoxes[box] && <Text style={styles.text}>{fullText}</Text>}
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
      {content.progressbarTitle && <Text>{content.progressbarTitle}</Text>}
      <View style={styles.introText}>
        <Text style={styles.header}>Mental hälsa</Text>
        <Text>Ingress</Text>
      </View>

     {['box1', 'box2'].map((box) => (
  <View key={box} style={styles.box}>
    <TouchableOpacity onPress={() => toggleBox(box, true)}>
      <View style={styles.row}>
        <Text style={styles.icon}>
          <Icon name="favorite" style={styles.heartIcon} />
        </Text>
        <Text style={styles.secondHeader}>
          {contentByTheme[selectedTheme]?.[`${box}Header`] || ''}
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => toggleBox(box, false)}>
      <View style={styles.row}>
        {renderArrowIcon(box)}
      </View>
    </TouchableOpacity>

    {renderContent(box, contentByTheme[selectedTheme]?.[box])}
  </View>
))}


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
