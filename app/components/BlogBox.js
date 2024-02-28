import React from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from './Colors';  // Adjust the path accordingly

const BlogBox = ({ title, name, date, text, imageSource }) => {
  const handleComingSoonPress = () => {
    // Display an alert when the add-circle-outline icon is pressed
    Alert.alert('Den här funktionen kommer snart!');
  };
  return (
    <Pressable onPress={() => handleComingSoonPress()}>
      <View style={{ ...styles.blogBox, backgroundColor: COLORS.white }}>
        {/* Image in the top-left corner */}
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        {/* Title, name, and date */}
        <View style={styles.contentContainer}>
          <View style={styles.blogHeader}>
            <Text style={styles.blogTitle}>{title}</Text>
            <Text style={styles.blogSubtitle}>{`${name} | ${date}`}</Text>
          </View>
     
        </View>
             {/* Blog text */}
             <Text style={styles.blogText}>{text}</Text>
        {/* Bottom icons */}
        <View style={styles.bottomIcons}>
          <Icon name="heart-outline" size={20} style={styles.icon} />
          <Icon name="chatbox-outline" size={20} style={styles.icon} />
          <Icon name="share-social-outline" size={20} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = {
  blogBox: {
    margin: 10,
    borderRadius: 10,
    padding: 15,
    // Adjust other styles as needed
  },
  imageContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 25,  // Adjust the borderRadius according to your design
    overflow: 'hidden',
  },
  image: {
    width: 50,  // Adjust the width and height according to your design
    height: 50,
    borderRadius: 25,  // Should be half of the width and height
  },
  contentContainer: {
    marginLeft: 70,  // Adjust the margin to create space for the image
  },
  blogHeader: {
    marginBottom: 10,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: 'bold',

  },
  blogSubtitle: {
    fontSize: 10,
  },
  blogText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10, 
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  // Align icons to the left
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,  // Add some left margin for space
  },
  icon: {
    marginRight: 20,  // Add margin between icons
  },
};

export default BlogBox;
