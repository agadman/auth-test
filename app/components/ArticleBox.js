// ArticleBox.js
import React from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { COLORS } from './Colors';  // Adjust the path accordingly

const ArticleBox = ({ title, onPress, backgroundImage, boxWidth }) => {
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={backgroundImage} // Pass the image source as a prop
        style={{ ...styles.articleBox, width: boxWidth }}
      >
      </ImageBackground>
      <Text style={styles.articleText}>{title}</Text>
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
    overflow: 'hidden', // Ensure the border-radius works with the image
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add an overlay to make text readable
    flex: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleText: {
    textAlign: 'left',
    marginLeft: 10,
  },
};

export default ArticleBox;
