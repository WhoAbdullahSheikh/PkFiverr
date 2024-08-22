import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userSession = await AsyncStorage.getItem('userSession');
                if (userSession) {
                    setUser(JSON.parse(userSession));
                } else {
                    Alert.alert('No User Data', 'User is not logged in.');
                }
            } catch (error) {
                console.error('Failed to fetch user session', error);
                Alert.alert('Error', 'Failed to load user data.');
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userSession');
            // Navigate to SignInScreen after logout
            navigation.navigate('Signin');
        } catch (error) {
            console.error('Failed to log out', error);
            Alert.alert('Error', 'Failed to log out.');
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: user.photoURL || 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460' }} // Use user photoURL if available
                            style={styles.profileImage}
                        />
                        {/* Online Indicator */}
                        <View style={styles.onlineIndicator} />
                    </View>
                    <Text style={styles.profileName}>{user.displayName || 'Abdullah'}</Text>
                </View>
                <Icon2 name="bell" size={28} color="#ffffff" style={styles.bellIcon} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <Text style={styles.sectionTitle}>My PkFiverr</Text>
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name="diamond" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Get Inspired</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon2 name="heart" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Saved lists</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon2 name="bookmark" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>My interests</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name="paper-plane-o" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Invite friends</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Settings Section */}
                <View>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon3 name="settings" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Preferences</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon4 name="book-account-outline" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Account</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Resources Section */}
                <View>
                    <Text style={styles.sectionTitle}>Resources</Text>
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name="life-ring" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Support</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon4 name="message-question-outline" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Community and legal</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon4 name="clipboard-text-play-outline" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Become a Seller</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer Section */}
                <Text style={styles.versionText}>Version 0.0.1(1)</Text>

                {/* Sign Out Button */}
                <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 70 : 20,
        backgroundColor: '#121213',
    },
    header: {
        backgroundColor: '#1e4224',
        paddingTop: Platform.OS === 'ios' ? 80 : 30,
        paddingBottom: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute', // Make the header fixed
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensure the header is above the scrollable content
    },
    profileContainer: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center',
        flex: 3,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 45, // Make the container circular
        borderWidth: 2,
        borderColor: '#ffffff', // Optional: Add a border around the image
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensures the image stays within the circle
        position: 'relative', // Required for positioning the online indicator
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    onlineIndicator: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#34C759', // Green color for online status
        borderWidth: 2,
        borderColor: '#ffffff', // Border color to match the profile border
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    profileName: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 23 : 18,
        fontWeight: 'bold',
        marginLeft: 15, // Space between the image and the name
        fontFamily: 'Raleway-Regular',
    },
    bellIcon: {
        flex: 1,
        textAlign: 'right',
    },
    scrollContainer: {
        paddingTop: 130, // Create space for the fixed header
    },
    section: {
        backgroundColor: '#222324',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20, // Space between sections
    },
    sectionTitle: {
        backgroundColor: '#121213', // Black background for title
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 24 : 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Space between icon and text
        paddingVertical: 15,
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
    },
    menuText: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
        marginLeft: 15,
        flex: 1, // Allow text to take up the remaining space
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    versionText: {
        color: '#888888',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 100,
    },
    signOutButton: {
        backgroundColor: '#FF3B30', // Red color for the sign-out button
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
