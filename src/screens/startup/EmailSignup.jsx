import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EmailSignup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const renderPasswordRequirements = () => {
        const requirements = [
            { text: 'At least 8 characters', fulfilled: password.length >= 8 },
            { text: 'At least 1 uppercase letter', fulfilled: /[A-Z]/.test(password) },
            { text: 'At least 1 lowercase letter', fulfilled: /[a-z]/.test(password) },
            { text: 'At least 1 number', fulfilled: /\d/.test(password) },
        ];

        return requirements.map((req, index) => (
            <Text
                key={index}
                style={[
                    styles.requirementText,
                    { color: req.fulfilled ? '#28b96d' : 'white', fontSize: 12, },
                ]}
            >
                o  {req.text}
            </Text>
        ));
    };

    const handleGoBack = () => {
        navigation.navigate('Signup');
    };

    const handleSignup = async () => {
        setError('');
        setLoading(true);

        try {
            // Create user with email and password using Firebase Authentication
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            if (user) {
                // Update user profile
                await user.updateProfile({
                    displayName: name,
                });

                // Prepare user data without storing plaintext password
                const userData = {
                    id: user.uid,
                    name,
                    email,
                    photo: '', // Optionally add a default photo URL if needed
                };

                // Get a reference to the 'email' document in the 'users' collection
                const userRef = firestore().collection('users').doc('email');

                // Get the current data from the document
                const doc = await userRef.get();
                const data = doc.data() || {};

                // Get the existing array or initialize an empty one
                const usersArray = data.RegisteredUsers || [];

                // Add the new user data to the array
                usersArray.push(userData);

                // Update the Firestore document with the new array
                await userRef.set({
                    RegisteredUsers: usersArray,
                });

                // Navigate to Sign In screen
                navigation.navigate('Signin');
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
                setError('That email address is invalid!');
            } else {
                setError('An error occurred. Please try again.');
            }

            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                <Icon name="chevron-up" size={20} color="#7e7e7e" />
                <Text style={styles.goback}>Go back</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Public username"
                placeholderTextColor="gray"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.infoText}>
                You can't change your username, so choose wisely.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {renderPasswordRequirements()}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
                <Text style={styles.signupButtonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>
                By joining, you agree to Fiverr's{' '}
                <Text style={styles.linkText}>Terms of Service</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919',
        paddingTop: '30%',
        padding: 10,
    },
    goBackButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 15,
        left: Platform.OS === 'ios' ? '58%' : '58%',
        transform: [{ translateX: -50 }],
        zIndex: 1,
        alignItems: 'center',
    },
    goback: {
        color: '#7e7e7e',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        fontFamily: 'Montserrat-Regular',
    },
    input: {
        width: '100%',
        backgroundColor: '#2e2f32',
        borderRadius: 8,
        padding: Platform.OS === 'ios' ? 13 : 8,
        marginBottom: 15,
        color: '#FFF',
        fontFamily: 'Montserrat-Regular',
    },
    infoText: {
        color: 'gray',
        fontSize: 12,
        marginBottom: 15,
    },
    requirementText: {
        color: 'white',
        marginBottom: 5,
    },
    signupButton: {
        backgroundColor: '#28b96d',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    signupButtonText: {
        color: 'black',
        fontSize: 16,
    },
    termsText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 12,
    },
    linkText: {
        color: '#28a745',
        textDecorationLine: 'none',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default EmailSignup;
