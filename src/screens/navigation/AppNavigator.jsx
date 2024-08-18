import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../startup/StartupScreen';
import SignupScreen from '../startup/SignupScreen';
import SigninScreen from '../startup/SigninScreen';
import ForgotPasswordScreen from '../security/ForgotPasswordScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../startup/SplashScreen';
import ProfileScreen from '../landing/ProfileScreen';
import InboxScreen from '../landing/InboxScreen'; 
import SearchScreen from '../landing/SearchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
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
            //header: () => <HomeHeader />, // Use the custom header for the Home screen
            headerTitle: '', // Hide the screen name
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
         <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
            //header: () => <HomeHeader />, // Use the custom header for the Home screen
            headerTitle: '', // Hide the screen name
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="InboxScreen"
          component={InboxScreen}
          options={{
            headerShown: false,
            //header: () => <HomeHeader />, // Use the custom header for the Home screen
            headerTitle: '', // Hide the screen name
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
            //header: () => <HomeHeader />, // Use the custom header for the Home screen
            headerTitle: '', // Hide the screen name
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
