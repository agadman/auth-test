import { StyleSheet, View, Pressable, Text, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_FIRESTORE } from '../../FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import BoxContainer from '../components/BoxContainer';
import { COLORS } from '../components/Colors';
import QuizModal from '../components/QuizModal';
import quizQuestions from '../../quiz.json';
import Experts from '../components/Experts';

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const route = useRoute();
  const initialUserName = route.params?.userName || '';
  const [userName, setUserName] = useState(initialUserName);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');

  // Initialize Firebase auth
  const auth = getAuth();

  useEffect(() => {
    // Check if the user is logged in and retrieve their display name and UID
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDisplayName = user.displayName;
        const userId = user.uid;
  
        if (userDisplayName) {
          // User is logged in and has a display name
          setUserName(userDisplayName);
          setUserId(userId); // Set the user ID in the state
        }
      }
      setIsLoading(false);
    });
  }, []);

  const saveMaxAreaToFirestore = async (maxArea) => {
    // Create a reference to the users collection
    const userCollectionRef = collection(FIREBASE_FIRESTORE, 'users');
  
    // Create a reference to the user's document using their UID
    const userDocRef = doc(userCollectionRef, userId);
  
    try {
      // Set or update the maxArea in the user's document
      await setDoc(userDocRef, { maxArea: maxArea });
  
      console.log('Max area saved to Firestore:', maxArea);
    } catch (error) {
      console.error('Error saving max area to Firestore:', error);
    }
  };
  
  
  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.introductoryBox}>
          <Text style={styles.header}>Hej {userName}</Text>
          <Text style={styles.userId}>Användar-ID: {userId}</Text>
          <Text style={styles.introductoryText}>Välkommen till Oomah. Vi hjälper dig att få en helhetsbild av din hälsa och ger dig tips på hur du kan må bättre. </Text>
          <Text style={styles.introductoryText}>Här får du tillgång till experter, tips och produkter inom kost, träning, hormonhälsa, stress, sömn, mage och kvinnohälsa. Vi vill hjälpa dig att hitta den underliggande orsaken till din hälsa, istället för att bara behandla symptomen. Målet är att återställa balans och ge dig verktyg för att må så bra som möjligt.</Text>
        </View>
        <View style={styles.firstBox}>
          <ImageBackground
            source={require('../../assets/home_box_background.jpg')}
            style={styles.boxBackground}>
            <Text style={styles.findQuizText}>Hitta ditt personliga hälsomönster</Text>
            <Pressable style={styles.quizBtn} onPress={openModal}>
              <Text style={styles.quizBtnText}>Gör quiz</Text>
            </Pressable>
          </ImageBackground>
        </View>
        {/* Pass the questions prop to the QuizModal component */}
        <QuizModal isVisible={isModalVisible} onClose={closeModal} questions={quizQuestions.questions} saveMaxAreaToFirestore={saveMaxAreaToFirestore} />
        <BoxContainer />
        <Text style={styles.expertsHeader}>Våra Experter</Text>
        <Experts />
      </View>
    </ScrollView>
  );
};

export default Home;

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
        fontWeight: 700,
        paddingBottom: 30
    },
    introductoryText: {
        textAlign: 'center',
        marginBottom: 10,
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
        color: 'white',
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
    expertsHeader: {
      fontSize: 24,
      marginBottom: 20,
      width: '100%',
      
    },
       userId: {
        fontSize: 18,
        marginBottom: 10,
        color: '#888', // Adjust color as needed
      },
 })