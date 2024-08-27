import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userSession = await AsyncStorage.getItem('userSession');
                if (userSession) {
                    const user = JSON.parse(userSession);
                    setEmail(user.email);
                    setFullName(user.displayName); // Set the full name
                } else {
                    Alert.alert('No User Data', 'User is not logged in.');
                }
            } catch (error) {
                console.log('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('userSession');
                        navigation.navigate('Signin');
                    } catch (error) {
                        console.log('Failed to log out:', error);
                    }
                },
            },
        ]);
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
        </SafeAreaView>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121213',

    },
    contentContainer: {
        marginTop: 0,
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
});
