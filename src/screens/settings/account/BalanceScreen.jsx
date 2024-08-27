import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const BalanceScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>PkFiverr balance</Text>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>From canceled orders</Text>
                    <Text style={styles.balanceAmount}>Rs0.00</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>PkFiverr credits</Text>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Credits</Text>
                    <Text style={styles.balanceAmount}>Rs0.00</Text>
                </View>
            </View>

            <Text style={styles.infoText}>
                Like to earn more credits? Refer people you know and everyone benefits!
            </Text>

            <TouchableOpacity>
                <Text style={styles.earnCreditsLink}>Earn PkFiverr Credits</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121214',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 23 : 18,
        fontFamily: 'Raleway-Bold',
        marginBottom: 10,
    },
    balanceContainer: {
        backgroundColor: '#1C1D21',
        padding: 15,
        borderRadius: 10,
    },
    balanceLabel: {
        color: '#A0A4A8',
        fontSize: 14,
        fontFamily: 'Raleway-Regular',
        marginBottom: 5,
    },
    balanceAmount: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 24 : 18,

    },
    infoText: {
        color: '#A0A4A8',
        fontSize: 14,
        fontFamily: 'Raleway-Regular',
        marginBottom: 10,
    },
    earnCreditsLink: {
        color: '#30C960',
        fontSize: 16,
        fontFamily: 'Raleway-Bold',
    },
});

export default BalanceScreen;
