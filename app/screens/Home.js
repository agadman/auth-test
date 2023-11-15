import { StyleSheet, View, Pressable, Text, ImageBackground, ScrollView, Image } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import BoxContainer from '../components/BoxContainer';
import { COLORS } from '../components/Colors';

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
                <Text style={styles.header}>Hej {userName}</Text>
                <Text style={styles.introductoryText}>Välkommen till Oomah. Vi hjälper dig att få en helhetsbild av din hälsa och ger dig tips på hur du kan må bättre. </Text>
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
           <BoxContainer />
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
       aboutHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
       },
       about: {
        marginTop: 0,
        width: '90%',
        padding: 25,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: COLORS.text,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        elevation: 10,
        marginBottom: 100,
       },
 })