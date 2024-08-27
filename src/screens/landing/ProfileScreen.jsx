import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Simulate loading delay
                setTimeout(async () => {
                    const userSession = await AsyncStorage.getItem('userSession');
                    if (userSession) {
                        setUser(JSON.parse(userSession));
                    } else {
                        Alert.alert('No User Data', 'User is not logged in.');
                    }
                    setLoading(false); // End loading
                }, 500); // 1-second delay
            } catch (error) {
                console.error('Failed to fetch user session', error);
                Alert.alert('Error', 'Failed to load user data.');
                setLoading(false); // End loading
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userSession');
            navigation.navigate('Signin');
        } catch (error) {
            console.error('Failed to log out', error);
            Alert.alert('Error', 'Failed to log out.');
        }
    };

    const accountnavigate = () => {
        navigation.navigate('AccountScreen');
    };

    const preferencesnavigate = () => {
        navigation.navigate('PreferencesScreen');
    };

    const communitynavigate = () => {
        navigation.navigate('CommunityScreen');
    };

    const handleInviteFriends = () => {
        setModalVisible(true);
    };

    const interestnavigate = () => {
        navigation.navigate('InterestSelectionScreen');
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>User data not found.</Text>
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
                            source={{ uri: user.photoURL || 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460' }}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.profileName}>{user.displayName || 'Guest'}</Text>
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
                        <TouchableOpacity style={styles.menuItem} onPress={interestnavigate}>
                            <Icon2 name="bookmark" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>My interests</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={handleInviteFriends}>
                            <Icon name="paper-plane-o" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Invite friends</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.menuItem} onPress={preferencesnavigate}>
                            <Icon3 name="settings" size={21} color="#ffffff" />
                            <Text style={styles.menuText}>Preferences</Text>
                            <Icon2 name="chevron-right" size={21} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={accountnavigate}>
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
                        <TouchableOpacity style={styles.menuItem} onPress={communitynavigate}>
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
            </ScrollView>

            {/* Invite Friends Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Share & get up to $100 off</Text>
                                <Text style={styles.modalSubtitle}>Give friends a 10% discount up to $100 off their first Fiverr order.</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.inviteButton}
                                        onPress={() => Alert.alert('Invite Friends', 'Invite friends button pressed')}
                                    >
                                        <Text style={styles.buttonText}>Invite Friends</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
        backgroundColor: '#0d3d1d',
        paddingTop: Platform.OS === 'ios' ? 80 : 30,
        paddingBottom: 40,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 45,
        borderWidth: 0,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileName: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        fontWeight: 'bold',
        marginLeft: 15,
        fontFamily: 'Raleway-Regular',
    },
    bellIcon: {
        flex: 1,
        textAlign: 'right',
    },
    scrollContainer: {
        paddingTop: 130,
    },
    section: {
        backgroundColor: '#222324',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        backgroundColor: '#121213',
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 24 : 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
    },
    menuText: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
        marginLeft: 15,
        flex: 1,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121213',
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 18,
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: Platform.OS === 'ios' ? '75%' : '90%',
        padding: 20,
        backgroundColor: '#222324',
        borderRadius: 10,
        height: Platform.OS === 'ios' ? '30%' : '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: Platform.OS === 'ios' ? 22 : 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
        fontFamily: 'Raleway-Regular',
    },
    modalSubtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Raleway-Regular',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 0,
        width: '100%',
    },
    inviteButton: {
        backgroundColor: '#28b96d',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Raleway-Regular',
        fontWeight: '500',
    },
    closeButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ProfileScreen;
