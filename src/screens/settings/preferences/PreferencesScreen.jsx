import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PreferencesScreen = () => {
    const [isOnline, setIsOnline] = useState(true);

    const options = [
        { text: 'Notifications', onPress: () => console.log('Notifications Pressed') },
        { text: 'Security', onPress: () => console.log('Security Pressed') },
        { text: 'Language', onPress: () => console.log('Language Pressed') },
        { text: 'Appearance', onPress: () => console.log('Appearance Pressed') },
        { text: 'Currency', onPress: () => console.log('Currency Pressed') },
    ];

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.section}>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.optionContainer} onPress={option.onPress}>
                            <Text style={styles.optionText}>{option.text}</Text>
                            <Icon name="angle-right" size={20} color="#c4c4c4" />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.section}>
                    <View style={styles.switchContainer}>
                        <Text style={styles.optionText}>Online status</Text>
                        <Switch
                            value={isOnline}
                            onValueChange={setIsOnline}
                            thumbColor={isOnline ? '#f4f3f4' : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: '#4cd137' }}
                        />
                    </View>
                </View>
                <Text style={styles.descriptionText}>
                    You’ll remain Online for as long as the app is open.
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121213',
        paddingVertical: 30,
    },
    section: {
        backgroundColor: '#222324',
        padding: 15,
        marginBottom: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    optionText: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
        fontFamily: 'Raleway-Regular',
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 1,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    descriptionText: {
        color: '#c4c4c4',
        fontSize: Platform.OS === 'ios' ? 14 : 10,
        paddingHorizontal: 20,
        marginTop: 0,
    },
});

export default PreferencesScreen;
