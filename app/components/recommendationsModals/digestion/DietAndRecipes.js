import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const DietAndRecipes = ({ selectedTheme, userId }) => {
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
      progressbarTitle: 'Mage & tarm',
      box1Header: 'Bra rutiner ',
      box1: 'Börja din dag med ett glas rumstempererat vatten med saften av en halv citron. Ta en nypa keltiskt havssalt och lägg det på tungan, drick 1 eller 2 glas vatten och vänta 15 minuter innan du äter frukost. Se till att alltid äta frukost och försök att äta vid ungefär samma tid varje dag för att skapa en rutin för din kropp. Det bästa är att inte hoppa över måltider och att äta alla måltider inom en 10-timmarsperiod och inte äta efter 18.30.', 
      box2Header: 'Matdagbok',
      box2: 'Det är inte bara VAD du äter som är viktigt. Även HUR du äter påverkar din hälsa. Ta dig tid att äta, sitt i en lugn miljö utan skärmar, och tugga mycket, så mycket att maten nästan blir flytande i munnen.\n\nOm du märker att magen påverkas olika beroende på vad du stoppar i dig så kan du skriva ned en matdagbok och hur du känner dig efter att du har ätit. Gör du detta under en månad kan du få ut mer information än du tror.',   
      box3Header: 'Fibrer och grönsaker',
      box3: 'En stor påverkan på magen är ju såklart vad du stoppar i dig. En aspekt är att få i sig tillräckligt med fiber. Den enklaste vägen är att äta 1-2 matskedar frön som linfrö, pumpakärnor och svarta sesamfrön, varje dag. Det bästa är att äta fröna malda. Även mörka bladgrönsaker innehåller mycket fibrer. Koka dom väl och krydda. Bönor och linser ger också fibertillskott men kan också orsaka matsmältningsbesvär så börja med små mängder och öka långsamt, blötlägg dom och byt vatten i minst 3 timmar innan du tillagar dom.\n\nSe till att du äter olika färger och typer av frukt och grönsaker. Prova små mängder som är välkokta först, undvik råa grönsaker helt. Sötpotatis, pumpa och squash är laddade med mineraler och utmärkta för tarmmikrobiomet. Ingefära, mangold, kokt grönkål och rödbetor är också bra livsmedel att ta med i din kost och gärna med ett glutenfritt spannmål till som ris.\n\nDet är även bra att inkludera surkål eller fermenterade grönsaker som innehåller pro- och prebiotika i din kost.', 
      box4Header: 'Mat att utesluta',
      box4: 'Du kan också testa att eliminera vissa livsmedel under en 8 veckors period för att se om du mår bättre:\n\nvitt socker\nmjölkprodukter\nalkohol\nkoffein\ngluten\nsoja', 
      box5: 'Du kan också testa att eliminera vissa livsmedel under en 8 veckors period för att se om du mår bättre:',
      addFirstRoutine: 'Drick vatten innan frukost',
      addSecondRoutine: 'Ät inte efter 18.30',
      addThirdRoutine: 'Skriv matdagbok',
      addFourthRoutine: 'Ät 1-2 matskedar frön varje dag',
      addFifthRoutine: 'Inkludera grönsaker i alla måltider',
    },
    Theme_Stress: {
      box1: 'Content specific to Stress...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'För att öka energin i mjälten är det viktigt att se över både när, hur och vad du äter.',
      secondaryHeader1: 'När ska jag äta?',
      text1: 'Försök äta vid ungefär samma tid varje dag, kroppen behöver rutin och ät helst alla tre måltider under en 10-timmarsperiod under dagen innan 18.30',
      secondaryHeader2: 'Hur ska jag äta?',
      text2: 'Stäng av datorn och telefonen, försök att hitta en lugn miljö att äta i. När du sätter dig ner för att äta, titta på maten, känn på maten och ta dig tid att äta. Tugga också maten ordentligt, tills den är nästan flytande i munnen. Ät alltid ditt protein före kolhydraterna på tallriken.',
      secondaryHeader3: 'Vad ska jag äta?',
      text3: 'Mjälten gillar INTE "fuktiga" eller "kalla" livsmedel. Att minska dessa och hålla dom till ett minimum är en bra grundregel för att lindra en trött mjälte.\nTa också en matsked rå, ofiltrerad äppelcidervinäger i ett glas rumstempererat vatten innan din måltid. Detta kan hjälpa till att reglera upptaget av glukos, särskilt när du äter kolhydrater.\nOm du känner att vad du äter påverkar dig mycket så håll gärna en matdagbok för att kunna förstå mer hur olika livsmedel påverkar din matsmältning och hur du mår överlag. Att göra detta under endast 1 månad kommer troligen ge dig mer insikter än du tror.\nHär får du tips på kost och livsmedel som är bra och som du ska undvika för att stärka mjältens energi. Tipsen står i prioordning.',
      box5: 'Test',
      addFirstRoutine: 'Ta en matsked rå, ofiltrerad äppelcidervinäger i ett glas rumstempererat vatten innan din måltid',
      addSecondRoutine: 'Ät alla tre måltider vid samma tid under en 10-timmarsperiod.',
      addThirdRoutine: 'För matdagbok varje dag',
    },
    // Add more themes as needed
  };

  // Get content based on the selectedTheme
  const content = contentByTheme[selectedTheme] || {};

  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
  });

  const [box5Text, setBox5Text] = useState('');

  const [showMore, setShowMore] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
  });

  const toggleShowMore = (box) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [box]: !prevShowMore[box],
    }));
  };

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
      return null
    }
    const isExpanded = expandedBoxes[box];
  const truncatedText = fullText.slice(0, 100) + (fullText.length > 100 ? '...' : '');


    const shouldApplyPadding = box !== 'box5'; // Exclude padding for box5

    const MyCheckBox = ({ label, checked, onChange, selectedTheme, userId }) => {
      const handleCheckBoxPress = async () => {
        try {
          const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
          await updateDoc(userDocRef, {
            [label]: !checked, // Save the state of the checkbox
          });
          onChange(); // Update the local state after Firestore update
        } catch (error) {
          console.error('Error updating checkbox state:', error);
        }
      };
    
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            checked={checked}
            onPress={handleCheckBoxPress}
            checkedIcon="check-circle"
            uncheckedIcon="circle-o"
            containerStyle={{ padding: 0, backgroundColor: 'transparent', borderWidth: 0 }}
            textStyle={{ color: 'black', marginLeft: 8 }}
            checkedColor="#709078"
          />
          <Text style={{ color: 'black', marginLeft: 8 }}>{label}</Text>
        </View>
      );
    };


    return (
      <View>
        {isExpanded ? (
          <View>
            <Text style={styles.listItem}>{fullText}</Text>
            {box === 'box5' && (
              <View style={{ paddingBottom: 20 }}>
                <MyCheckBox
                  label={content.addFirstRoutine}
                  checked={box5Options.option1}
                  onChange={() => handleOptionPress('option1')}
                  selectedTheme={selectedTheme}
                  userId={userId}
                />
                <MyCheckBox
                  label={content.addSecondRoutine}
                  checked={box5Options.option2}
                  onChange={() => handleOptionPress('option2')}
                  selectedTheme={selectedTheme}
                  userId={userId}
                />
                <MyCheckBox
                  label={content.addThirdRoutine}
                  checked={box5Options.option3}
                  onChange={() => handleOptionPress('option3')}
                  selectedTheme={selectedTheme}
                  userId={userId}
                />
                <MyCheckBox
                  label={content.addFourthRoutine}
                  checked={box5Options.option4}
                  onChange={() => handleOptionPress('option4')}
                  selectedTheme={selectedTheme}
                  userId={userId}
                />
                <MyCheckBox
                  label={content.addFifthRoutine}
                  checked={box5Options.option5}
                  onChange={() => handleOptionPress('option5')}
                  selectedTheme={selectedTheme}
                  userId={userId}
                />
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.listItem}>{truncatedText}</Text>
            {fullText.length > 100 && (
              <TouchableOpacity onPress={() => toggleBox(box)}>
                {/* You can add a button here if you want */}
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
    
  };

   const renderArrowIcon = (box) => {
          // Check if there is content for the specified box
          const hasContent = !!contentByTheme[selectedTheme]?.[box];
        
          return hasContent ? (
            expandedBoxes[box] ? (
              <Icon name="keyboard-arrow-up" style={styles.arrowIcon} />
            ) : (
              <Icon name="keyboard-arrow-down" style={styles.arrowIcon} />
            )
          ) : null;
        };

  return (
    <View style={styles.wrapper}>
       {content.progressbarTitle && <Text>{content.progressbarTitle}</Text>}
      <Text style={styles.header}>Kost och Recept</Text>
      {content.text && <Text>{content.text}</Text>}
      {content.secondaryHeader1 && <Text>{content.secondaryHeader1}</Text>}
      {content.text1 && <Text>{content.text1}</Text>}
      {content.secondaryHeader2 && <Text>{content.secondaryHeader2}</Text>}
      {content.text2 && <Text>{content.text2}</Text>}
      {content.secondaryHeader3 && <Text>{content.secondaryHeader3}</Text>}
      {content.text3 && <Text>{content.text3}</Text>}

      <TouchableOpacity onPress={() => toggleBox('box1')}>
        <View style={styles.row}>
          {content.box1Header && <Text style={styles.secondHeader}>{content.box1Header}</Text>}
          {renderArrowIcon('box1')}
        </View>
        {renderContent('box1', contentByTheme[selectedTheme]?.box1)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box2')}>
        <View style={styles.row}>
          {content.box2Header && <Text style={styles.secondHeader}>{content.box2Header}</Text>} 
          {renderArrowIcon('box2')}
        </View>
        {renderContent('box2', contentByTheme[selectedTheme]?.box2)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box3')}>
        <View style={styles.row}>
          {content.box3Header && <Text style={styles.secondHeader}>{content.box3Header}</Text>}
          {renderArrowIcon('box3')}
        </View>
        {renderContent('box3', contentByTheme[selectedTheme]?.box3)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box4')}>
        <View style={styles.row}>
          {content.box4Header && <Text style={styles.secondHeader}>{content.box4Header}</Text>}
          {renderArrowIcon('box4')}
        </View>
        {renderContent('box4', contentByTheme[selectedTheme]?.box4)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box5')}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FDF8F6',
          width: '100%', 
          marginTop: 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,

        }}>
          <Text style={styles.secondHeader}>
            Lägg till i min rutin
          </Text>
          {renderArrowIcon('box5')}
        </View>
        <View style={{ backgroundColor: '#FDF8F6', paddingRight: 10, paddingLeft: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 50, }}>
          {renderContent('box5', contentByTheme[selectedTheme]?.box5)}
        </View> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
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
   marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
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
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 30, 
    overflow: 'hidden',           
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  checkBoxText: {
    marginLeft: 0,
  },
});
export default DietAndRecipes;