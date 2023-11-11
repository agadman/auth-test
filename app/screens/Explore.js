import { StyleSheet, View, Pressable, Text, ImageBackground, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Explore = () => {
    const navigation = useNavigation();

    return (
        <ScrollView vertical>
            <View style={styles.container}>
                <View style={styles.introductoryBox}>
                    <Text style={styles.header}>Upptäck</Text>
                    <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Sök..."
                    />
                    <Pressable style={styles.searchIconContainer}>
                        <Icon name="search" size={20} color="#000" />
                    </Pressable>
            </View>
            </View>    
            <View style={styles.firstBox}>
               <ImageBackground
                   source={require('../../assets/explore_box_background.jpg')}
                   style={styles.boxBackground}>
                   <Text style={styles.findQuizText}>Hitta ditt personliga hälsomönster</Text>
                   <Pressable style={styles.quizBtn}>
                        <Text style={styles.quizBtnText}>Gör quiz</Text>
                    </Pressable>
               </ImageBackground>
           </View>
           <View>
            <Text>Berätta om din hälsa</Text>
            <Text>Gör ett quiz för att få en personlig helhetsbild och rekommendationer för att må bra</Text>
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
                        <Image source={require('../../assets/box_seven_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>Klimakterie</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate('Theme_PMS')} style={styles.box}>
                        <Image source={require('../../assets/box_eight_home.jpg')} style={styles.boxImage} />
                        <Text style={styles.boxText}>PMS</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        </ScrollView>
    );
 };
 
 export default Explore;

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
        width: '100%', 
     },
       box: {
        width: '48%', 
        aspectRatio: 1,
        alignItems: 'center',
        marginBottom: 10,
       },
       boxImage: {
        width: '100%', 
        height: '80%', 
        resizeMode: 'cover', 
        borderRadius: 10,
       },
        boxText: {
        marginTop: 5,
        fontSize: 16, 
        textAlign: 'center',
       },
        searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },    
        searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 10,
        paddingLeft: 10,
      },
        searchIconContainer: {
        padding: 10,
        backgroundColor: '#AB978A',
        borderRadius: 20,
      },
      
 })