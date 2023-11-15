import React from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable, ImageBackground } from 'react-native';
import BoxContainer from '../components/BoxContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../components/Colors';

const Explore = () => {
  const navigation = useNavigation();

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.introductoryBox}>
          <Text style={styles.header}>Upptäck</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Sök..."
            />
            <Pressable style={styles.searchIconContainer}>
              <Icon name="search" size={20} color="#000" />
            </Pressable>
          </View>
        </View>
        <View style={styles.firstBox}>
          <ImageBackground
            source={require('../../assets/explore_box_background.jpg')}
            style={styles.boxBackground}>
            <Text style={styles.findQuizText}>Hitta ditt personliga hälsomönster</Text>
            <Pressable style={styles.quizBtn}>
              <Text style={styles.quizBtnText}>Gör quiz</Text>
            </Pressable>
          </ImageBackground>
        </View>
        <View>
          <Text style={styles.yourHealthHeaderText}>Berätta om din hälsa</Text>
          <Text>Gör ett quiz för att få en personlig helhetsbild och rekommendationer för att må bra</Text>
        </View>
        <BoxContainer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: COLORS.background,
  },
  introductoryBox: {
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    paddingBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    paddingLeft: 10,
  },
  searchIconContainer: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  firstBox: {
    width: '90%',
    aspectRatio: 1.5,
    overflow: 'hidden',
    borderRadius: 10,
  },
  boxBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  findQuizText: {
    color: COLORS.white,
    fontSize: 30,
    textAlign: 'center',
  },
  quizBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 20,
    width: '75%',
    marginTop: 20,
  },
  quizBtnText: {
    color: COLORS.white,
  },
  yourHealthHeaderText: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  }
});

export default Explore;
