import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon if not already imported
import auth from '@react-native-firebase/auth'; // Import Firebase Auth
import firestore from '@react-native-firebase/firestore'; // Import Firebase Firestore

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let valid = true;

    // Reset error messages
    setEmailError('');

    // Validate email
    if (!email) {
      setEmailError('Please enter your email');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Simple email validation
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (valid) {
      setLoading(true);
      try {
        const userEmail = email.toLowerCase();

        // References to the documents in the 'users' collection
        const googleDocRef = firestore().collection('users').doc('google');
        const emailDocRef = firestore().collection('users').doc('email');

        // Fetch both documents
        const [googleDoc, emailDoc] = await Promise.all([
          googleDocRef.get(),
          emailDocRef.get()
        ]);

        if (!googleDoc.exists && !emailDoc.exists) {
          setEmailError('Documents do not exist.');
          setLoading(false);
          return;
        }

        // Retrieve data
        const googleData = googleDoc.data() || {};
        const emailData = emailDoc.data() || {};

        const googleUsers = googleData.RegisteredUsers || [];
        const emailUsers = emailData.RegisteredUsers || [];

        // Check if the email exists in either document, case-insensitive
        const emailInGoogle = googleUsers.some(userMap => userMap.email.toLowerCase() === userEmail);
        const emailInEmail = emailUsers.some(userMap => userMap.email.toLowerCase() === userEmail);

        if (!emailInGoogle && !emailInEmail) {
          setEmailError('No user found with this email address');
          setLoading(false);
          return;
        }

        // Send password reset email
        await auth().sendPasswordResetEmail(email);
        alert('Password reset link sent to your email');
        navigation.goBack();
      } catch (error) {
        console.error('Error sending password reset email:', error);
        if (error.code === 'auth/invalid-email') {
          setEmailError('Invalid email address');
        } else if (error.code === 'auth/user-not-found') {
          setEmailError('No user found with this email address');
        } else {
          setEmailError('An error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient colors={['#212223', '#212223']} style={styles.gradient} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Icon name="arrow-back-ios" size={20} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.header}>Forgot Password</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, emailError ? styles.errorInput : null]}
                placeholder="Email"
                placeholderTextColor="#7e7e7e"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (text) {
                    setEmailError('');
                  }
                }}
              />
              {email ? (
                <TouchableOpacity style={styles.clearButton} onPress={() => setEmail('')}>
                  <Icon name="cancel" size={16} color="#616060" />
                </TouchableOpacity>
              ) : null}
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : <Text style={styles.noteText}>We will send you a link to reset your password.</Text>}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 50 : 10,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: Platform.OS === 'ios' ? 24 : 20,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    color: '#FFF',
    fontFamily: 'Montserrat-Semibold',
    textAlign: 'center',
    paddingRight: Platform.OS === 'ios' ? 20 : 30,
    flex: 1,
  },
  inputContainer: {
    width: '92%',
    marginTop: Platform.OS === 'ios' ? 40 : 40,
    marginHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#2e2f32',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 13 : 8,
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
  },
  errorInput: {
    backgroundColor: '#312829',
  },
  errorText: {
    color: '#c23c3e',
    fontSize: 14,
    marginBottom: 1,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 1,
    top: 11,
  },
  buttonContainer: {
    width: '92%',
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 11,
    borderRadius: 8,
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#28b96d',
  },
  buttonText: {
    fontSize: Platform.OS === 'ios' ? 18 : 13,
    fontWeight: Platform.OS === 'ios' ? 500 : 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  noteText: {
    color: '#7e7e7e',
    fontSize: 14,
    marginBottom: 1,
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default ForgotPasswordScreen;
