import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Icon7 from 'react-native-vector-icons/Octicons';
import StartupScreen from '../startup/StartupScreen';
import SignupScreen from '../startup/SignupScreen';
import SigninScreen from '../startup/SigninScreen';
import ForgotPasswordScreen from '../security/ForgotPasswordScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../startup/SplashScreen';
import ProfileScreen from '../landing/ProfileScreen';
import InboxScreen from '../landing/InboxScreen';
import SearchScreen from '../landing/SearchScreen';
import AccountScreen from '../settings/account/AccountScreen';
import CommunityScreen from '../resources/CommunityScreen';
import PreferencesScreen from '../settings/preferences/PreferencesScreen';
import InterestSelectionScreen from '../interest/InterestSelectionScreen';
import BalanceScreen from '../settings/account/BalanceScreen';
import DeactivationScreen from '../settings/account/DeactivationScreen';
import ConfirmDelectionScreen from '../settings/account/ConfirmDelectionScreen';
import EmailSignup from '../startup/EmailSignup';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
            ...TransitionPresets.FadeFromBottomAndroid
          }}
        />
        <Stack.Screen
          name="Startup"
          component={StartupScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
            ...TransitionPresets.FadeFromBottomAndroid
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
         <Stack.Screen
          name="EmailSignup"
          component={EmailSignup}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={SigninScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ForgotPswd"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={BottomTabNavigator}
          options={{
            headerShown: false,

            headerTitle: '',
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,

            headerTitle: '',
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="InboxScreen"
          component={InboxScreen}
          options={{
            headerShown: false,

            headerTitle: '',
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,

            headerTitle: '',
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Account',
            headerStyle: {
              backgroundColor: '#222324',
              shadowColor: 'transparent', // Remove shadow
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: Platform.OS === 'ios' ? 22 : 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CommunityScreen"
          component={CommunityScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Community and legal',
            headerStyle: {
              backgroundColor: '#222324',
              shadowColor: 'transparent', // Remove shadow
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: Platform.OS === 'ios' ? 22 : 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="PreferencesScreen"
          component={PreferencesScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Preferences',
            headerStyle: {
              backgroundColor: '#222324',
              shadowColor: 'transparent', // Remove shadow
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: Platform.OS === 'ios' ? 22 : 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="InterestSelectionScreen"
          component={InterestSelectionScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#222324',
              shadowColor: 'transparent', // Remove shadow
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: Platform.OS === 'ios' ? 22 : 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="BalanceScreen"
          component={BalanceScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Personal Balance',
            headerStyle: {
              backgroundColor: '#222324',
              shadowColor: 'transparent', // Remove shadow
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: Platform.OS === 'ios' ? 22 : 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ paddingRight: 15 }}

              >
                <Icon2 name="help-circle" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="DeactivationScreen"
          component={DeactivationScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Deactivation and deletion',
            headerStyle: {
              backgroundColor: '#222324',
              shadowColor: 'transparent', // Remove shadow
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: Platform.OS === 'ios' ? 22 : 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),

          })}
        />
        <Stack.Screen
          name="ConfirmDelectionScreen"
          component={ConfirmDelectionScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Delete account',
            headerStyle: {
              backgroundColor: '#222324',
              shadowColor: 'transparent', // Remove shadow
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: Platform.OS === 'ios' ? 22 : 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),

          })}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default AppNavigator;
