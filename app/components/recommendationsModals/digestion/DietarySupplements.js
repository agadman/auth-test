import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const DietarySupplements = ({ selectedTheme, userId }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      progressbarTitle: 'Oro och ångest',
      text: 'Content specific to Anxiety...',
    },
    Theme_Fertility: {
      progressbarTitle: 'Fertilitet',
      text: 'Content specific to Fertility...',
    },
    Theme_Menopause: {
      progressbarTitle: 'Klimakteriet',
      text: 'Content specific to Menopause...',
    },
    Theme_PMS: {
      progressbarTitle: 'PMS',
      text: 'Content specific to PMS...',
    },
    Theme_SkinHair: {
      progressbarTitle: 'Hud och hår',
      text: 'Content specific to Skin & Hair...',
    },
    Theme_Sleep: {
      progressbarTitle: 'Sömn',
      text: 'Content specific to Sleep...',
    },
    Theme_StomachBowel: {
      progressbarTitle: 'Mage & tarm',
      text: 'Här får du tips på olika kosttillskott, tinkturer och örter som är bra för din mage och matsmältning. Du kan spara tipsen till din rutin så att du inte glömmer.',
      box1Header: 'Matsmältningsenzym',
      box1: 'Ta en tablett 15 minuter före varje måltid.\n\nMatsmältningsenzym innehåller enzymerna amylas, proteas och lipas som hjälper till att bryta ner kolhydrater, proteiner och fetter. Detta underlättar matsmältningen och absorptionen av näringsämnen o kan stötta optimal matsmältning och lindra matsmältningsbesvär.\n\nVi rekommenderar: Thorne, Advanced Digestive Enzymes, 180 Capsules',
      box2Header: 'Probiotika',
      box2: 'Ta en kapsel per dag.\n\nProbiotika introducerar gynnsamma bakterier i tarmen och är därför viktigt för att återställa tarmfloran, den naturliga balansen av tarmbakterier, som kan rubbas av  antibiotika eller sjukdom. Genom att främja en hälsosam tarmmikrobiom stöder probiotika matsmältningen, näringsupptaget, immunfunktionen och övergripande tarmhälsa. Ibland kan det vara nödvändigt att prova ett par olika probiotika innan man hittar rätt. Detta ovan är en av våra favoriter.\n\nVi rekommenderar: Innate Response',
      box3Header: 'Vitamin D3 med K2',
      box3: '2500 IE-5000 IE dagligen. Om möjligt testa dina nivåer och dosera lämpligt. Bäst att ta med eller efter en måltid som innehåller fett.\n\nVitamin D3 spelar en avgörande roll i att upprätthålla ett friskt immunsystem och minska inflammationen i tarmen och är därför nödvändigt för tarmhälsan. Det hjälper också till att reglera absorptionen av kalcium och andra mineraler, vilket är viktigt för tarmfunktionen. Tillräckliga nivåer av vitamin D3 har kopplats till en lägre risk för mag-tarmproblem och förbättrad tarmbarriärfunktion.\n\nVi rekommenderar: Thorne Vitamin D+K2 30 ml',
      box4Header: 'MSM (Metylsulfonylmetan)',
      box4: '1-3 g dagligen, lös upp pulvret i vatten. Ta efter mat, inte på tom mage.\n\nMSM hjälper till att säkerställa att vi har rätt svavelnivåer i kroppen som är väsentliga för övergripande hälsa, inklusive att upprätthålla integriteten i mag-tarmkanalen. Det är också en vital komponent i bildandet av kollagen, ett protein som ger struktur och styrka åt bindväv, inklusive de i tarmens slemhinna.\n\nVi rekommenderar: Thorne',
      box5Header: 'Örtlatte',
      box5: 'Drick efter middagen eller annan tid på dagen.\n\nInnehåller ingredienser som ger näring till mikrobiomet, lugnar inflammation och hjälper till att "värma mitten", dvs att främja en hälsosam matsmältning och näringsupptag. Ingrediensen Chaga är en källa till mineralerna; zink, koppar, järn och mangan. Den har egenskaper som skyddar mag-tarmkanalen, har en positiv inverkan på tarmens mikrobiom och hjälper till att bibehålla en stabil blodsockernivå.\n\nVi rekommenderar: Örtrikets örtlatte',
    },
    Theme_Stress: {
      progressbarTitle: 'Stress',
      text: 'Content specific to Stress...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'Här får du tips på olika kosttillskott som är bra för att stärka mjältens energi.\n\nDet finns många olika tillskott att testa och därför har vi delat upp dom i tre steg utifrån det som ger störst effekt på din hälsa.',
    },
    // Add more themes as needed
  };

  const content = contentByTheme[selectedTheme] || {};

  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
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
        <Text style={styles.header}>Kosttillskott</Text>
        {content.text && <Text>{content.text}</Text>}
      </View>
      {['box1', 'box2', 'box3', 'box4', 'box5'].map((box) => (
  // Check if the box is defined in contentByTheme[selectedTheme]
  contentByTheme[selectedTheme]?.[box] && (
    <View key={box} style={styles.box}>
      
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleBox(box, true)}>
            <Text style={styles.icon}>
              <Icon name="favorite" style={styles.heartIcon} />
            </Text>
          </TouchableOpacity>
          <Text style={styles.secondHeader}>
            {contentByTheme[selectedTheme]?.[`${box}Header`] || ''}
          </Text>
        <TouchableOpacity onPress={() => toggleBox(box, false)}>
          <View style={styles.row}>
            {renderArrowIcon(box)}
          </View>
        </TouchableOpacity>
      </View>

      {/* Check if content exists before rendering */}
      {contentByTheme[selectedTheme]?.[box] && (
        <View style={styles.content}>
          {expandedBoxes[box] && <Text style={styles.text}>{contentByTheme[selectedTheme][box]}</Text>}
        </View>
      )}
    </View>
  )
))}
    </View>
  );
};
export default DietarySupplements;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EDDAD5',
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
