import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, Platform, Modal, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import logoDesign from '../../../assets/images/icons/logodesign.png';
import aiArtists from '../../../assets/images/icons/AIArtists.png';
import logoAnimation from '../../../assets/images/icons/logoAnimation.png';
import businesscards from '../../../assets/images/icons/businesscards.png';
import productImage from '../../../assets/images/icons/productRelease.jpg';
import influencemarketing from '../../../assets/images/icons/influencermarketing.png';
import webtraffic from '../../../assets/images/icons/webtraffic.png';

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const services = [
        { text: 'Logo Design', source: logoDesign },
        { text: 'AI Artists', source: aiArtists },
        { text: 'Logo Animation', source: logoAnimation },
        { text: 'Business Cards & Stationary', source: businesscards },
        { text: 'Influencer Marketing', source: influencemarketing },
        { text: 'Web Traffic', source: webtraffic }
    ];

    const handleServicePress = (service) => {
        // Handle navigation or action on service press
        console.log(`Service pressed: ${service.text}`);
    };

    const handleProductReleasePress = () => {
        // Handle navigation or action on product release press
        console.log('Product Release pressed');
    };

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity style={styles.serviceListItem} onPress={() => handleServicePress(item)}>
            <Image source={item.source} style={styles.serviceListImage} />
            <Text style={styles.serviceListText}>{item.text}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        // Simulate a loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // 0.5 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/images/logos/Logo.png')} style={styles.logo} />
                <Icon name="diamond" size={20} color="#ffffff" style={styles.headerIcon} />
                <View style={styles.searchBar}>
                    <Icon name="search" size={20} color="#797b84" style={styles.searchIcon} />
                    <TextInput style={styles.searchInput} placeholder="Search services" placeholderTextColor="#797b84" />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular services</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal style={styles.popularServices} showsHorizontalScrollIndicator={false}>
                    {services.map((service, index) => (
                        <TouchableOpacity key={index} style={styles.serviceCard} onPress={() => handleServicePress(service)}>
                            <Image source={service.source} style={styles.serviceImage} />
                            <View style={styles.serviceTextBox}>
                                <Text style={styles.serviceText}>{service.text}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.productRelease} onPress={handleProductReleasePress}>
                    <ImageBackground source={productImage} style={styles.productImage} imageStyle={styles.productImageStyle}>
                        <View style={styles.productReleaseTagBox}>
                            <Text style={styles.productReleaseTag}>PRODUCT RELEASE</Text>
                        </View>
                        <Text style={styles.productReleaseText}>Explore all-new features to turn your ambition into action.</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal for displaying all services */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>All Services</Text>
                        <FlatList
                            data={services}
                            renderItem={renderServiceItem}
                            keyExtractor={(item) => item.text}
                        />
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCloseText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121214',
        paddingTop: Platform.OS === 'ios' ? 46 : 10,
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1000,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(41, 41, 41, 0.95)',
        paddingTop: Platform.OS === 'ios' ? 69 : 20,
        paddingBottom: Platform.OS === 'ios' ? 45 : 70,
    },
    headerIcon: {
        position: 'absolute',
        right: 15,
        paddingTop: Platform.OS === 'ios' ? 23 : 0,
        paddingBottom: Platform.OS === 'ios' ? 0 : 50,
    },
    logo: {
        width: 110,
        height: 40,
        resizeMode: 'contain',
    },
    searchBar: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 38 : 80,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#1b1c1c',
        height: Platform.OS === 'ios' ? 37 : 45,
        padding: Platform.OS === 'ios' ? 10 : 5,
        margin: 15,
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 1000,
        marginTop: Platform.OS === 'ios' ? 70 : -10,
        justifyContent: 'center',
    },
    searchIcon: {
        position: 'absolute',
        color: '#797b84',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: Platform.OS === 'ios' ? 140 : 120,
    },
    searchInput: {
        marginLeft: 10,
        color: '#ffffff',
        flex: 1,
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    scrollContainer: {
        paddingTop: 120,
        margin: 5,
        paddingBottom: 30,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
        padding: 0,
    },
    sectionTitle: {
        fontSize: Platform.OS === 'ios' ? 24 : 17,
        color: '#ffffff',
        fontWeight: 'bold',
        paddingHorizontal: 7,
        marginBottom: 15,
        fontFamily: 'Montserrat-Bold',
    },
    seeAll: {
        color: '#28b96d',
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    popularServices: {
        paddingHorizontal: 7,
    },
    serviceCard: {
        marginRight: 10,
        width: 140,
        height: 170,
        borderRadius: 10,
        backgroundColor: '#222224',
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceTextBox: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#222224',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'flex-start',
    },
    serviceImage: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        resizeMode: 'cover',
    },
    serviceText: {
        color: 'white',
        textAlign: 'left',
        fontSize: Platform.OS === 'ios' ? 16 : 12,
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    productRelease: {
        height: 310,
        top: 25,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        paddingHorizontal: 7,
    },
    productImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    productImageStyle: {
        borderRadius: 10,
    },
    productReleaseTagBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
        alignSelf: 'flex-start',
        margin: 10,
        position: 'absolute',
        top: 5,
    },
    productReleaseTag: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
        fontSize: Platform.OS === 'ios' ? 12 : 10,
        letterSpacing: -1,
    },
    productReleaseText: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 30 : 23,
        fontFamily: 'Raleway-Regular',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: 10,
        textAlign: 'left',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '80%',
        borderColor: '#4a4a4a',
        borderWidth: 0.4,
        backgroundColor: '#121214',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 15,
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    modalCloseButton: {
        marginTop: 15,
        backgroundColor: '#28b96d',
        padding: 10,
        borderRadius: 5,
        width: '50%',
    },
    modalCloseText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    serviceListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    serviceListImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 15,
    },
    serviceListText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Raleway-Regular',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121214',
    },
});

export default HomeScreen;
