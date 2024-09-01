import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmDelectionScreen = ({ navigation }) => {
    const handleDeletion = async () => {
        const user = auth().currentUser;

        if (!user) {
            Alert.alert('Error', 'No user is currently logged in.');
            return;
        }

        try {
            const userEmail = user.email.toLowerCase(); // Convert email to lowercase

            // References to the documents in the 'users' collection
            const googleDocRef = firestore().collection('users').doc('google');
            const emailDocRef = firestore().collection('users').doc('email');

            // Fetch both documents
            const [googleDoc, emailDoc] = await Promise.all([
                googleDocRef.get(),
                emailDocRef.get()
            ]);

            if (!googleDoc.exists) {
                Alert.alert('Error', 'Google document does not exist.');
                return;
            }

            if (!emailDoc.exists) {
                Alert.alert('Error', 'Email document does not exist.');
                return;
            }

            // Retrieve data
            const googleData = googleDoc.data() || {};
            const emailData = emailDoc.data() || {};

            const googleUsers = googleData.RegisteredUsers || [];
            const emailUsers = emailData.RegisteredUsers || [];

            console.log('Google Users:', googleUsers);
            console.log('Email Users:', emailUsers);

            // Check if the email exists in either document, case-insensitive
            const emailInGoogle = googleUsers.some(userMap => userMap.email.toLowerCase() === userEmail);
            const emailInEmail = emailUsers.some(userMap => userMap.email.toLowerCase() === userEmail);

            if (!emailInGoogle && !emailInEmail) {
                Alert.alert('Error', 'User email not found in the database.');
                return;
            }

            // Confirm deletion
            Alert.alert(
                'Confirm Deletion',
                'Your email was found in the database. Proceed with account deletion?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            // Update both documents to remove the user's email
                            const updatedGoogleUsers = googleUsers.filter(userMap => userMap.email.toLowerCase() !== userEmail);
                            const updatedEmailUsers = emailUsers.filter(userMap => userMap.email.toLowerCase() !== userEmail);

                            console.log('Updated Google Users:', updatedGoogleUsers);
                            console.log('Updated Email Users:', updatedEmailUsers);

                            await Promise.all([
                                googleDocRef.update({ RegisteredUsers: updatedGoogleUsers }),
                                emailDocRef.update({ RegisteredUsers: updatedEmailUsers })
                            ]);

                            // Delete the user from Firebase Authentication
                            await user.delete();

                            // Clear AsyncStorage
                            await AsyncStorage.clear();

                            // Notify the user and navigate
                            Alert.alert('Success', 'Your account has been deleted.');
                            navigation.navigate('Signin'); // Adjust the navigation target as needed
                        },
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'An error occurred while deleting your account.');
            console.error('Account Deletion Error:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>What happens when you delete your account?</Text>
            <Text style={styles.description}>
                The deletion process is permanent and cannot be reversed. It might take up to 30 days to complete the process.
            </Text>
            <Text style={styles.bulletPoint}>o Any usernames associated with this account cannot be reused on new accounts in the future.</Text>
            <Text style={styles.bulletPoint}>o We recommend reviewing your orders and messages before you request it so that you can retrieve any files and information you might need in the future.</Text>
            <TouchableOpacity style={styles.button} onPress={handleDeletion}>
                <Text style={styles.buttonText}>Continue to Account Deletion</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 20,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 20,
    },
    bulletPoint: {
        fontSize: 16,
        marginLeft: 15,
        color: '#ccc',
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
    },
    button: {
        marginTop: 40,
        backgroundColor: '#d9534f',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ConfirmDelectionScreen;
