import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const SignupScreen = ({ navigation }) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '942835851882-h8vnfnrp021mh5vm8mgbvaoqnphvdemk.apps.googleusercontent.com',
    });

    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
      firebase.initializeApp();
    }
  }, []);

  async function onGoogleButtonPress() {
    try {
      console.log('Attempting to sign in with Google...');
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', user);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Signing in with the credential
      await auth().signInWithCredential(googleCredential);

      // Get reference to the 'users' collection
      const userRef = firestore().collection('users').doc('google');
      const userDoc = await userRef.get();

      // Extract the RegisteredUsers array or set it to an empty array if not found
      const registeredUsers = userDoc.data()?.RegisteredUsers || [];

      // Check if the user's email is already registered
      const isAlreadyRegistered = registeredUsers.some((u) => u.email === user.email);

      if (isAlreadyRegistered) {
        Alert.alert('Already Registered', 'This account is already registered. Please try to sign in');
      } else {
        // Save user data in Firestore if not already registered
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        };

        await userRef.set(
          {
            RegisteredUsers: firestore.FieldValue.arrayUnion(userData),
          },
          { merge: true }
        );

        Alert.alert('Registration Successful', 'Your account has been registered successfully.');

        // Navigate to Signin screen after successful registration
        navigation.navigate('Signin');
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed", "Something went wrong during the sign-in process.");
    }
  }

  const handleSignUpWithApple = () => {
    console.log('Sign Up with Apple');
  };

  const handleConnectWithFacebook = () => {
    console.log('Connect with Facebook');
  };

  const handleSignUpWithEmail = () => {
    navigation.navigate('SignUpWithEmail');
  };

  const handleGoBack = () => {
    navigation.navigate('Startup');
  };

  const handleSignIn = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#212223', '#212223']} style={styles.gradient} />
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Icon name="chevron-up" size={20} color="#7e7e7e" />
        <Text style={styles.goback}>Go back</Text>
      </TouchableOpacity>
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/socials/fiverr.png')} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Join <Text style={styles.pk}>Pk</Text>fiverr<Text style={styles.dot}>.</Text></Text>
          <Text style={styles.subtitle}>Create an account and discover thousands of{'\n'}relevant services, connect with freelancers,{'\n'}and check out easily on PkFiverr's trusted{'\n'}platform.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={handleSignUpWithApple}>
            <Image source={require('../../../assets/images/socials/apple.png')} style={styles.icon} />
            <Text style={[styles.buttonText, styles.appleButtonText]}>Sign up with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleConnectWithFacebook}>
            <Image source={require('../../../assets/images/socials/facebook.png')} style={styles.icon} />
            <Text style={[styles.buttonText, styles.facebookButtonText]}>Connect With Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
            <Image source={require('../../../assets/images/socials/google.png')} style={styles.icon} />
            <Text style={[styles.buttonText, styles.googleButtonText]}>Connect With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.emailButton]} onPress={handleSignUpWithEmail}>
            <Text style={[styles.buttonText, styles.emailButtonText]}>Sign Up With Email</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.terms}>
          By joining, you agree to PkFiverr's{' '}
          <Text style={styles.link} onPress={() => console.log('Navigate to Terms of Service')}>Terms of Service</Text>
        </Text>
        <View style={styles.footerButtonsContainer}>
          <TouchableOpacity style={styles.rightButton} onPress={handleSignIn}>
            <Text style={styles.footerButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    fontSize: Platform.OS === 'ios' ? 50 : 45,
  },
  pk: {
    color: '#28b96d',
    fontSize: Platform.OS === 'ios' ? 32 : 28,
  },
  goBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 15,
    left: Platform.OS === 'ios' ? '56%' : '58%',
    transform: [{ translateX: -50 }],
    zIndex: 1,
    alignItems: 'center',
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
    fontSize: Platform.OS === 'ios' ? 32 : 28,
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
  appleButton: {
    backgroundColor: 'white',
    color: 'black',
  },
  facebookButton: {
    backgroundColor: '#2e2f32',
    color: 'white',
  },
  googleButton: {
    backgroundColor: '#2e2f32',
  },
  emailButton: {
    backgroundColor: '#28b96d',
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
  emailButtonText: {
    color: 'black',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
  },
  terms: {
    color: '#FFF',
    marginTop: 15,
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14 : 11,
    fontFamily: 'Montserrat-Regular',
    paddingBottom: Platform.OS === 'ios' ? 90 : 100,
    width: '100%',
  },
  link: {
    color: '#28b96d',
    textDecorationLine: 'none',
    fontFamily: 'Montserrat-Regular',
  },
  footerButtonsContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 10,
    right: 10,
    alignItems: 'flex-end',
    width: '100%',
  },
  rightButton: {
    padding: 10,
    marginTop: Platform.OS === 'ios' ? 10 : 30,
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

export default SignupScreen;
