import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { CheckBox } from 'react-native-elements';

const PhysicalHealth = ({ selectedTheme, userId }) => {
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
      text: 'Träning handlar inte bara om att få starka muskler eller att påverka din vikt, utan har också bra fördelar för matsmältningen som vi inte alltid tänker på.\n\nFysisk aktivitet ger en signal till vår kropp att den ska hålla sig aktiv på mer än ett sätt. Precis som våra hjärtan pumpar snabbare och våra lungor arbetar hårdare under träning, reagerar vårt matsmältningssystem också positivt på ökad aktivitet.\n\nFysisk träning kan okcså öka antalet gynnsamma mikrobiella arter, berika mångfalden av mikroflora och förbättra utvecklingen av samlevande bakterier. Alla dessa effekter är fördelaktiga och förbättrar den övergripande hälsostatusen. Det kan också öka cirkulationen till matsmältningsorganen och förbättra ämnesomsättningen.',
      box1Header: 'Magpass',
      box1: 'Aerobisk träning\nAll aerobisk träning ökar blodflödet till tarmarna och förbättrar matsmältningen genom att, tarmrörelserna, ökar. Bra val är löpning, cykling och simning. Även styrketräning för magen där det intra- abdominala trycket ökar förbättrar tarmrörelserna, sit-ups, plankan och sneda crunches med vikt stimulerar tarmrörelsena och motverkar förstoppning. ',
      box2Header: 'Yogapass för matsmältning',
      box2: 'Meditativ träning\nAll meditativ aktivitet som till exempel yoga dämpar det sympatiska stressystemet. Stress hindrar blodflöde till tarmarna och utsöndring av matsmältningsenzymer.',  
      box3Header: 'Qi Gong Mage',
      box3: 'Qi Gong\nTesta Qi gong-övningen av 8 brokader, som är specifikt anpassad för elementet jord (matsmältning).',   
    },
    Theme_Stress: {
      text: 'Content specific to Stress...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'TCM rekommenderar regelbunden rörelse och motion för att upprätthålla tillräcklig Qi (energi) rörelse och flöde. Passande rörelse och motion kommer därför att föra Qi, främja nedbrytningen av mat, tarmrörelser och hormonproduktion. Genom regelbunden träning ökar det vitala flödet av Qi-energi, samtidigt som det minskar fuktighet inom kroppen. Fuktighet kan skada mjälteenergin och ses som övervikt, vilket kan påverka humöret genom att få individer att känna sig tröga, dimmiga i huvudet och till och med deprimerade.\n\nYin spelar en stor roll för mängden blod och andra vitala vätskor som finns i kroppen. Kraftig motion tömmer denna vitala energikälla och påverkar därför negativt fysisk och mental hälsa. Det är också viktigt att inte överanstränga kroppen med motion.',
    },
    // Add more themes as needed
  };

  // Get content based on the selectedTheme
  const content = contentByTheme[selectedTheme] || {};

  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
  });
  const [checkedBoxes, setCheckedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setExpandedBoxes(userData.expandedBoxes || {});
          setCheckedBoxes(userData.checkedBoxes || {});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userId, selectedTheme]);  

  const toggleBox = async (box, isCheckbox) => {
    const headerKey = `${box}Header`;
  
    if (isCheckbox) {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
        await updateDoc(userDocRef, {
          [box]: contentByTheme[selectedTheme][box], // Save the content
          [headerKey]: contentByTheme[selectedTheme][headerKey], // Save the header
        });
  
        // Toggle the checkbox state in local state
        setCheckedBoxes((prevState) => ({
          ...prevState,
          [box]: !prevState[box],
        }));
  
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
  
  const renderCheckboxIcon = (box) => {
    return (
      <CheckBox
        checked={checkedBoxes[box]}
        onPress={() => toggleBox(box, true)}
        checkedIcon="check-circle"
        uncheckedIcon="circle-o"
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedColor="#709078" // Set the color for the checkmark
      />
    );
  };

  const renderArrowIcon = (box) => {
    return (
      <TouchableOpacity onPress={() => toggleBox(box, false)}>
        <View style={styles.headerArrow}>
          <Text style={styles.secondHeader}>
            {contentByTheme[selectedTheme]?.[`${box}Header`] || ''}
          </Text>
          <View style={styles.arrowContainer}>
            {expandedBoxes[box] ? (
              <Icon name="keyboard-arrow-up" style={styles.arrowIcon} />
            ) : (
              <Icon name="keyboard-arrow-down" style={styles.arrowIcon} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderContent = (box, fullText) => {
    return (
      <View>
        {expandedBoxes[box] && <Text style={styles.text}>{fullText}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {content.progressbarTitle && <Text>{content.progressbarTitle}</Text>}
      <Text style={styles.header}>Fysisk hälsa</Text>
      {content.text && <Text style={styles.introText}>{content.text}</Text>}
      {['box1', 'box2', 'box3'].map((box) => (
        // Check if the box is defined in contentByTheme[selectedTheme]
        contentByTheme[selectedTheme]?.[box] && (
          <View key={box} style={styles.box}>
            <View style={styles.row}>
              {renderCheckboxIcon(box)}
              {renderArrowIcon(box)}
            </View>

            {/* Check if content exists before rendering */}
            {contentByTheme[selectedTheme]?.[box] && renderContent(box, contentByTheme[selectedTheme][box])}
          </View>
        )
      ))}
    </View>
    );
  };
export default PhysicalHealth;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DBE4E7',
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    marginTop: 20,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 10,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    color: 'black',
    marginLeft: 8,
  },
  secondHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 10,
  },
  headerArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
  arrowIcon: {
    marginLeft: 5,
    fontSize: 24,
  }, 
});
