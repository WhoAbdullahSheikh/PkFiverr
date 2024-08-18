import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

const InboxScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <LottieView
                    source={require('../../../assets/animations/mailbox.json')} // Replace with the path to your Lottie JSON file
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                />
                <Text style={styles.notificationText}>
                    Get notified about new messages, orders, and more on your device.
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Allow App Notifications</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121214',
        paddingBottom: 20,
        
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    lottieAnimation: {
        width: Platform.OS === 'ios' ? 260 : 250,
        height: Platform.OS === 'ios' ? 260 : 250,
        transform: [{ scaleX: -1 }], // Invert the animation horizontally
    },
    notificationText: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        textAlign: 'center',
        marginVertical: 15,
        
    },
    button: {
        backgroundColor: '#28b96d',
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
});

export default InboxScreen;
