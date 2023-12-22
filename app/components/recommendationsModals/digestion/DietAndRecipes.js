import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DietAndRecipes = () => {
  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
  });

  const [box5Text, setBox5Text] = useState('');

  const toggleBox = (box) => {
    setExpandedBoxes((prevState) => ({
      ...prevState,
      [box]: !prevState[box],
    }));
  };

  const [box5Options, setBox5Options] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });


  const handleOptionPress = (option) => {
    setBox5Options((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const renderContent = (box, fullText) => {
    if (!fullText) {
      return null;
    }
  
    const firstSentenceEnd = fullText.search(/[.:]/);
    const firstSentence = firstSentenceEnd !== -1 ? fullText.slice(0, firstSentenceEnd + 1) : fullText.trim();
    const restOfText = firstSentenceEnd !== -1 ? fullText.slice(firstSentenceEnd + 1).trim() : '';
  
    const shouldApplyPadding = box !== 'box5'; // Exclude padding for box5

    // Display a limited number of words when the box is not expanded
  const displayText = expandedBoxes[box] ? restOfText : restOfText.split(' ').slice(0, 28).join(' ');

    return (
      <View>
        {expandedBoxes[box] && (
          <View style={{ paddingLeft: shouldApplyPadding ? 20 : 0, paddingRight: shouldApplyPadding ? 20 : 0 }}>
            {restOfText && (
              <Text style={styles.listItem}>
                {restOfText.endsWith(".") || restOfText.endsWith(":") ? restOfText : restOfText + "."}
              </Text>
            )}
            {box === 'box5' && (
              <View style={{ backgroundColor: 'white', padding: 10 }}>
                <RadioButton.Group
                onValueChange={(newValue) => {
                  // Handle the radio button value change here if needed
                }}
              >
              <Button style={styles.radioBtn}
                    icon={
                      box5Options.option1
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    onPress={() => handleOptionPress('option1')}
                  >
                      <Text style={{ color: 'black' }}>Drick vatten innan frukost</Text>
                  </Button>
                  <Button style={styles.radioBtn}
                    icon={
                      box5Options.option2
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    onPress={() => handleOptionPress('option2')}
                  >
                     <Text style={{ color: 'black' }}>Ät inte efter 18.30</Text>
                  </Button>
                  <Button style={styles.radioBtn}
                    icon={
                      box5Options.option3
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    onPress={() => handleOptionPress('option3')}
                  >
                    <Text style={{ color: 'black' }}>Skriv matdagbok</Text>
                  </Button>
                  <Button style={styles.radioBtn}
                    icon={
                      box5Options.option4
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    onPress={() => handleOptionPress('option4')}
                  >
                     <Text style={{ color: 'black' }}>Ät 1-2 matskedar frön varje dag</Text>
                  </Button>
                  <Button style={styles.radioBtn}
                    icon={
                      box5Options.option5
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    onPress={() => handleOptionPress('option5')}
                  >
                    <Text style={{ color: 'black' }}>Inkludera grönsaker i alla måltider</Text>
                  </Button>
              </RadioButton.Group> 
              </ View>     
            )}
          </View>
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
      <Text style={styles.header}>Kost och Recept</Text>

      <TouchableOpacity onPress={() => toggleBox('box1')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            Bra rutiner 
          </Text>
          {renderArrowIcon('box1')}
        </View>
        {renderContent(
          'box1',
          'Börja din dag med ett glas rumstempererat vatten med saften av en halv citron. Ta en nypa keltiskt havssalt och lägg det på tungan, drick 1 eller 2 glas vatten och vänta 15 minuter innan du äter frukost. Se till att alltid äta frukost och försök att äta vid ungefär samma tid varje dag för att skapa en rutin för din kropp. Det bästa är att inte hoppa över måltider och att äta alla måltider inom en 10-timmarsperiod och inte äta efter 18.30.'
        )} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box2')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            Matdagbok 
          </Text>
          {renderArrowIcon('box2')}
        </View>
        {renderContent(
          'box2',
          'Det är inte bara VAD du äter som är viktigt. Även HUR du äter påverkar din hälsa. Ta dig tid att äta, sitt i en lugn miljö utan skärmar, och tugga mycket, så mycket att maten nästan blir flytande i munnen.\n\nOm du märker att magen påverkas olika beroende på vad du stoppar i dig så kan du skriva ned en matdagbok och hur du känner dig efter att du har ätit. Gör du detta under en månad kan du få ut mer information än du tror.'
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box3')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            Fibrer och grönsaker 
          </Text>
          {renderArrowIcon('box3')}
        </View>
        {renderContent(
          'box3',
          'En stor påverkan på magen är ju såklart vad du stoppar i dig. En aspekt är att få i sig tillräckligt med fiber. Den enklaste vägen är att äta 1-2 matskedar frön som linfrö, pumpakärnor och svarta sesamfrön, varje dag. Det bästa är att äta fröna malda. Även mörka bladgrönsaker innehåller mycket fibrer. Koka dom väl och krydda. Bönor och linser ger också fibertillskott men kan också orsaka matsmältningsbesvär så börja med små mängder och öka långsamt, blötlägg dom och byt vatten i minst 3 timmar innan du tillagar dom.\n\nSe till att du äter olika färger och typer av frukt och grönsaker. Prova små mängder som är välkokta först, undvik råa grönsaker helt. Sötpotatis, pumpa och squash är laddade med mineraler och utmärkta för tarmmikrobiomet. Ingefära, mangold, kokt grönkål och rödbetor är också bra livsmedel att ta med i din kost och gärna med ett glutenfritt spannmål till som ris.\n\nDet är även bra att inkludera surkål eller fermenterade grönsaker som innehåller pro- och prebiotika i din kost.'
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box4')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            Mat att utesluta 
          </Text>
          {renderArrowIcon('box4')}
        </View>
        {renderContent(
          'box4',
          'Du kan också testa att eliminera vissa livsmedel under en 8 veckors period för att se om du mår bättre: vitt socker\nmjölkprodukter\nalkohol\nkoffein\ngluten\nsoja'
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box5')}>
        <View style={styles.whiteBox}>
          <Text style={styles.secondHeader}>
            Lägg till i min rutin
          </Text>
          {renderArrowIcon('box5')}
        </View>
        {renderContent('box5', 'Dummytext', 'Du kan också testa att eliminera vissa livsmedel under en 8 veckors period för att se om du mår bättre:')}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,  
    paddingTop: 20,
    paddingBottom: 200,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    paddingLeft: 20,
  },
  secondHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row', 
  },
  text: {
    marginBottom: 10,
  },
  listItem: {
   marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  whiteBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%', 
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,

  },
  arrowIcon: {
    marginLeft: 5, 
    fontSize: 24,
  },
  radioButtonContainer: {
    marginTop: 10,
  },
  radioBtn: {
    alignSelf: 'flex-start',
  }
  
});

export default DietAndRecipes;
