import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DietAndRecipesTwo = ({ selectedTheme }) => {
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
        box1: 'Överväg att göra congee (gröt) en gång i veckan. Detta är en risgröt som är uppvärmande och lugnande för tarmarna. Detta är ett recept. Du kan hitta hundratals online.\n\n',
        box2: 'Det är inte bara VAD du äter som är viktigt. Även HUR du äter påverkar din hälsa. Ta dig tid att äta, sitt i en lugn miljö utan skärmar, och tugga mycket, så mycket att maten nästan blir flytande i munnen.\n\nOm du märker att magen påverkas olika beroende på vad du stoppar i dig så kan du skriva ned en matdagbok och hur du känner dig efter att du har ätit. Gör du detta under en månad kan du få ut mer information än du tror.',   
        box3: 'En stor påverkan på magen är ju såklart vad du stoppar i dig. En aspekt är att få i sig tillräckligt med fiber. Den enklaste vägen är att äta 1-2 matskedar frön som linfrö, pumpakärnor och svarta sesamfrön, varje dag. Det bästa är att äta fröna malda. Även mörka bladgrönsaker innehåller mycket fibrer. Koka dom väl och krydda. Bönor och linser ger också fibertillskott men kan också orsaka matsmältningsbesvär så börja med små mängder och öka långsamt, blötlägg dom och byt vatten i minst 3 timmar innan du tillagar dom.\n\nSe till att du äter olika färger och typer av frukt och grönsaker. Prova små mängder som är välkokta först, undvik råa grönsaker helt. Sötpotatis, pumpa och squash är laddade med mineraler och utmärkta för tarmmikrobiomet. Ingefära, mangold, kokt grönkål och rödbetor är också bra livsmedel att ta med i din kost och gärna med ett glutenfritt spannmål till som ris.\n\nDet är även bra att inkludera surkål eller fermenterade grönsaker som innehåller pro- och prebiotika i din kost.', 
      },
      Theme_Stress: {
        text: 'Content specific to Stress...',
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
        <Text style={styles.header}>Recept</Text>
        <Text>
          Här har vi samlat några recept som är bra för din mage och tarm. Om du vill spara ett recept kan du hjärtmarkera det och hitta det i din receptsamling i din profil.
        </Text>
      </View>

      <TouchableOpacity onPress={() => toggleBox('box1')} style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.icon}>
            <Icon name="favorite" style={styles.heartIcon} />
          </Text>
          <Text style={styles.secondHeader}>
            Congee
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
            Buljong
          </Text>
          {renderArrowIcon('box2')}
        </View>
        {renderContent(
          'box2',
          'text...'
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box3')} style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.icon}>
            <Icon name="favorite" style={styles.heartIcon} />
          </Text>
          <Text style={styles.secondHeader}>
            Örtlatte
          </Text>
          {renderArrowIcon('box3')}
        </View>
        {renderContent(
          'box3',
          'text...'
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DDE5DF',
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

export default DietAndRecipesTwo;
