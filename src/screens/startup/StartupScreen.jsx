import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

const StartupScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Signup');
  };

  const handleSkip = () => {
    navigation.navigate('Signup');
  };

  const handleSignIn = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../../assets/videos/startup.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
        playInBackground={false}
        playWhenInactive={false}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 1)']}
        style={styles.gradient}
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>
            <Text style={styles.pk}>Pk</Text>fiverr
            <Text style={styles.dot}>.</Text>
          </Text>
          <Text style={styles.subtitle}>Freelance Services.</Text>
          <Text style={styles.subtitle}>On Demand.</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <View style={styles.buttonContent}>
              <Icon
                name="search1"
                size={30}
                color="#28b96d"
                style={styles.icon}
              />
              <Text style={styles.buttonHeading}>Find a Service</Text>
              <Text style={styles.buttonSubtitle}>
                I'm looking for talented people to work with
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted} // Navigate to SignUp when pressed
          >
            <View style={styles.buttonContent}>
              <Icon2
                name="pencil"
                size={30}
                color="#28b96d"
                style={styles.icon}
              />
              <Text style={styles.buttonHeading}>Selling Services</Text>
              <Text style={styles.buttonSubtitle}>
                I'd like to offer my services
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footerButtonsContainer}>
          <TouchableOpacity style={styles.leftButton} onPress={handleSkip}>
            <Text style={styles.footerButtonText}>Skip</Text>
          </TouchableOpacity>
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  dot: {
    color: '#28b96d',
    fontSize: Platform.OS === 'ios' ? 70 : 65,
  },
  pk: {
    color: '#28b96d',
    fontSize: Platform.OS === 'ios' ? 56 : 45,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 20 : -10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 340 : 140,
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 100 : 60,
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 56 : 45,
    fontWeight: '800',
    marginBottom: Platform.OS === 'ios' ? 5 : -3,
    fontFamily: 'Montserrat-Black',
    color: '#FFF',
    zIndex: 2,
  },
  subtitle: {
    fontSize: Platform.OS === 'ios' ? 30 : 23,
    color: 'white',
    fontWeight: '700',
    marginBottom: 2,
    fontFamily: 'Montserrat-Regular',
    zIndex: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 5,
    zIndex: 3,
  },
  button: {
    backgroundColor: '#1c1d1e',
    padding: 10,
    zIndex: 3,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: '45%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 30,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonContent: {
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 12,
    zIndex: 3,
  },
  icon: {
    marginBottom: 10,
  },
  buttonHeading: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Black',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    marginTop: 12,
    zIndex: 3,
  },
  buttonSubtitle: {
    color: '#767880',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'ios' ? 16 : 11,
    marginTop: Platform.OS === 'ios' ? 8 : 6,
    zIndex: 3,
  },
  bottomContainer: {
    position: 'absolute',
    left: -3,
    right: -3,
    bottom: Platform.OS === 'ios' ? -100 : -60,
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 55,
    height: '40%',
    borderColor: '#4f9e57',
    borderWidth: 0,
    zIndex: 3,
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  leftButton: {
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    position: 'absolute',
    left: Platform.OS === 'ios' ? -20 : -18,
    zIndex: 3,
  },
  rightButton: {
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    position: 'absolute',
    right: Platform.OS === 'ios' ? -16 : -12,
    zIndex: 3,
  },
  footerButtonText: {
    color: '#28b96d',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    fontFamily: 'Montserrat-Black',
    zIndex: 3,
  },
});

export default StartupScreen;