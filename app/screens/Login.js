import { View, StyleSheet, Text, TextInput, ActivityIndicator, Pressable, KeyboardAvoidingView, TouchableOpacity  } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
            <View style={styles.container}>
            <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
                <Text style={styles.header}>Logga in</Text>
            </View>
            <View style={styles.form}>
                <KeyboardAvoidingView behavior="padding">
                    <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                    <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                    { loading ? <ActivityIndicator size="large" color="#0000ff" /> 
                    : <>
                    <Pressable style={styles.loginBtn} onPress={signIn}>
                        <Text style={styles.loginText}>Logga in</Text>
                    </Pressable>
                    </>} 
                    <Pressable style={styles.forgotPwd}>
                        <Text style={styles.forgotPwdText}>Glömt ditt lösenord?</Text>
                    </Pressable>
            </KeyboardAvoidingView>  
            </View>
            </View>       
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E5DED5'
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 50,
        alignItems: 'center',
        flex: 1, // Updated to 1  
    },
    arrowContainer: {
        marginLeft: 20,
    },
    header: {
        fontSize: 48,
        color: 'black',
        marginLeft: 70   
    },
    form: {
        marginHorizontal: 20,
        flex: 4, // Updated to 3
    },
    input: {
        marginVertical: 8,
        height: 50,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff'
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AB978A',
        borderRadius: 50,
        padding: 20,
        marginTop: 120,
        marginBottom: 20
    },
    loginText: {
        color: 'white',
    },
    forgotPwd: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPwdText: {
        color: '#AB978A',
    }
 })