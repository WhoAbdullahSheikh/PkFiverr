import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';

// Define the component
const DeactivationScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Function to handle continue button press
    const handleContinue = () => {
        if (!selectedOption) {
            Alert.alert('Please select an option', 'You need to select either Deactivate or Delete account.');
            return;
        }

        if (selectedOption === 'delete') {
            // Navigate to the ConfirmDelectionScreen when 'delete' is selected
            navigation.navigate('ConfirmDelectionScreen');
        } else {
            // Handle deactivation logic if needed
            Alert.alert('Selected Option', `You selected to ${selectedOption}.`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deactivating or deleting your PkFiverr account</Text>
            <Text style={styles.subtitle}>
                If you want to temporarily close your account, you can deactivate it. If you want to permanently remove your data from PkFiverr, you can delete your account.
            </Text>

            <TouchableOpacity
                style={[
                    styles.optionContainer,
                    selectedOption === 'deactivate' && styles.optionSelected,
                ]}
                onPress={() => setSelectedOption('deactivate')}
            >
                <Text style={styles.optionTitle}>Deactivate account</Text>
                <Text style={styles.optionDescription}>
                    Your profile won’t be shown on PkFiverr. Active orders will be cancelled.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.optionContainer,
                    selectedOption === 'delete' && styles.optionSelected,
                ]}
                onPress={() => setSelectedOption('delete')}
            >
                <Text style={styles.optionTitle}>Delete account</Text>
                <Text style={styles.optionDescription}>
                    Deleting your account is permanent and irreversible. You won’t be able to retrieve the files or information from your orders on PkFiverr.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121214',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 20 : 16,
        fontFamily: 'Raleway-Bold',
        marginBottom: 10,
    },
    subtitle: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontFamily: 'Raleway-Regular',
        marginBottom: 20,
    },
    optionContainer: {
        backgroundColor: '#1C1D21',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    optionSelected: {
        borderColor: '#30C960',
        borderWidth: 2,
    },
    optionTitle: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontFamily: 'Raleway-Bold',
        marginBottom: 5,
    },
    optionDescription: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontFamily: 'Raleway-Regular',
    },
    continueButton: {
        backgroundColor: '#C52C25',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 'auto',
    },
    continueButtonText: {
        color: 'black',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontFamily: 'Raleway-Bold',
    },
});

export default DeactivationScreen;
