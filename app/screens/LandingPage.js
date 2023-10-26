import React from 'react';
import { View, StyleSheet, Text, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
    const navigation = useNavigation();
    return (
            <ImageBackground source={require("../../assets/landingpage_background.jpg")} style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Oomah</Text>
                <Text style={styles.secondHeader}>Din personliga hälsokälla</Text>
            </View>
            <View style={styles.form}>
                <Pressable style={styles.createBtn} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.createText}>Kom igång</Text>
                </Pressable>
                <Pressable style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Jag har redan ett konto.</Text>
                    <Text style={styles.loginText}>Logga in</Text>
                </Pressable>
            </View>
            </ImageBackground>       
    )
}
export default LandingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerContainer: {
       // justifyContent: 'center',   
       paddingTop: 100,
        alignItems: 'center',
        flex: 2,
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 48,
        color: 'white'
    },
    secondHeader: {
        fontSize: 20,
        color: 'white'
    },
    form: {
        marginHorizontal: 20,
        flex: 2,
    },
    createBtn: {
        backgroundColor: '#AB978A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 20,
        marginBottom: 20
    },
    createText: {
        color: 'white'
    },
    loginLink: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
    }
})