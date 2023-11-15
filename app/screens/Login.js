import { View, StyleSheet, Text, TextInput, ActivityIndicator, Pressable, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../components/Colors';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false); // Modal visibility state
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
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const openResetPasswordModal = () => {
    setResetPasswordModalVisible(true);
  };

  const closeResetPasswordModal = () => {
    setResetPasswordModalVisible(false);
  };

  const resetPassword = async () => {
    if (!email) {
      alert('Please provide your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
      closeResetPasswordModal(); // Close the modal after successful email sending
    } catch (error) {
      console.log(error);
      alert('Password reset failed: ' + error.message);
    }
  };

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
          {loading ? <ActivityIndicator size="large" color="#0000ff" />
            : <>
              <Pressable style={styles.loginBtn} onPress={signIn}>
                <Text style={styles.loginText}>Logga in</Text>
              </Pressable>
            </>
          }
          <Pressable style={styles.forgotPwd} onPress={openResetPasswordModal}>
            <Text style={styles.forgotPwdText}>Glömt ditt lösenord?</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
      {/* Email input modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={resetPasswordModalVisible}
        onRequestClose={closeResetPasswordModal}
      >
        <View style={styles.modalContainer}>
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Pressable style={styles.modalBtn} onPress={resetPassword}>
            <Text style={styles.modalBtnText}>Reset Password</Text>
          </Pressable>
          <Pressable style={styles.modalCancelBtn} onPress={closeResetPasswordModal}>
            <Text style={styles.modalCancelBtnText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 50,
        alignItems: 'center',
        flex: 1, 
    },
    arrowContainer: {
        marginLeft: 20,
    },
    header: {
        fontSize: 48,
        color: COLORS.text,
        marginLeft: 70   
    },
    form: {
        marginHorizontal: 20,
        flex: 4, 
    },
    input: {
        marginVertical: 8,
        height: 50,
        borderRadius: 10,
        padding: 10,
        backgroundColor: COLORS.white,
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        padding: 20,
        marginTop: 120,
        marginBottom: 20
    },
    loginText: {
        color: COLORS.white,
    },
    forgotPwd: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPwdText: {
        color: COLORS.primary,
    },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 20,
    marginTop: 20,
    width: "50%",
  },
  modalBtnText: {
    color: COLORS.primary,
  },
  modalCancelBtn: {
    marginTop: 10,
  },
  modalCancelBtnText: {
    color: 'red',
  },
});