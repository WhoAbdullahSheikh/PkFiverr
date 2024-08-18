import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Startup'); // Navigate to Home screen after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/logos/Logo.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Black background color
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
