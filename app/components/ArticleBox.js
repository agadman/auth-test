// ArticleBox.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { COLORS } from './Colors';  // Adjust the path accordingly

const ArticleBox = ({ title, onPress, backgroundColor, boxWidth }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={{ ...styles.articleBox, backgroundColor, width: boxWidth }}>
        <Text style={styles.articleText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = {
  articleBox: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 8,
    height: 120,
  },
  articleText: {
    color: COLORS.white,
    textAlign: 'center',
  },
};

export default ArticleBox;
