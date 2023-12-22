import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DietAndRecipesTwo = () => {
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
        {renderContent(
          'box1',
          'Överväg att göra congee (gröt) en gång i veckan. Detta är en risgröt som är uppvärmande och lugnande för tarmarna. Detta är ett recept. Du kan hitta hundratals online.\n\n'
        )}
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
