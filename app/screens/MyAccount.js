import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../FirebaseConfig';
import { COLORS } from '../components/Colors';

const MyAccount = () => {
    const navigation = useNavigation();
    const [maxArea, setMaxArea] = useState(null);
    const [currentDay, setCurrentDay] = useState('');

    useEffect(() => {
        // Hämta dagens veckodag och sätt den i state
        const today = new Date();
        const daysOfWeek = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
        setCurrentDay(daysOfWeek[(today.getDay() + 6) % 7]); // Adjusted to start with Monday
    }, []);


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
                        <View>
                            <Text style={styles.secondaryHeader}>Idag</Text>
                        </View> 
                    </View>
                     
                    <View>
                        <Text style={styles.secondaryHeader}>Mina favoriter</Text>
                    </View>
                    <View>
                        <Text style={styles.secondaryHeader}>Mitt hälsopaket</Text>
                        {maxArea && <Text>Paket: {maxArea}</Text>}
                    </View>
                    <View>
                        <Text style={styles.secondaryHeader}>Mina uppgifter</Text>
                    </View>
                </View>  
                <Button onPress={handleLogout} title='Logout'></Button>
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
    header: {
        fontSize: 30,
        fontWeight: 700,
        paddingBottom: 30
    },
    secondaryHeader: {
        textTransform: 'uppercase',
        margin: 10,
    },
    firstBox: {
        width: '90%',
        aspectRatio: 1.5,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 20,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
      
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
});
