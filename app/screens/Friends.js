import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable, ImageBackground, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../components/Colors';
import Experts from '../components/Experts';
import BlogBox from '../components/BlogBox';
import ArticleBox from '../components/ArticleBox';

const Friends = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const boxWidth = (windowWidth - 60) / 2; // Define boxWidth locally

  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showAllGroups, setShowAllGroups] = useState(false); 

  const handleToggleBlogs = () => {
    // Toggle the state to show/hide all blogs
    setShowAllBlogs(!showAllBlogs);
  };

  const handleToggleArticles = () => {
    // Toggle the state to show/hide all articles
    setShowAllArticles(!showAllArticles);
  };

  const handleToggleGroups = () => {
    // Toggle the state to show/hide all groups
    setShowAllGroups(!showAllGroups);
  };

  const handleComingSoonPress = () => {
    // Display an alert when the add-circle-outline icon is pressed
    Alert.alert('Den här funktionen kommer snart!');
  };


  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.introductoryBox}>
        <Text style={styles.header}>Community</Text>
        <Pressable onPress={handleComingSoonPress} style={styles.iconContainer}>
            <Icon name="add-circle-outline" size={40} color="#709078" />
        </Pressable>
        </View>
        <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Inlägg från användare</Text>
          <Pressable onPress={handleToggleBlogs}>
            <Text style={styles.seAll}>{showAllBlogs ? 'Dölj' : 'Se alla'}</Text>
          </Pressable>
        </View>
        <View style={styles.blogContainer}>
          <BlogBox title="Kost vid förkylningstider" imageSource={require('../../assets/jenny.jpeg')} name="Jenny" date="16 Januari 2024" text="Varje år får jag i genomsnitt 2-3 kraftiga förkylningar. Nu har jag äntligen börjat förbereda mig i tid genom att göra små ändringar i min kost. Förkylningarna kommer ju alltid på hösten så på då börjar jag addera rätt kryddor i maten för att försöka hålla mig frisk!  Ingefära är rena universalmedicinen som är en fantastisk smaksättare och en traditionell huskur vid förkylning..." />
          <BlogBox title="Örterna som alla borde äta" imageSource={require('../../assets/patricia.png')} name="Patricia" date=" 5 Januari 2024" text="Att blåbär och grönkål är nyttigt är det ingen som tvivlar på. Många vet till och med att de är nyttiga för att de innehåller mycket antioxidanter, ämnen som bekämpar skadliga fria radikaler (en biprodukt som bildas när vi andas). Fria radikaler kan starta en oxidativ stress i kroppen, vilket i sin tur påskyndar åldrande och leder till sjukdom. Örter innehåller större mängd antioxidanter..." />
          {showAllBlogs && (
            <>
              <BlogBox title="Blogpost nr 3" imageSource={require('../../assets/jenny.jpeg')} name="Jenny" date="2 Januari 2024" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..." />
              <BlogBox title="Blogpost nr 4" imageSource={require('../../assets/patricia.png')} name="Patricia" date=" 1 Januari 2024" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..." />
            </>
          )}
        </View>

        <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Artiklar</Text>
          <Pressable onPress={handleToggleArticles}>
            <Text style={styles.seAll}>{showAllArticles ? 'Dölj' : 'Se alla'}</Text>
          </Pressable>
        </View> 
         {/* Layout for the two article boxes */}
         <View style={styles.boxRow}>
          <ArticleBox title="Spring & Rising Yang" backgroundImage={require('../../assets/tree_flower.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress}  />
          <ArticleBox title="Kinesiska örttinkturer" backgroundImage={require('../../assets/herbs.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
          {showAllArticles && (
          // Render additional ArticleBox components if showAllArticles is true
          // You can add more ArticleBox components as needed
          <>
            <ArticleBox title="Article 3" backgroundImage={require('../../assets/box_six_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
            <ArticleBox title="Article 4" backgroundImage={require('../../assets/box_two_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
          </>
        )}
        </View>
        {/* End of layout for the two article boxes */}

        <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Grupper</Text>
          <Pressable onPress={handleToggleGroups}>
            <Text style={styles.seAll}>{showAllGroups ? 'Dölj' : 'Se alla'}</Text>
          </Pressable>
        </View>    
         {/* Layout for the four boxes from Recommendation_boxes */}
         <View style={styles.boxRow}>
         <Pressable onPress={() => handleComingSoonPress()}>
          <View style={{ ...styles.box, backgroundColor: '#A7C1AE', width: boxWidth }}>
            <Text style={styles.boxText}>Klimakterie-snacket</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => handleComingSoonPress()}>
          <View style={{ ...styles.box, backgroundColor: '#CDBCAA', width: boxWidth }}>
            <Text style={styles.boxText}>Autoimmun hälsa</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => handleComingSoonPress()}>
          <View style={{ ...styles.box, backgroundColor: '#A2B8CC', width: boxWidth }}>
            <Text style={styles.boxText}>Efter utmattningen</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => handleComingSoonPress()}>
          <View style={{ ...styles.box, backgroundColor: '#E0ADA2', width: boxWidth }}>
            <Text style={styles.boxText}>Detox</Text>
          </View>
        </Pressable>
        {showAllGroups && (
          // Render additional Group components if showAllGroups is true
          // You can add more Group components as needed
          <>
            <Pressable onPress={() => handleComingSoonPress()}>
              <View style={{ ...styles.box, backgroundColor: '#A7C1AE', width: boxWidth }}>
                <Text style={styles.boxText}>Grupp 5</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handleComingSoonPress()}>
              <View style={{ ...styles.box, backgroundColor: '#CDBCAA', width: boxWidth }}>
                <Text style={styles.boxText}>Grupp 6</Text>
              </View>
            </Pressable>
          </>
        )}

         </View>
       
        {/* End of layout for the four boxes from Recommendation_boxes */}
        <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Följ experterna</Text>
        </View>    
        <Experts />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    paddingLeft: 20,
  },
  iconContainer: {
    paddingLeft: 20,
  },  
  blogContainer: {
    width: '95%',
    marginBottom: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',

  },
  secondaryHeaderContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',  // Add this line
    marginBottom: 10,
  },
  secondaryHeader: {
    textTransform: 'uppercase',
    marginLeft: 10,
},
seAll: {
  marginRight: 20,
  fontSize: 10,
},
  boxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  box: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 8,
    height: 120,  
  },
  boxText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default Friends;
