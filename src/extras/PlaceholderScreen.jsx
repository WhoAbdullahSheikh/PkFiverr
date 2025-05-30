
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the {route.name} screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default PlaceholderScreen;
