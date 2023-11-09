import { StyleSheet, View, Pressable, Text, ImageBackground, ScrollView, Image } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const route = useRoute();
    const initialUserName = route.params?.userName || '';
    const [userName, setUserName] = useState(initialUserName);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    // Initialize Firebase auth
    const auth = getAuth();

    useEffect(() => {
        // Check if the user is logged in and retrieve their display name
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userDisplayName = user.displayName;
                if (userDisplayName) {
                    // User is logged in and has a display name
                    setUserName(userDisplayName);
                }
            }
            setIsLoading(false);
        });
    }, []);
    return (
        <ScrollView vertical>
        <View style={styles.container}>
            <View style={styles.introductoryBox}>
                <Text style={styles.header}>Oomah</Text>
                <Text style={styles.introductoryText}>Välkommen {userName}</Text>
                <Text style={styles.introductoryText}>Vi hjälper dig att få en helhetsbild av din hälsa och ger dig tips på hur du kan må bättre. </Text>
                <Text style={styles.introductoryText}>Här får du tillgång till experter, tips och produkter inom kost, träning, hormonhälsa, stress, sömn, mage och kvinnohälsa. Vi vill hjälpa dig att hitta den underliggande orsaken till din hälsa, istället för att bara behandla symptomen. Målet är att återställa balans och ge dig verktyg för att må så bra som möjligt.</Text>
            </View>    
            <View style={styles.firstBox}>
               <ImageBackground
                   source={require('../../assets/home_box_background.jpg')}
                   style={styles.boxBackground}>
                   <Text style={styles.findQuizText}>Hitta ditt personliga hälsomönster</Text>
                   <Pressable style={styles.quizBtn}>
                        <Text style={styles.quizBtnText}>Gör quiz</Text>
                    </Pressable>
               </ImageBackground>
           </View> 
           <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Läs om tema...</Text>
                <View style={styles.boxRow}>
                    <View style={styles.box}>
                        <Image source={require('../../assets/box_one_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Mage & tarm</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/box_two_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Sömn & Energi</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/box_three_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Hud & Hår </Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/box_four_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Oro & Ångest</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/box_five_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Fertilitet</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/box_six_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Stress</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/box_five_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Klimakterie</Text>
                    </View>
                    <View style={styles.box} onPress={() => navigation.navigate('Theme_PMS')}>
                        <Pressable onPress={() => navigation.navigate('Theme_PMS')}>
                            <Image source={require('../../assets/box_six_home.jpg')} style={styles.boxImage} />
                            <Text style={styles.boxText}>PMS</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.about}>
                <Text style={styles.aboutHeader}>Om Traditionell kinesisk medicin</Text>
                <Text>Traditionell kinesisk medicin har använts i hundratals år och bygger på tron att kroppen har naturliga läkningsförmågor. Denna typ av medicin fokuserar på att hitta den underliggande orsaken till en sjukdom eller skada, istället för att bara behandla symptomen. Målet med traditionell kinesisk medicin är att återställa balans och harmoni i kroppen och sinnet. Några av de vanliga metoder som används inom denna typ av medicin inkluderar örtmedicin, akupunktur, koppning och terapeutiska övningar som tai chi och qi gong.</Text>
            </View>    
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
        backgroundColor: '#E5DED5',
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
        backgroundColor: '#AB978A',
        borderRadius: 50,
        padding: 20,
        width: '75%',
        marginTop: 20,
    },
    quizBtnText: {
        color: 'white',
    },
    boxContainer: {
        marginTop: 50,
        width: '90%',
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
      boxHeader: {
        fontSize: 24,
        marginBottom: 10,
      },
      boxRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%', // Ensure the row takes the full width
     },
      box: {
        width: '48%', // Adjust the width as needed
        aspectRatio: 1,
        alignItems: 'center',
        marginBottom: 10,
       },
       boxImage: {
        width: '100%', // Adjust the image width as needed
        height: '80%', // Adjust the image height as needed
        resizeMode: 'cover', // You can use 'contain' or other options
        borderRadius: 10,
       },
       boxText: {
        marginTop: 5,
        fontSize: 16, // Adjust the text size as needed
        textAlign: 'center',
       },
       aboutHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
       },
       about: {
        marginTop: 0,
        width: '90%',
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        elevation: 10,
        marginBottom: 100,
       },
 })