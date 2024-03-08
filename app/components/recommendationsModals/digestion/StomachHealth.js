import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StomachHealth = ({ selectedTheme }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      progressbarTitle: 'Oro och ångest',
      header: 'Oro och ångest',
      text: 'Text om oro och ångest kommer...',
    },
    Theme_Fertility: {
      progressbarTitle: 'Fertilitet',
      header: 'Fertilitet',
      text: 'Text om fertilitet kommer...',
    },
    Theme_Menopause: {
      progressbarTitle: 'Klimakteriet',
      header: 'Klimakteriet',
      text: 'Text om klimakteriet kommer...',
    },
    Theme_PMS: {
      progressbarTitle: 'PMS',
      header: 'PMS',
      text: 'Text om PMS kommer...',
    },
    Theme_SkinHair: {
      progressbarTitle: 'Hud och hår',
      header: 'Hud och hår',
      text: 'Text om hud och hår kommer...',
    },
    Theme_Sleep: {
      progressbarTitle: 'Sömn',
      header: 'Sömn',
      text: 'Text om Sömn kommer...',
    },
    Theme_StomachBowel: {
      progressbarTitle: 'Mage & tarm',
      header: 'Maghälsa',
      text: 'Problem med mage och tarm handlar oftast om två saker, vad du stoppar i dig och hur din vardag ser ut. Äter du regelbundet? Tar du dig tid att äta i lugn och ro? Ser du till att få i dig kost som hjälper din mage? Finns det utrymme för träning och återhämtning? Alla dessa delar är viktiga för att matsmältningen ska fungera.',
      secondText: 'Mycket handlar om bra rutiner och tid för lugn och ro. Här får du tips om vad du kan göra inom kost, kosttillskott, mental hälsa och fysisk hälsa.',
    },
    Theme_Stress: {
      progressbarTitle: 'Stress',
      header: 'Stress',
      text: 'Text om stress kommer...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
      header: 'Mjälten - The Transformer',
      text: 'Mjälten är ett av kroppens centrala organ och har en nyckelroll i vår kropp. Inom Traditionell Kinesisk medicin (TCM) så anses den bidra till att:',
      box1Header: 'Omvandla energi och producera blod',
      box1: 'Mjälten omvandlar mat och vätskor till livsenergi , som inom TCM kallas Qi, och transporterar det till resten av kroppen. Den spelar en avgörande roll för vår matsmältning genom att se till att vi absorberar näringsämnena från det vi äter.\n\nMjälten är även viktig för att producera och reglera blod. Den extraherar energi från maten och omvandlar det till blod, vilket är viktigt för att stötta näringsupptag och kroppens övergripande hälsa.',
      box2Header: 'Stärka immunförsvar och vätskebalans',
      box2: 'Mjälten är en viktig del av kroppens immunsystem och bidrar till produktionen av Wei Qi, vilket inom TCM är en skyddande energi mot externa patogener, som bakterier och virus.\n\nMjälten hjälper också till att att upprätthålla en bra balans av vätska i kroppen och förebygga problem som ödem eller överdriven svettning.',
      box3Header: 'Skapa välbefinnande',
      box3: 'Mjälten anses vara kopplad till intellekt och känslor. En sund mjälte bidrar till klart tänkande, koncentration och emotionell stabilitet.\n\nMycket överanalyserande och oro kan skada mjältens funktion av både transport och omvandling, och absorption av näringsämnen. Det kan sakta ner rörelsen av vätskor i kroppen och skapa stagnation i vår kroppp som vi måste få igång igen.',
      box4Header: 'Balansera  menstrationscykeln',
      box4: 'Mjälten styr de flesta energiprocesserna i kroppen, transporterar och omvandlar den mat vi äter till Qi, blod, näringsämnen och andra typer avenergi, och håller blodet flödande i kärlen. Mjälten är också ansvarig för produktion av sköldkörtelhormon och progesteron som påverkar lutealfasen. Mjälten måste därför fungera optimalt för att vi kvinnor ska ha en hälsosam menstruationscykel.\n\nOm mjälten blir dysfunktionell kommer Qi och blod att vara otillräckliga vilket kan leda till problem som lätta eller uteblivna menstruationsblödningar, kraftiga blödningar, kort lutealfas, tunn livmoderslemhinna och låga progesteronnivåer. Detta kan tillslut leda till dålig blodtillförsel till reproduktionssystemet vilket kan orsaka fertilitet.',
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
  });

  const toggleBox = (box) => {
    setExpandedBoxes((prevState) => ({
      ...prevState,
      [box]: !prevState[box],
    }));
  };

  const renderContent = (box, fullText) => {
    if (!fullText) {
      return null;
    }
    return (
      <View>
        {expandedBoxes[box] && (
          <View>
            {fullText && (
              <Text style={styles.listItem}>
                 {fullText.endsWith(".") || fullText.endsWith(":") ? fullText : fullText + "."}
              </Text>
            )}
          </ View>     
            )}
        </View>
        )}

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
      {content.header && <Text style={styles.header}>{content.header}</Text>}
      {content.text && <Text style={styles.text}>{content.text}</Text>}
      {content.secondText && <Text style={styles.text}>{content.secondText}</Text>}
      <TouchableOpacity onPress={() => toggleBox('box1')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            {content.box1Header}
          </Text>
          {renderArrowIcon('box1')}
        </View>
        {renderContent('box1', contentByTheme[selectedTheme]?.box1)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box2')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            {content.box2Header}
          </Text>
          {renderArrowIcon('box2')}
        </View>
        {renderContent('box2', contentByTheme[selectedTheme]?.box2)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box3')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            {content.box3Header}
          </Text>
          {renderArrowIcon('box3')}
        </View>
        {renderContent('box3', contentByTheme[selectedTheme]?.box3)} 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleBox('box4')}>
        <View style={styles.row}>
          <Text style={styles.secondHeader}>
            {content.box4Header} 
          </Text>
          {renderArrowIcon('box4')}
        </View>
        {renderContent('box4', contentByTheme[selectedTheme]?.box4)} 
      </TouchableOpacity>
    </View>
  );
};
export default StomachHealth;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F1ECEA',
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
  secondHeader: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,

  },
  arrowIcon: {
    fontSize: 24,
  },
});