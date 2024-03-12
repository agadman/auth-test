import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, Pressable, Dimensions, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS } from '../components/Colors';
import ArticleBox from '../components/ArticleBox';
import ExerciseBox from '../components/ExerciseBox';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpertDetails = () => {
  const route = useRoute();
  const { expertId } = route.params;
  const navigation = useNavigation();

const handleGoBack = () => {
  const previousScreen = route.params?.previousScreen || 'Home'; // Default to 'Home' if the previous screen is not available
  navigation.navigate(previousScreen);
};


  const windowWidth = Dimensions.get('window').width;
  const boxWidth = (windowWidth - 60) / 2; // Define boxWidth locally

  const [showAllBoxes, setShowAllBoxes] = useState(false);
  const [showAllArticleBoxes, setShowAllArticleBoxes] = useState(false);


  // Assuming that expertsData is available in ExpertDetails (you may need to pass it from the parent component)
  const expertsData = [
    { 
        id: 1, 
        name: 'Patricia Ramirez Berglund', 
        image: require('../../assets/patricia.png'), 
        text1: 'Patricia har en doktorsexamen i akupunktur och orientalisk medicin. Hon är licensierad i Commonwealth of Massachusetts och delstaten New York i USA. Hon bedriver för närvarande privatpraktik i Stockholm.',
        text2: 'Som örtläkare är Patricia specialiserad på behandling av hudåkommor och autoimmuna sjukdomar. Efter att ha arbetat för Initiative for Women (IWD) vid NYU Hospital for Joint Diseases i New York City (2010), blev hon särskilt intresserad av kvinnors hälsofrågor. Patricias övertygelse är att genom utbildning av patienter inom livsstilsförändringar, funktionell näring och användningen av örter som medicin samt Yang Sheng (närande liv) praxis, kan människor påverka sin resa mot välbefinnande. Hennes passion är att stärka människors hälsa och välbefinnande genom behandling och integration av sinne/kropp/ande.' ,
        expertareas: ['Örtmedicin', 'Klimakteriet', 'TCM', 'Hud'],
    },
    { 
        id: 2, 
        name: 'Fia Hobbs', 
        image: require('../../assets/fia_hobbs.jpeg'), 
        text1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        text2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        expertareas: ['Område 1', 'Område 2', 'Område 3'],
     },
    { 
        id: 3, 
        name: 'Expert 3', 
        image: require('../../assets/patricia.jpeg'), 
        text1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        text2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        expertareas: ['Område 1', 'Område 2', 'Område 3'],
    }
    // Add more experts as needed
  ];

  // Find the selected expert based on expertId
  const selectedExpert = expertsData.find((expert) => expert.id === expertId);

  const handleToggleBoxes = () => {
    // Toggle the state to show/hide all articles
    setShowAllBoxes(!showAllBoxes);
  };
  const handleToggleArticleBoxes = () => {
    // Toggle the state to show/hide all article boxes
    setShowAllArticleBoxes(!showAllArticleBoxes);
  };


  const handleComingSoonPress = () => {
    // Display an alert when the add-circle-outline icon is pressed
    Alert.alert('Den här funktionen kommer snart!');
  };

  return (
    <ScrollView vertical>
      <View style={styles.container}>   
          <View style={styles.introductoryBox}>
          <View style={styles.arrowContainer}>
              <Pressable onPress={handleGoBack}>
                <Icon name="arrow-back" size={30} color={COLORS.primary} />
              </Pressable>
            </View>
            <Text style={styles.header}>Våra experter</Text>
            <View style={styles.arrowContainer}></View> 
        </View>
       
        {selectedExpert && (
          <View style={styles.expertDetails}>
            <Image source={selectedExpert.image} style={styles.expertImage} />
            <View style={styles.text}>
                <Text style={styles.expertName}>{selectedExpert.name}</Text>
                <Text style={styles.paragraph}>{selectedExpert.text1}</Text>
                <Text style={styles.paragraph}>{selectedExpert.text2}</Text>
            </View>
          </View>
        )}

        {/* Layout for the two article boxes */} 
        <View style={styles.btnContainer}>
            <Pressable style={styles.btn} onPress={handleComingSoonPress}>
                <Text style={styles.btnText}>Boka möte</Text>
            </Pressable>
        </View>

         {/* New section for "Expertområden" */}
         <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Expertområden</Text>
        </View>
        <View style={styles.expertareaContainer}>
          {selectedExpert?.expertareas.map((expertarea, index) => (
            <View key={index} style={styles.expertareaBox}>
              <Text style={styles.expertareaText}>{expertarea}</Text>
            </View>
          ))}
        </View>
        {/* End of "Expertområden" section */}

        <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Övningar</Text>
          <Pressable onPress={handleToggleBoxes}>
            <Text style={styles.seAll}>{showAllBoxes ? 'Dölj' : 'Se alla'}</Text>
          </Pressable>
        </View> 
        {/* Layout for the two exercise boxes */}
       <View style={styles.boxRow}>
          <ExerciseBox title="Thymus tapping" backgroundImage={require('../../assets/box_five_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress}  />
          <ExerciseBox title="Somatic self hug" backgroundImage={require('../../assets/box_four_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
          {showAllBoxes && (
          <>
            <ExerciseBox title="Övning 3" backgroundImage={require('../../assets/box_six_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
            <ExerciseBox title="Övning 4" backgroundImage={require('../../assets/box_two_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
          </>
        )}
        </View>
        {/* End of layout for the two article boxes */}
        
      <View style={styles.secondaryHeaderContainer}>
          <Text style={styles.secondaryHeader}>Artiklar</Text>
          <Pressable onPress={handleToggleArticleBoxes}>
            <Text style={styles.seAll}>{showAllArticleBoxes ? 'Dölj' : 'Se alla'}</Text>
          </Pressable>
        </View> 
       {/* Layout for the two article boxes */}
       <View style={styles.boxRow}>
          <ArticleBox title="Spring & Rising Yang" backgroundImage={require('../../assets/tree_flower.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress}  />
          <ArticleBox title="Kinesiska örttinkturer" backgroundImage={require('../../assets/herbs.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
          {showAllArticleBoxes && (
          // Render additional ArticleBox components if showAllArticles is true
          // You can add more ArticleBox components as needed
          <>
            <ArticleBox title="Article 3" backgroundImage={require('../../assets/box_six_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
            <ArticleBox title="Article 4" backgroundImage={require('../../assets/box_two_theme.jpg')} boxWidth={boxWidth} onPress={handleComingSoonPress} />
          </>
        )}
        </View>
        {/* End of layout for the two article boxes */}
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
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  arrowContainer: {
    width: 30, // Set a fixed width for the arrow container
    alignItems: 'flex-start', // Align arrow to the start (left)
  },
  header: {
    flex: 1, // Let the header take up the remaining space
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  expertDetails: {
    alignItems: 'center',
  },
  expertImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  text: {
    width: '90%',
    marginBottom: 30,
  },
  expertName: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    marginBottom: 20,
  },
  btnContainer: {
    marginBottom: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 20,
    width: '75%',
},
btnText: {
    color: COLORS.white,
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
  expertareaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    marginBottom: 50,
  },
  expertareaBox: {
    backgroundColor: '#A7C1AE',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    width: '30%',
  },
  expertareaText: {
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default ExpertDetails;
