import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import SVG from '../../assets/icons/logo.svg'

const AllAboutBox = ({ text, onPress }) => {
  

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.boxContainer}>
        <View style={styles.boxContent}>
          {/* Use SvgXml to render the SVG image */}
          <Image source={SVG} style={styles.logoImage} />
          <Text style={styles.boxText}>{text}</Text>
        </View>
        <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
  },
  boxContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  boxText: {
    fontSize: 16,
    color: '#333',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  logoImage: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
});

export default AllAboutBox;
