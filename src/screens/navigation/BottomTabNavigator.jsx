import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Icon7 from 'react-native-vector-icons/Octicons';
import HomeScreen from '../landing/HomeScreen';
import PlaceholderScreen from '../../extras/PlaceholderScreen';
import ProfileScreen from '../landing/ProfileScreen';
import InboxScreen from '../landing/InboxScreen';
import OrdersScreen from '../landing/OrdersScreen';
import SearchScreen from '../landing/SearchScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              return <Icon2 name={iconName} size={28} color={color} />;
            case 'Messages':
              iconName = 'envelope-o';
              return <Icon3 name={iconName} size={25} color={color} />;
            case 'Search':
              iconName = 'search1';
              return <Icon4 name={iconName} size={25} color={color} />;
            case 'Orders':
              iconName = 'clipboard-text-outline';
              return <Icon5 name={iconName} size={25} color={color} />;
            case 'Profile':
              iconName = 'account-circle-outline';
              return <Icon5 name={iconName} size={30} color={color} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: '#28b96d',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#222324',
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarLabelStyle: { display: 'none' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={InboxScreen}
        options={{
          headerShown: true,
          headerTitle: 'Inbox',
          headerStyle: {
            backgroundColor: '#1c1c1c',
            shadowColor: 'transparent', // Remove shadow
              elevation: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 22 : 16,
          },
          headerTitleAlign: 'center', // Center-align title
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 15 }}>
              <Icon6 name="sliders" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerShown: true,
          headerTitle: 'Manage orders',
          headerStyle: {
            backgroundColor: '#1c1c1c',
            shadowColor: 'transparent', // Remove shadow
              elevation: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 22 : 16,
          },
          headerTitleAlign: 'center', // Center-align title
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 15 }}>
              <Icon7 name="bell" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 15 }}>
              <Icon5 name="filter-variant" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
