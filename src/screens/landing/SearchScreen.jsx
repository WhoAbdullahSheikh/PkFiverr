import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const categories = [
    { id: '1', name: 'Graphics & Design', description: 'Logo & Brand Identity, Gaming', icon: 'brush' },
    { id: '2', name: 'Digital Marketing', description: 'Social Media Marketing, SEO', icon: 'computer' },
    { id: '3', name: 'Writing & Translation', description: 'Articles & Blog Posts, Translation', icon: 'description' },
    { id: '4', name: 'Video & Animation', description: 'Video Editing, Video Ads & Commercials', icon: 'videocam' },
    { id: '5', name: 'Music & Audio', description: 'Music Producers, Singers & Vocalists', icon: 'music-note' },
    { id: '6', name: 'Programming & Tech', description: 'Website Development, Maintenance', icon: 'code' },
    { id: '7', name: 'Data', description: 'Data Science & ML, Databases', icon: 'bar-chart' },
    { id: '8', name: 'Business', description: 'Financial Consulting, E-Commerce Management', icon: 'business' },
];

const interests = [
    { id: '1', name: 'Create social media content', description: 'Social Media Copywriting, Social Media Design', icon: 'create' }, // Icon for content creation
    { id: '2', name: 'Develop a brand identity', description: 'Logo Design, Business Cards & Stationery', icon: 'branding-watermark' }, // Icon for brand identity
    { id: '3', name: 'Edit photos and images', description: 'Product Image Editing, Photo Manipulation', icon: 'photo' }, // Icon for photo editing
    { id: '4', name: 'Create print-ready designs', description: 'T-Shirts & Merchandise, Illustration', icon: 'print' }, // Icon for print designs
    { id: '5', name: 'Get professional photos taken', description: 'Product Photographers, Lifestyle & Fashion Photographers', icon: 'camera-alt' }, // Icon for photography
];


const Item = ({ name, description, icon }) => (
    <TouchableOpacity style={styles.itemContainer}>
        <Icon name={icon} size={24} color="#666" style={styles.icon} />
        <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{name}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
        </View>
    </TouchableOpacity>
);

const CategoriesScreen = () => {
    const [activeTab, setActiveTab] = useState('Categories');
    const [searchText, setSearchText] = useState('');

    const renderList = () => {
        const data = activeTab === 'Categories' ? categories : interests;
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase())
        );

        return (
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Item name={item.name} description={item.description} icon={item.icon} />}
                style={styles.list}
            />
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#797b84" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search services"
                    placeholderTextColor="#797b84"
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Categories' && styles.activeTabButton]}
                    onPress={() => setActiveTab('Categories')}
                >
                    <Text style={[styles.tabText, activeTab === 'Categories' && styles.activeTabText]}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Interests' && styles.activeTabButton]}
                    onPress={() => setActiveTab('Interests')}
                >
                    <Text style={[styles.tabText, activeTab === 'Interests' && styles.activeTabText]}>Interests</Text>
                </TouchableOpacity>
            </View>
            {renderList()}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222324',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#222324',
        paddingVertical: 10,
    },
    tabButton: {
        paddingBottom: 8, // Increased padding for more space
        paddingHorizontal: 20, // Increased horizontal padding for wider underline
        borderBottomWidth: 0, // Thicker border for the active tab
        borderBottomColor: 'transparent',
    },
    activeTabButton: {
        borderBottomColor: '#28b96d',
        borderBottomWidth: 3, // Increase the border thickness
        paddingHorizontal: 25, // Further increase horizontal padding for wider active underline
    },
    tabText: {
        color: '#797b84',
        fontSize: Platform.OS === 'ios' ? 18 : 16,
        fontFamily: 'Raleway-Regular',
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#28b96d',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        margin: 16,
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#fff',
    },
    list: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        color: '#fff',
        fontSize: Platform.OS === 'ios' ? 22 : 18,
        fontFamily: 'Raleway-Regular',
        fontWeight: Platform.OS === 'ios' ? 'bold' : 'bold',
    },
    itemDescription: {
        color: '#d9dadc',
        fontFamily: 'Raleway-Regular',
        fontSize: 14,
    },
});

export default CategoriesScreen;
