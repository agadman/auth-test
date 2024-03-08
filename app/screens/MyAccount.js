import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../FirebaseConfig';
import { COLORS } from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome5 } from 'react-native-vector-icons';
import { CheckBox } from 'react-native-elements';
import MyPackage from './MyPackage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const imageSource = require('../../assets/icons/logo_white.png');

const MyAccount = () => {
  const navigation = useNavigation();
  const [maxArea, setMaxArea] = useState(null);
  const [currentDay, setCurrentDay] = useState('');
  const [userId, setUserId] = useState('');
  const [boxesData, setBoxesData] = useState([]);
  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
  });
  const [checkboxState, setCheckboxState] = useState({
    box1: false,
    box2: false,
  });
  const [showAllBoxes, setShowAllBoxes] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        setUserId(userId);
        const fetchBoxesData = async () => {
          console.log('Fetching data from Firestore...');
          try {
            const themesCollectionRef = collection(getFirestore(), 'users', userId, 'themes');
            const themesSnapshot = await getDocs(themesCollectionRef);

            const allThemesData = [];

            themesSnapshot.forEach((themeDoc) => {
              const themeData = themeDoc.data();
              console.log('Theme data:', themeData);
              // Extract and handle data for each theme (e.g., box1Header, box1, box2Header, box2)
              // Here, you might want to check which theme you want to use and set the state accordingly
              allThemesData.push(themeData);
            });

            setBoxesData(allThemesData);
            console.log(allThemesData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchBoxesData();
      }
    });

    return () => unsubscribe();
  }, [auth]);


  useEffect(() => {
    // Hämta dagens veckodag och sätt den i state
    const today = new Date();
    const daysOfWeek = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
    setCurrentDay(daysOfWeek[(today.getDay() + 6) % 7]); // Adjusted to start with Monday
  }, []);

  const renderContent = (box, headerStyle, fullText) => {
    return (
      <View style={styles.content}>
        {expandedBoxes[box] && <Text style={[styles.text, headerStyle]}>{fullText}</Text>}
      </View>
    );
  };
  const renderArrowIcon = (box, color) => {
    return expandedBoxes[box] ? (
      <Icon name="keyboard-arrow-up" style={[styles.arrowIcon, { color }]} />
    ) : (
      <Icon name="keyboard-arrow-down" style={[styles.arrowIcon, { color }]} />
    );
  };  

  const CheckBoxComponent = ({ box, onCheckboxPress, isFavorite }) => (
    <CheckBox
      checked={checkboxState[box]}
      containerStyle={styles.checkboxContainer}
      textStyle={styles.checkboxText}
      checkedColor={COLORS.white}
      onPress={onCheckboxPress}
      right
      iconRight
      checkedIcon={isFavorite ? <FontAwesome name="heart" size={24} color="#E0ADA2" solid /> : <Icon name="radio-button-checked" size={24} color={COLORS.white} />}
      uncheckedIcon={isFavorite ? <FontAwesome name="heart" size={24} color="#E0ADA2" regular /> : <Icon name="radio-button-unchecked" size={24} color={COLORS.white} />}
    />
  );

  const HeaderAndArrowComponent = ({ header, headerStyle, onPress, box, themeType }) => (
    <TouchableOpacity onPress={() => onPress(box)}>
      <View style={styles.row}>
        <View style={styles.headerContainer}>
          <Text style={[styles.box1HeaderStyle, headerStyle]}>{header}</Text>
        </View>
        <View style={styles.arrowContainer}>
          {renderArrowIcon(box, themeType === 'fav' ? 'black' : 'white')}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  
  const renderBoxThemes = (theme) => {
    const boxThemes = Object.keys(theme)
      .filter((box) => box.endsWith('Header') && box.startsWith('box'))
      .map((box, index) => {
        const fullText = theme[box.substring(0, box.length - 6)];
        const uniqueKey = `box_${index}`; // Use a unique key for each box
        return (
          <View style={styles.boxRoutine} key={uniqueKey}>
            <View style={styles.row}>
              <CheckBoxComponent
                box={uniqueKey} // Use the unique key for checkbox state
                onCheckboxPress={() => toggleCheckbox(uniqueKey)}
              />
              <HeaderAndArrowComponent
                header={theme[box]}
                headerStyle={styles.boxRoutineHeaderStyle}
                onPress={() => toggleBox(uniqueKey)}
                box={uniqueKey}
                themeType="box"
              />
            </View>
            {renderContent(uniqueKey, styles.boxRoutineHeaderStyle, fullText)}
          </View>
        );
      });
  
    return (
      <React.Fragment>
        {boxThemes}
      </React.Fragment>
    );
  };
  
  const renderFavThemes = (theme) => {
    const favThemes = Object.keys(theme)
      .filter((box) => box.endsWith('Header') && box.startsWith('fav'))
      .map((box, index) => {
        const fullText = theme[box.substring(0, box.length - 6)];
        const uniqueKey = `fav_${index}`; // Use a unique key for each favorite box
        return (
          <View style={styles.boxFav} key={uniqueKey}>
            <View style={styles.row}>
              <CheckBoxComponent
                box={uniqueKey} // Use the unique key for checkbox state
                onCheckboxPress={() => toggleCheckbox(uniqueKey)}
                isFavorite={true}
              />
              <HeaderAndArrowComponent
                header={theme[box]}
                headerStyle={styles.boxFavHeaderStyle}
                onPress={() => toggleBox(uniqueKey)}
                box={uniqueKey}
                themeType="fav"
              />
            </View>
            {renderContent(uniqueKey, styles.boxFavHeaderStyle, fullText)}
          </View>
        );
      });
  
    return (
      <React.Fragment>
        {favThemes}
      </React.Fragment>
    );
  };
  
  const toggleBox = (box) => {
    setExpandedBoxes((prevState) => ({
      ...prevState,
      [box]: !prevState[box],
    }));
  };

  const toggleCheckbox = (box) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [box]: !prevState[box],
    }));
  };

  const handleToggleBoxes = () => {
    setShowAllBoxes(!showAllBoxes);
  };

  const renderLimitedBoxes = () => {
    const visibleBoxes = showAllBoxes ? boxesData : boxesData.slice(0, 1);

    return visibleBoxes.map((theme, index) => (
      <React.Fragment key={index}>
        {renderBoxThemes(theme)}
      </React.Fragment>
    ));
  };

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // Navigate to 'LandingPage' and reset the stack
      navigation.dispatch(
        CommonActions.navigate({
          name: 'LandingPage',
        })
      );
    } catch (error) {
      console.log('Sign out error:', error);
      // Handle sign-out error here, if necessary
    }
  };

  // Function to fetch maxArea from Firestore
  const fetchMaxArea = async () => {
    try {
      // Replace 'your_collection' with the actual name of your Firestore collection
      const userDocRef = doc(FIREBASE_FIRESTORE, 'users', FIREBASE_AUTH.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setMaxArea(userData.maxArea);
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching maxArea:', error);
    }
  };

  useEffect(() => {
    fetchMaxArea(); // Fetch maxArea when the component renders
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Text style={styles.header}>Min hälsa</Text>
        <View>
          <Text style={styles.secondaryHeader}>Mina rutiner</Text>
          <View style={styles.firstBox}>
            <View style={styles.daysContainer}>
              {['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'].map((day, index) => (
                <Text
                  key={index}
                  style={[
                    styles.dayText,
                    {
                      fontWeight: day === currentDay ? 'bold' : 'normal',
                      backgroundColor: day === currentDay ? COLORS.primary : '#F1ECEA',
                      color: day === currentDay ? COLORS.white : COLORS.primary,
                    },
                  ]}
                >
                  {day.charAt(0)}
                </Text>
              ))}
            </View>
            {/* Centered content */}
            <View style={styles.centerContent}>
            <Text style={styles.secondaryHeader}>Idag</Text>
            {renderLimitedBoxes()}
            <Text style={styles.seeAll} onPress={handleToggleBoxes}>
              {showAllBoxes ? 'Dölj' : 'Se alla och ändra'}
            </Text>
          </View>
          </View>

          <View style={styles.favorites}>
            <Text style={styles.secondaryHeader}>Mina favoriter</Text>
            {boxesData.map((theme, index) => (
          <React.Fragment key={index}>
            {renderFavThemes(theme)}
          </React.Fragment>
        ))}
            <Text style={styles.seeAll}>Se alla och ändra</Text>
            
          </View>

          <View>
            {maxArea && <Text style={styles.secondaryHeader}>Mitt hälsopaket - {maxArea}</Text>}

            <TouchableOpacity onPress={() => navigation.navigate('MyPackage', { maxArea })}>
          <View style={styles.AllAboutBoxContainer}>
            <View style={styles.AllAboutBoxContent}>
              <Image source={imageSource} style={styles.logoImage} />
              <Text style={styles.AllAboutBoxText}>Allt du behöver veta</Text>
            </View>
            <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.secondaryHeader}>Mina uppgifter</Text>
            <View style={styles.box}>
              <View style={styles.row}>
                <Text style={styles.icon}>
                  <FontAwesome5 name="calendar" style={styles.boxIcon} />
                </Text>
                <Text style={styles.text}>Bokningar</Text>
                <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIconWhiteBackground} />
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.row}>
                <Text style={styles.icon}>
                  <FontAwesome5 name="comment" style={styles.boxIcon} />
                </Text>
                <Text style={styles.text}>Notiser och Påminnelser</Text>
                <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIconWhiteBackground} />
              </View>
            </View>
            <View style={styles.box}>
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('MyPackage')}>
                <Text style={styles.icon}>
                    <FontAwesome5 name="heartbeat" style={styles.boxIcon} />
                </Text>
                <Text style={styles.text}>Mitt hälsopaket</Text>
                <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIconWhiteBackground} />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <View style={styles.row}>
                <Text style={styles.icon}>
                  <FontAwesome5 name="grin" style={styles.boxIcon} />
                </Text>
                <Text style={styles.text}>Mina uppgifter</Text>
                <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIconWhiteBackground} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={handleLogout} title='Logga ut'></Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: COLORS.background,
},
  header: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 50,
  },
  secondaryHeader: {
    textTransform: 'uppercase',
    marginBottom: 20,
},
  seeAll: {
    textAlign: 'right',
    fontSize: 10,
},
  firstBox: {
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: 50,
},
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
},
  dayText: {
    fontSize: 14,
    textAlign: 'center',    
    lineHeight: 25,
    width: 30,
    height: 30,
    borderRadius: 15, 
    borderWidth: 2,
    borderColor: COLORS.primary, 
    overflow: 'hidden',
    margin: 5,
    backgroundColor: '#F1ECEA',
},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
}, 
  checkboxContainer: {
    backgroundColor: 'transparent', 
    borderWidth: 0, 
    padding: 0, 
    marginLeft: 0, 
    marginRight: 10, 
    padding: 10,
},
  checkboxText: {
    color: COLORS.white,
    fontSize: 18,
},
  centerContent: {
    justifyContent: 'flex-end',
}, 
  boxRoutine: {
    backgroundColor: "#CDBCAA",
    borderRadius: 8,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
},
  boxRoutineHeaderStyle: {
    color: "#fff",
},
  boxFav: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
}, 
  favorites: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 50,
}, 

arrowContainer: {
  marginLeft: 'auto',
},

  AllAboutBoxContainer: {
    backgroundColor: '#D09082',
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
    marginBottom: 50,
    padding: 15,
    width: '100%',
},
  AllAboutBoxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%', 
},
  logoImage: {
    width: 100,
    height: 100,
    marginRight: 30,
},
  AllAboutBoxText: {
    fontSize: 16,
    color: COLORS.white,
}, 
  box: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
},
  icon: {
    marginRight: 20,
},
  heartIcon: {
    fontSize: 24,
    color: COLORS.white,
},
  boxIcon: {
    fontSize: 24,
    color: "#D09082",
},
  arrowIcon: {
    fontSize: 24,
    marginLeft: 'auto',
    color: COLORS.white,
},
  arrowIconWhiteBackground: {
    marginLeft: 'auto',
},
  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
},
});