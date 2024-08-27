import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const numColumns = 2;
const boxWidth = (width - 60) / numColumns; // 20px padding on each side + 20px between each column

const interestsData = [
    { id: 1, name: 'Create social media content', icon: 'comments-o' },
    { id: 2, name: 'Develop a brand identity', icon: 'id-badge' },
    { id: 3, name: 'Edit photos and images', icon: 'photo' },
    { id: 4, name: 'Create print-ready designs', icon: 'file-pdf-o' },
    { id: 5, name: 'Get professional photos taken', icon: 'camera-retro' },
    { id: 6, name: 'Improve gaming skills', icon: 'gamepad' },
];

const InterestSelectionScreen = () => {
    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
        const loadInterests = async () => {
            try {
                const savedInterests = await AsyncStorage.getItem('selectedInterests');
                if (savedInterests) {
                    setSelectedInterests(JSON.parse(savedInterests));
                }
            } catch (error) {
                console.error('Failed to load interests', error);
            }
        };

        loadInterests();
    }, []);

    const toggleSelection = (id) => {
        if (selectedInterests.includes(id)) {
            setSelectedInterests(selectedInterests.filter((interestId) => interestId !== id));
        } else {
            setSelectedInterests([...selectedInterests, id]);
        }
    };

    const handleSave = async () => {
        if (selectedInterests.length === 0) {
            Alert.alert('No interests selected', 'Please select at least one interest before saving.');
            return;
        }

        try {
            await AsyncStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
        } catch (error) {
            Alert.alert('Error', 'Failed to save interests.');
            console.error('Failed to save interests', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.itemContainer, selectedInterests.includes(item.id) && styles.selectedItem]}
            onPress={() => toggleSelection(item.id)}
        >
            <Icon name={item.icon} size={40} color={selectedInterests.includes(item.id) ? '#6B6F76' : '#A0A4A8'} />
            <Text style={[styles.itemText, selectedInterests.includes(item.id) && styles.selectedItemText]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your interests</Text>
            <Text style={styles.subtitle}>
                Please select at least one of the following services to get started.
            </Text>
            <FlatList
                data={interestsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121214',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 24 : 20,
        fontFamily: 'Raleway-Bold',
        marginBottom: 10,
    },
    subtitle: {
        color: '#797b84',
        fontSize: Platform.OS === 'ios' ? 18 : 15,
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
        marginBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    listContent: {
        paddingBottom: 20,
    },
    itemContainer: {
        width: boxWidth,
        height: boxWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1D21',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    selectedItem: {
        borderColor: '#28b96d',
        borderWidth: 2,
    },
    itemText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Raleway-Regular',
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    },
    selectedItemText: {
        color: 'white',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#28b96d',
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Raleway-Bold',
    },
});

export default InterestSelectionScreen;
