import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const DietAndRecipesTwo = ({ selectedTheme, userId }) => {
    // Define content based on the selectedTheme
    const contentByTheme = {
      Theme_Anxiety: {
        box1Header: '',
        box1: 'Content specific to Anxiety...',
        box2Header: '',
        box2: '',
      },
      Theme_Fertility: {
        box1Header: '',
        box1: 'Content specific to Fertility...',
        box2Header: '',
        box2: '',
      },
      Theme_Menopause: {
        box1Header: '',
        box1: 'Content specific to Menopause...',
        box2Header: '',
        box2: '',
      },
      Theme_PMS: {
        box1Header: '',
        box1: 'Content specific to PMS...',
        box2Header: '',
        box2: '',
      },
      Theme_SkinHair: {
        box1Header: '',
        box1: 'Content specific to Skin & Hair...',
        box2Header: '',
        box2: '',
      },
      Theme_Sleep: {
        box1Header: '',
        box1: 'Content specific to Sleep...',
        box2Header: '',
        box2: '',
      },
      Theme_StomachBowel: {
        progressbarTitle: 'Mage & tarm',
        fav1Header: 'Congeegröt (risgröt)',
        fav1: 'Överväg att göra congee (gröt) en gång i veckan. Detta är en risgröt som är uppvärmande och lugnande för tarmarna. Detta är ett recept. Du kan hitta hundratals online.\n\n1 kopp kortkornigt vitt ris (eller vilket ris som helst som fungerar för dig)\n7-10 koppar vatten/benbuljong/grönsaksbuljong\nSalt efter smak i slutet\nSteg 1: Tvätta riset i ett durkslag\nSteg 2: Lägg ris och vatten i en stor kastrull (2 delar vatten, 1 del ris)\nSteg 3: Koka upp och låt sedan sjuda i 1,5 timme, rör om ofta\nSteg 4: Lägg till önskade ingredienser och salt i slutet\nSteg 5: Njut!\nAnpassa efter ditt tycke!\nLägg till protein: kyckling, fläsk, nötkött, ägg etc..\nLägg till grönsaker: kål, morötter, selleri, pumpa, butternut squash etc...\nLägg till garnering: ingefära, salladslök eller rättika, sesamfrön etc...',
        fav2Header: 'Buljong',
        fav2: 'Ingredienser:\n\n1 kycklingskrov eller ben från ungefär 1 kg kyklingklubbor eller liknande (du kan använda andra ben också)\n1,5 liter vatten\n1-2 msk vinäger\n1 msk salt\n1 gul lök\n3 morot\n2 stjälkar Selleri\n\nSjud cirka 5-8 timmar en ledig dag, du kan späda med mera vatten och salta extra efter smak. Sila av grönsaker och ben. Buljongen håller minst 1 vecka i kylen.',   
      },
      Theme_Stress: {
        box1Header: '',
        box1: 'Content specific to Stress...',
        box2Header: '',
        box2: '',
      },
      Theme_Mjälte: {
        box1Header: '',
        progressbarTitle: 'Mitt hälsopaket',
        box2Header: '',
        box2: '',
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

  const toggleBox = async (fav, isHeartIcon) => {
    const favIndex = ['fav1', 'fav2'].indexOf(fav);
    const contentKey = `fav${favIndex + 1}`;
    const headerKey = `fav${favIndex + 1}Header`;
  
    if (isHeartIcon) {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
  
        const contentToSave = contentByTheme[selectedTheme]?.[contentKey] || '';
        const headerToSave = contentByTheme[selectedTheme]?.[headerKey] || '';
  
        const updateData = {
          [contentKey]: contentToSave,
          [headerKey]: headerToSave,
        };
  
        await setDoc(
          userDocRef,
          updateData,
          { merge: true }
        );
  
        console.log(`Content and header for ${fav} saved to Firestore`);
      } catch (error) {
        console.error('Error setting content and header:', error);
      }
    } else {
      setExpandedBoxes((prevState) => ({
        ...prevState,
        [fav]: !prevState[fav],
      }));
    }
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
    const boxIndex = ['box1', 'box2'].indexOf(box);
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
        <Text style={styles.header}>Recept</Text>
        <Text>
          Här har vi samlat några recept som är bra för din mage och tarm. Om du vill spara ett recept kan du hjärtmarkera det och hitta det i din receptsamling i din profil.
        </Text>
      </View>

      {['fav1', 'fav2'].map((fav) => (
  // Check if the fav is defined in contentByTheme[selectedTheme]
  contentByTheme[selectedTheme]?.[fav] && (
    <View key={fav} style={styles.box}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => toggleBox(fav, true)}>
          <Text style={styles.icon}>
            <Icon name="favorite" style={styles.heartIcon} />
          </Text>
        </TouchableOpacity>
        <View style={styles.headerAndArrow}>
        <Text style={styles.secondHeader}>
          {contentByTheme[selectedTheme]?.[`${fav}Header`] || ''}
        </Text>
        <TouchableOpacity onPress={() => toggleBox(fav, false)}>

            {renderArrowIcon(fav)}
        
        </TouchableOpacity>
        </View>
      </View>

      {/* Check if content exists before rendering */}
      {contentByTheme[selectedTheme]?.[fav] && (
        <View style={styles.content}>
          {expandedBoxes[fav] && <Text style={styles.text}>{contentByTheme[selectedTheme][fav]}</Text>}
        </View>
      )}
    </View>
  )
))}

    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DDE5DF',
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
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
    marginTop: 0,
  },
  text: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAndArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1, 
  },
  arrowIcon: {
    fontSize: 24,
  },
});

export default DietAndRecipesTwo;
