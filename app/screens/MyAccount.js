import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../FirebaseConfig';
import { COLORS } from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const imageSource = require('../../assets/icons/logo_white.png');
import { FontAwesome5 } from 'react-native-vector-icons';

const MyAccount = () => {
    const navigation = useNavigation();
    const [maxArea, setMaxArea] = useState(null);
    const [currentDay, setCurrentDay] = useState('');
    const [userId, setUserId] = useState('');
    const [box1Header, setBox1Header] = useState('');
    const [box1Content, setBox1Content] = useState('');
    const [box2Header, setBox2Header] = useState('');
    const [box2Content, setBox2Content] = useState('');
    const [expandedBoxes, setExpandedBoxes] = useState({
        box1: false,
        box2: false,
      });
    
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const userId = user.uid;
            setUserId(userId);
            const fetchBoxHeaders = async () => {
              try {
                const userDocRef = doc(getFirestore(), 'users', userId);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                  const userData = userDocSnapshot.data();
                  setBox1Header(userData.box1Header || '');
                  setBox1Content(userData.box1 || '');
                  setBox2Header(userData.box2Header || '');
                  setBox2Content(userData.box2 || '');
                  setExpandedBoxes(userData.expandedBoxes || {});
                }
              } catch (error) {
                console.error('Error fetching box headers:', error);
              }
            };
            fetchBoxHeaders(); // Fetch box headers when the component mounts
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

    const toggleBox = async (box) => {
        setExpandedBoxes((prevState) => ({
          ...prevState,
          [box]: !prevState[box],
        }));
      };
    
      const renderContent = (box, fullText) => {
        return (
          <View style={styles.content}>
            {expandedBoxes[box] && <Text style={styles.text}>{fullText}</Text>}
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
                        {/* Render Box 1 */}
                        <View style={styles.boxFirst}>
                            <TouchableOpacity onPress={() => toggleBox('box1')}>
                            <View style={styles.row}>
                                <Text style={styles.icon}>
                                <Icon name="check-box" style={styles.heartIcon} />
                                </Text>
                                <Text style={styles.box1HeaderStyle}>{box1Header}</Text>
                                {renderArrowIcon('box1')}
                            </View>
                            </TouchableOpacity>
                            {renderContent('box1', box1Content)}
                        </View>

                        {/* Render Box 2 if it has content */}
                        {box2Content && (
                            <View style={styles.boxFirst}>
                            <TouchableOpacity onPress={() => toggleBox('box2')}>
                                <View style={styles.row}>
                                <Text style={styles.icon}>
                                    <Icon name="check-box" style={styles.heartIcon} />
                                </Text>
                                <Text style={styles.box1HeaderStyle}>{box2Header}</Text>
                                {renderArrowIcon('box2')}
                                </View>
                            </TouchableOpacity>
                            {renderContent('box2', box2Content)}
                            </View>
                        )}
                    </View>
                    <Text style={styles.seeAll}>Se alla och ändra</Text>
                    </View>
                     
                    <View style={styles.favorites}>
                        <Text style={styles.secondaryHeader}>Mina favoriter</Text>
                        <Text style={styles.seeAll}>Se alla och ändra</Text>
                    </View>
                    <View>
                        {maxArea && <Text style={styles.secondaryHeader}>Mitt hälsopaket - {maxArea}</Text>}

                            <View style={styles.AllAboutBoxContainer}>
                            <View style={styles.AllAboutBoxContent}>
                                <Image source={imageSource} style={styles.logoImage} />
                                <Text style={styles.AllAboutBoxText}>Allt du behöver veta</Text>
                            </View>
                            <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIcon} />
                            </View>

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
                            <View style={styles.row}>
                                <Text style={styles.icon}>
                                    <FontAwesome5 name="heartbeat" style={styles.boxIcon} />
                                </Text>
                                <Text style={styles.text}>Mitt hälsopaket</Text>
                                <FontAwesome5 name="angle-right" size={18} color="#333" style={styles.arrowIconWhiteBackground} />
                            </View>
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
        backgroundColor: COLORS.background,
    },
    firstBox: {
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 20,
        marginBottom: 30,
      },
      centerContent: {
        justifyContent: 'flex-end',
      },
    header: {
        fontSize: 30,
        fontWeight: 700,
        paddingBottom: 30
    },
    secondaryHeader: {
        textTransform: 'uppercase',
        marginBottom: 20,
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
        borderRadius: 15, // half of width and height to make it a circle
        borderWidth: 2,
        borderColor: COLORS.primary, // replace 'yourBackgroundColor' with the desired color
        overflow: 'hidden',
        margin: 5,
        backgroundColor: '#F1ECEA',
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
         boxFirst: {
            backgroundColor: "#CDBCAA",
            borderRadius: 8,
            marginBottom: 10,
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 10,
            paddingRight: 10,
             },

         box1HeaderStyle: {
            color: "#fff",
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

      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      arrowIcon: {
        marginLeft: 5,
        fontSize: 24,
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
        marginBottom: 30,
        padding: 15,
      },
      AllAboutBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      boxImage: {
        width: 100,
        height: 100,
        borderRadius: 25,
        marginRight: 15,
      },
      AllAboutBoxText: {
        fontSize: 16,
        color: COLORS.white,
      },
      arrowIcon: {
        marginLeft: 'auto',
        color: COLORS.white,
      },
      arrowIconWhiteBackground: {
        marginLeft: 'auto',
      },
      logoImage: {
        width: 100,
        height: 100,
        marginRight: 30,
      },
      buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
      },
      seeAll: {
        textAlign: 'right',
        fontSize: 10,
      },
      favorites: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});
