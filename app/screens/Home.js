import { View, Button, Text } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
 
    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            // Add any additional cleanup or state management you may need here
            // Navigate to the "LandingPage" after successful sign-out
            navigation.navigate('LandingPage');
        } catch (error) {
            console.log('Sign out error:', error);
            // Handle sign-out error here, if necessary
        }
    };
 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Oomah</Text>
            <Text>Välkommen till Oomah. Vi hjälper dig att få en helhetsbild av din hälsa och ger dig tips på hur du kan må bättre. </Text>
            <Text>Här får du tillgång till experter, tips och produkter inom kost, träning, hormonhälsa, stress, sömn, mage och kvinnohälsa. Vi vill hjälpa dig att hitta den underliggande orsaken till din hälsa, istället för att bara behandla symptomen. Målet är att återställa balans och ge dig verktyg för att må så bra som möjligt.</Text>
            <Button onPress={() => navigation.navigate('details')} title='Open details'></Button>
            <Button onPress={handleLogout} title='Logout'></Button>
        </View>
    );
 };
 
 export default Home;