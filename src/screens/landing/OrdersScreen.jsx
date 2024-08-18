import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

const OrdersScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <LottieView
                    source={require('../../../assets/animations/searching.json')} // Replace with the path to your Lottie JSON file
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                />
                <Text style={styles.notificationTextHeading}>
                    Not order yet
                </Text>
                <Text style={styles.notificationText}>
                    Every successful something starts with nothing.
                    Your next big idea starts here.
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Explore Gigs</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingBottom: 80,

    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    lottieAnimation: {
        width: Platform.OS === 'ios' ? 320 : 250,
        height: Platform.OS === 'ios' ? 320 : 250,
        transform: [{ scaleX: -1 }], // Invert the animation horizontally
    },
    notificationTextHeading: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 18 : 16,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 0,
    },

    notificationText: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        textAlign: 'center',
        marginVertical: 5,

    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,

    },
    buttonText: {
        color: '#28b96d',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: 'bold',
        textAlign: 'center',

    },
});

export default OrdersScreen;
