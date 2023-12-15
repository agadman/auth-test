import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DietAndRecipes = () => {
  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
  });

  const toggleBox = (box) => {
    setExpandedBoxes((prevState) => ({
      ...prevState,
      [box]: !prevState[box],
    }));
  };

  const renderContent = (box, fullText) => {
    const firstSentenceEnd = fullText.search(/[.:]/);
    const firstSentence = firstSentenceEnd !== -1 ? fullText.slice(0, firstSentenceEnd + 1) : fullText.trim();
    const restOfText = firstSentenceEnd !== -1 ? fullText.slice(firstSentenceEnd + 1).trim() : '';
  
    return (
      <View>
        <Text style={styles.text}>
          {firstSentence}
        </Text>
        {expandedBoxes[box] && restOfText && (
          <Text style={styles.listItem}>
            {restOfText.endsWith(".") || restOfText.endsWith(":") ? restOfText : restOfText + "."}
          </Text>
        )}
      </View>
    );
  };
  

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Kost och Recept</Text>

      <TouchableOpacity onPress={() => toggleBox('box1')}>
        <View>
          <Text style={styles.secondHeader}>Bra rutiner</Text>
          {renderContent(
            'box1',
            'Börja din dag med ett glas rumstempererat vatten med saften av en halv citron. Ta en nypa keltiskt havssalt och lägg det på tungan, drick 1 eller 2 glas vatten och vänta 15 minuter innan du äter frukost. Se till att alltid äta frukost och försök att äta vid ungefär samma tid varje dag för att skapa en rutin för din kropp. Det bästa är att inte hoppa över måltider och att äta alla måltider inom en 10-timmarsperiod och inte äta efter 18.30.'
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box2')}>
        <View>
          <Text style={styles.secondHeader}>Matdagbok</Text>
          {renderContent(
            'box2',
            'Det är inte bara VAD du äter som är viktigt. Även HUR du äter påverkar din hälsa. Ta dig tid att äta, sitt i en lugn miljö utan skärmar, och tugga mycket, så mycket att maten nästan blir flytande i munnen. Om du märker att magen påverkas olika beroende på vad du stoppar i dig så kan du skriva ned en matdagbok och hur du känner dig efter att du har ätit. Gör du detta under en månad kan du få ut mer information än du tror.'
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box3')}>
        <View>
          <Text style={styles.secondHeader}>Fibrer och grönsaker</Text>
          {renderContent(
            'box3',
            'En stor påverkan på magen är ju såklart vad du stoppar i dig. En aspekt är att få i sig tillräckligt med fiber. Den enklaste vägen är att äta 1-2 matskedar frön som linfrö, pumpakärnor och svarta sesamfrön, varje dag. Det bästa är att äta fröna malda. Även mörka bladgrönsaker innehåller mycket fibrer. Koka dom väl och krydda. Bönor och linser ger också fibertillskott men kan också orsaka matsmältningsbesvär så börja med små mängder och öka långsamt, blötlägg dom och byt vatten i minst 3 timmar innan du tillagar dom. Se till att du äter olika färger och typer av frukt och grönsaker. Prova små mängder som är välkokta först, undvik råa grönsaker helt. Sötpotatis, pumpa och squash är laddade med mineraler och utmärkta för tarmmikrobiomet. Ingefära, mangold, kokt'
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box4')}>
        <View>
          <Text style={styles.secondHeader}>Mat att utesluta</Text>
          {renderContent(
            'box4',
            'Du kan också testa att eliminera vissa livsmedel under en 8 veckors period för att se om du mår bättre: vitt socker\nmjölkprodukter\nalkohol\nkoffein\ngluten\nsoja'
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DietAndRecipes;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DDE5DF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 200,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  secondHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  listItem: {
    marginLeft: 20,
  },
});
