// HomeHeader.js
import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';

const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../../../assets/images/logos/Logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios'  ? 140 : 50,
    backgroundColor: '#000', // Adjust this color as needed
  },
  logo: {
    width: 120, // Adjust the width as needed
    height: 60, // Adjust the height as needed
    resizeMode: 'contain',
  },
});

export default HomeHeader;
