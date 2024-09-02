import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const PrivacyInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Do not sell or share my personal information
      </Text>
      <Text style={styles.description}>
        PkFiverr doesn’t share your personal info for monetary compensation. When
        we do share your info with our partners, it helps us tailor PkFiverr’s
        offers, ads, and content to suit your preferences while you're browsing
        other sites. Just to let you know, this process may constitute selling
        or sharing of personal information under certain US state privacy laws.
      </Text>
      <Text style={styles.optOutText}>
        To opt out of sharing your information for such personalized ads,
        contact privacy@pkfiverr.com
      </Text>

      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>Need help?</Text>
        <Text style={styles.helpDescription}>
          For more information about how we use personal data visit our Privacy
          Policy.
        </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>PkFiverr’s Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 23 : 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  description: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  optOutText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  helpBox: {
    backgroundColor: '#222324',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  helpTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Raleway-Regular',
  },
  helpDescription: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  linkText: {
    color: '#30C960',
    fontSize: 14,
    textDecorationLine: 'none',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
});

export default PrivacyInfoScreen;
