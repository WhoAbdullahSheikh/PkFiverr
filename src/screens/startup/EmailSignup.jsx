import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import debounce from 'lodash.debounce';

const EmailSignup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [nameSuccess, setNameSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Debounced function for checking username availability
    const checkUsernameAvailability = useCallback(debounce(async (username) => {
        const validationError = validateUsername(username);
        if (validationError) {
            setNameError(validationError);
            setNameSuccess('');
            return;
        }

        try {
            // Fetch both documents
            const userRefEmail = firestore().collection('users').doc('email');
            const userRefGoogle = firestore().collection('users').doc('google');
            
            const [docEmail, docGoogle] = await Promise.all([
                userRefEmail.get(),
                userRefGoogle.get()
            ]);

            const dataEmail = docEmail.data() || {};
            const dataGoogle = docGoogle.data() || {};

            const usersArrayEmail = dataEmail.RegisteredUsers || [];
            const usersArrayGoogle = dataGoogle.RegisteredUsers || [];

            // Check if username is taken in either document
            const usernameTaken = usersArrayEmail.some((user) => user.name.toLowerCase() === username.toLowerCase()) ||
                usersArrayGoogle.some((user) => user.name.toLowerCase() === username.toLowerCase());

            if (usernameTaken) {
                setNameError('Opss, Username is already taken');
                setNameSuccess('');
            } else {
                setNameSuccess('Perfect, Username is available');
                setNameError('');
            }
        } catch (error) {
            console.log('Error checking username:', error);
        }
    }, 300), []); // Reduced debounce delay to 300ms for more responsive feedback

    // Validate username on input change
    useEffect(() => {
        checkUsernameAvailability(name);
    }, [name, checkUsernameAvailability]);

    const validateUsername = (username) => {
        if (username.length < 8 || username.length > 20) {
            return 'Username must be between 8 and 20 characters';
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            return 'Username must be alphanumeric';
        }
        if (!/[a-zA-Z]/.test(username)) {
            return 'Username must contain at least one letter';
        }
        if (!/\d/.test(username)) {
            return 'Username must contain at least one number';
        }
        return '';
    };

    const validateForm = () => {
        if (!name || !email || !password) {
            setModalMessage('All fields are required.');
            setModalVisible(true);
            return false;
        }

        const nameValidationError = validateUsername(name);
        if (nameValidationError) {
            setModalMessage(nameValidationError);
            setModalVisible(true);
            return false;
        }

        return true;
    };

    const handleGoBack = () => {
        navigation.navigate('Signup');
    };

    const handleSignup = async () => {
        setError('');
        setLoading(true);
    
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
    
            if (user) {
                // Make sure user is authenticated
                if (!auth().currentUser) {
                    throw new Error('User is not authenticated');
                }
    
                await user.updateProfile({
                    displayName: name,
                });
    
                const userData = {
                    id: user.uid,
                    name,
                    email,
                    photo: '', 
                };
    
                // Update both documents
                const userRefEmail = firestore().collection('users').doc('email');
                const userRefGoogle = firestore().collection('users').doc('google');                
    
                const [docEmail, docGoogle] = await Promise.all([
                    userRefEmail.get(),
                    userRefGoogle.get()
                ]);
    
                const dataEmail = docEmail.data() || {};
                const dataGoogle = docGoogle.data() || {};
    
                const usersArrayEmail = dataEmail.RegisteredUsers || [];
                const usersArrayGoogle = dataGoogle.RegisteredUsers || [];
    
                usersArrayEmail.push(userData);
                usersArrayGoogle.push(userData);
    
                await Promise.all([
                    userRefEmail.set({ RegisteredUsers: usersArrayEmail }),
                    userRefGoogle.set({ RegisteredUsers: usersArrayGoogle })
                ]);
    
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
            {/* Display username validation messages */}
            {nameError ? <Text style={[styles.errorText, { color: styles.colors.error }]}>{nameError}</Text> : null}
            {nameSuccess ? <Text style={[styles.errorText, { color: styles.colors.success }]}>{nameSuccess}</Text> : null}
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
            {renderPasswordRequirements(password)}
            {error ? <Text style={[styles.errorText, { color: styles.colors.error }]}>{error}</Text> : null}
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
                <Text style={styles.signupButtonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>
                By joining, you agree to PkFiverr's{' '}
                <Text style={styles.linkText}>Terms of Service</Text>
            </Text>
            {/* Modal for displaying errors */}
            <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="alert-circle" size={34} color="#FF6F61" style={styles.modalTitleIcon} />
            <View style={styles.modalTitleContainer}>

              <Text style={styles.modalTitle}>Whopsssss</Text>
            </View>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        </View>
    );
};

const renderPasswordRequirements = (password = '') => {
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
                { color: req.fulfilled ? '#28b96d' : 'white', fontSize: 12 },
            ]}
        >
            -  {req.text}
        </Text>
    ));
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
        color: '#28b96d',
        textDecorationLine: 'none',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 14,
        textAlign: 'flex-start',
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    colors: {
        success: '#28b96d', // Custom success color
        error: '#e74c3c',   // Custom error color
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      modalTitleIcon: {
        justifyContent: 'center',
        marginBottom: 10,
      },
      modalTitle: {
        fontSize: Platform.OS === 'ios' ? 22 : 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
      },
      modalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#222324',
        alignItems: 'center',
      },
      modalMessage: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
      },
    
      modalButton: {
        padding: 10,
        backgroundColor: '#28b96d',
        borderRadius: 5,
        width: '100%',
      },
      modalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
      },
});

export default EmailSignup;
