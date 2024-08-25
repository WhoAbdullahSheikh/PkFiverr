import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommunityScreen = () => {
    const options = [
        { text: 'Forum', onPress: () => console.log('Forum Pressed') },
        { text: 'Blog', onPress: () => console.log('Blog Pressed') },
        { text: 'Community standards', onPress: () => console.log('Community standards Pressed') },
        { text: 'Terms of service', onPress: () => console.log('Terms of service Pressed') },
        { text: 'Privacy policy', onPress: () => console.log('Privacy policy Pressed') },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <ScrollView>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.optionContainer} onPress={option.onPress}>
                            <Text style={styles.optionText}>{option.text}</Text>
                            <Icon name="angle-right" size={20} color="#c4c4c4" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );``
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121213',
        paddingVertical: 40,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        fontFamily: 'Raleway-Regular',
    },
    optionText: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    section: {
        backgroundColor: '#222324',
        padding: 15,
        marginBottom: 30,
    },
});

export default CommunityScreen;
