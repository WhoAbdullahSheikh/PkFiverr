import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SigninScreen = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrUsernameError, setEmailOrUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          navigation.navigate('HomeScreen');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkSession();
    GoogleSignin.configure({
      webClientId: '942835851882-h8vnfnrp021mh5vm8mgbvaoqnphvdemk.apps.googleusercontent.com',
    });
  }, [navigation]);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;
      const userRef = firestore().collection('users').doc('google');
      const userDoc = await userRef.get();
      const registeredUsers = userDoc.data()?.RegisteredUsers || [];

      if (registeredUsers.some((u) => u.email === user.email)) {
        // Save user session to AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(user));
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Registration Required', 'Please register first.');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Alert', 'You canceled the Google Sign-in process.');
      } else {
        console.error(error);
        Alert.alert('Error', 'There was a problem with Google Sign-In.');
      }
    }
  };

  const handleSignUpWithApple = () => {
    console.log('Sign Up with Apple');
  };

  const handleConnectWithFacebook = () => {
    console.log('Connect with Facebook');
  };

  const handleContinue = async () => {
    setEmailOrUsernameError('');
    setPasswordError('');

    let valid = true;

    if (!emailOrUsername) {
      setEmailOrUsernameError('Please enter an email or username');
      valid = false;
    }

    if (!password) {
      setPasswordError('Please enter a password');
      valid = false;
    }

    if (valid) {
      setLoading(true);
      try {
        // Check if emailOrUsername is an email or username
        let user;
        if (emailOrUsername.includes('@')) {
          // Handle email login
          user = await auth().signInWithEmailAndPassword(emailOrUsername, password);
        } else {
          // Handle username login
          const userRef = firestore().collection('users').doc('email'); // Adjust collection path as needed
          const userDoc = await userRef.get();
          const registeredUsers = userDoc.data()?.RegisteredUsers || [];

          const registeredUser = registeredUsers.find((u) => u.name === emailOrUsername);

          if (registeredUser) {
            user = await auth().signInWithEmailAndPassword(registeredUser.email, password);
          } else {
            setEmailOrUsernameError('Username does not exist.');
            valid = false;
          }
        }

        if (valid && user) {
          console.log('User signed in successfully!', user);
          // Save user session to AsyncStorage
          await AsyncStorage.setItem('userSession', JSON.stringify(user.user));

          // Navigate to HomeScreen only after successful sign in
          navigation.navigate('HomeScreen');
        }
      } catch (error) {
        // Handle errors
        if (error.code === 'auth/email-already-in-use') {
          setEmailOrUsernameError('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setEmailOrUsernameError('That email address is invalid!');
        } else if (error.code === 'auth/wrong-password') {
          setPasswordError('Incorrect password!');
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Startup');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPswd');
  };

  const clearText = (setter) => {
    setter('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient colors={['#212223', '#212223']} style={styles.gradient} />
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Icon name="chevron-up" size={20} color="#7e7e7e" />
        <Text style={styles.goback}>Go back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/socials/fiverr.png')} style={styles.logo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Welcome to <Text style={styles.pk}>Pk</Text>fiverr<Text style={styles.dot}>.</Text></Text>
            <Text style={styles.subtitle}>Please enter your registration email or username and password.</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, emailOrUsernameError ? styles.errorInput : null]}
                placeholder="Email or Username"
                placeholderTextColor="#7e7e7e"
                value={emailOrUsername}
                onChangeText={(text) => {
                  setEmailOrUsername(text);
                  if (text) {
                    setEmailOrUsernameError('');
                  }
                }}
              />
              {emailOrUsername ? (
                <TouchableOpacity style={styles.clearButton} onPress={() => clearText(setEmailOrUsername)}>
                  <Icon2 name="cancel" size={16} color="#616060" />
                </TouchableOpacity>
              ) : null}
            </View>
            {emailOrUsernameError ? <Text style={styles.errorText}>{emailOrUsernameError}</Text> : null}
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, passwordError ? styles.errorInput : null]}
                placeholder="Password"
                placeholderTextColor="#7e7e7e"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text) {
                    setPasswordError('');
                  }
                }}
              />
              {password ? (
                <TouchableOpacity style={styles.clearButton} onPress={() => clearText(setPassword)}>
                  <Icon2 name="cancel" size={16} color="#616060" />
                </TouchableOpacity>
              ) : null}
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={handleContinue} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Continue'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>Or via social networks</Text>
          <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={handleSignUpWithApple}>
            <Image source={require('../../../assets/images/socials/apple.png')} style={styles.icon} />
            <Text style={[styles.buttonText, styles.appleButtonText]}>Sign in with Apple</Text>
          </TouchableOpacity>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleConnectWithFacebook}>
              <Image source={require('../../../assets/images/socials/facebook.png')} style={styles.icon} />
              <Text style={[styles.buttonText, styles.facebookButtonText]}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={onGoogleButtonPress}>
              <Image source={require('../../../assets/images/socials/google.png')} style={styles.icon} />
              <Text style={[styles.buttonText, styles.googleButtonText]}>Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerButtonsContainer}>
            <TouchableOpacity style={styles.leftButton} onPress={handleSignup}>
              <Text style={styles.footerButtonText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={handleForgotPassword}>
              <Text style={styles.footerButtonText}>Forgot Password</Text>
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
  goback: {
    color: '#7e7e7e',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 14 : 13,
    fontFamily: 'Montserrat-Regular',
  },
  dot: {
    color: '#28b96d',
    fontSize: Platform.OS === 'ios' ? 48 : 44,
  },
  pk: {
    color: '#28b96d',
    fontSize: Platform.OS === 'ios' ? 30 : 27,
  },
  goBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 15,
    left: Platform.OS === 'ios' ? '56%' : '58%',
    transform: [{ translateX: -50 }],
    zIndex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 1,
    marginTop: Platform.OS === 'ios' ? 30 : 90,
  },
  logo: {
    width: Platform.OS === 'ios' ? 60 : 45,
    height: Platform.OS === 'ios' ? 60 : 45,
    borderRadius: 40,
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: Platform.OS === 'ios' ? 30 : 27,
    fontWeight: '700',
    color: '#FFF',
    marginTop: -5,
    paddingBottom: 1,
    marginBottom: 5,
    fontFamily: 'Montserrat-Black',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: Platform.OS === 'ios' ? 16 : 12,
    color: '#FFF',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: '#2e2f32',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 13 : 8,
    marginBottom: 15,
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
  },
  errorInput: {
    backgroundColor: '#312829',
  },
  errorText: {
    color: '#c23c3e',
    fontSize: 14,
    marginBottom: 14,
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
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 11,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#28b96d',
    fontFamily: 'Montserrat-Semibold',
    paddingRight: Platform.OS === 'ios' ? 10 : 20,
  },
  appleButton: {
    backgroundColor: 'white',
  },
  facebookButton: {
    backgroundColor: '#212223',
    borderWidth: 2,
    borderColor: '#424346',
    color: 'white',
    marginRight: 15,
    borderRadius: 9,
  },
  googleButton: {
    backgroundColor: '#212223',
    borderWidth: 2,
    borderColor: '#424346',
    paddingRight: 15,
    borderRadius: 9,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: Platform.OS === 'ios' ? 18 : 13,
    fontWeight: Platform.OS === 'ios' ? 500 : 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  appleButtonText: {
    color: '#000',
  },
  facebookButtonText: {
    color: '#FFF',
  },
  googleButtonText: {
    color: '#FFF',
  },
  orText: {
    color: '#7e7e7e',
    marginTop: 5,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14 : 11,
    fontFamily: 'Montserrat-Regular',
    width: '100%',
  },
  terms: {
    color: '#FFF',
    marginTop: 15,
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14 : 11,
    fontFamily: 'Montserrat-Regular',
    paddingBottom: Platform.OS === 'ios' ? 50 : 100,
    width: '100%',
  },
  link: {
    color: '#28b96d',
    textDecorationLine: 'none',
    fontFamily: 'Montserrat-Regular',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '48%',
    marginTop: 2,
    marginBottom: 80,

  },
  footerButtonsContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 15,
    right: 15,
    alignItems: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Platform.OS === 'ios' ? 5 : 5,
  },
  footerButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  footerButtonText: {
    color: '#28b96d',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    fontFamily: 'Montserrat-Black',
  },
});

export default SigninScreen;
