import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userSession = await AsyncStorage.getItem('userSession');
                if (userSession) {
                    const user = JSON.parse(userSession);
                    setEmail(user.email);
                    setFullName(user.displayName); 
                } else {
                    Alert.alert('No User Data', 'User is not logged in.');
                }
            } catch (error) {
                console.log('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        setModalVisible(true); 
    };

    const confirmLogout = async () => {
        try {
            await AsyncStorage.removeItem('userSession');
            setModalVisible(false);
            navigation.navigate('Signin');
        } catch (error) {
            console.log('Failed to log out:', error);
            setModalVisible(false);
        }
    };

    const cancelLogout = () => {
        setModalVisible(false); 
    };

    const balancenavigate = () => {
        navigation.navigate('BalanceScreen');
    };

    const deactivationnavigate = () => {
        navigation.navigate('DeactivationScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Account Info Section */}
                <Text style={styles.sectionTitle}>Account info</Text>
                <View style={styles.section}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Full name</Text>
                        <Text style={styles.info}>{fullName || 'Loading...'}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.info}>{email || 'Loading...'}</Text>
                    </View>

                    <TouchableOpacity style={styles.optionContainer} onPress={balancenavigate}>
                        <Text style={styles.optionText}>Personal balance</Text>
                        <Icon name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>

                {/* Account Management Section */}
                <Text style={styles.sectionTitle}>Account management</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.optionContainer} onPress={deactivationnavigate}>
                        <Text style={styles.optionText}>Deactivation and deletion</Text>
                        <Icon name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Privacy</Text>
                        <Icon name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Icon2 name="logout" size={22} color="#da5d5d" style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Custom Logout Confirmation Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={cancelLogout}
            >
                <TouchableWithoutFeedback onPress={cancelLogout}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Logout Confirmation</Text>
                                <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={cancelLogout}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.confirmButton}
                                        onPress={confirmLogout}
                                    >
                                        <Text style={styles.confirmButtonText}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121213',
    },
    contentContainer: {
        marginTop: 10,
        padding: 0,
    },
    section: {
        backgroundColor: '#222324',
        padding: 15,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: Platform.OS === 'ios' ? 23 : 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 15,
        marginHorizontal: 15,
        fontFamily: 'Raleway-Regular',
    },
    infoRow: {
        marginBottom: 15,
    },
    label: {
        fontSize: Platform.OS === 'ios' ? 16 : 12,
        color: '#797b84',
        fontFamily: 'Raleway-Regular',
    },
    info: {
        fontSize: 16,
        color: '#797b84',
        fontWeight: 'bold',
        marginTop: 5,
        fontFamily: 'Raleway-Regular',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopColor: '#333333',
        borderTopWidth: 1,
    },
    optionText: {
        fontSize: Platform.OS === 'ios' ? 18 : 14,
        color: '#FFFFFF',
        fontFamily: 'Raleway-Regular',
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        marginBottom: 0,
    },
    logoutIcon: {
        marginRight: 15,
    },
    logoutText: {
        fontSize: Platform.OS === 'ios' ? 18 : 14,
        fontWeight: 'bold',
        color: '#da5d5d',
        fontFamily: 'Raleway-Regular',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#222324',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: Platform.OS === 'ios' ? 22 : 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#444444',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#da5d5d',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default AccountScreen;
