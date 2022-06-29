import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import LoginHomeScreen, { screenOptions as loginHomeScreenOptions } from '../features/auth/screens/LoginHomeScreen';
import AuthNavigator, { AuthStackParamList, authOptions } from '../features/auth/navigation/AuthNavigator';
import FirstBoardingScreen from '../features/onboarding/screens/FirstBoardingScreen';
import OnboardingScreen from '../features/onboarding/screens/OnboardingScreen';
import HomeNavigator, { screenOptions as HomeScreenOptions } from '../features/social-wall/navigation/HomeNavigator';
import PrivacyPolicy, { PrivacyPolicyOptions } from '../features/privacy-policy/screens/PrivacyPolicy';
import TermsOfUse, { TermsOfUseOptions } from '../features/privacy-policy/screens/TermsOfUse';
import Tags, { TagsOptions } from '../features/social-wall/screens/Tags';
import CreatePost from '../features/social-wall/screens/CreatePost';
import AccountSettings, { AccountSettingsOptions } from '../features/social-wall/screens/AccountSettings';
import { HomeStackParamList } from '../features/social-wall/navigation/HomeNavigator';

export type RootStackParamList = {
    Onboarding: undefined;
    LoginHome: undefined;
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Home: NavigatorScreenParams<HomeStackParamList>;
    PrivacyPolicy: undefined;
    TermsOfUse: undefined;
    ProfilePreview: undefined;
    Tags: undefined;
    CreatePost: undefined;
    AccountSettings: undefined;
};

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerMode: 'screen' }}>
                <Stack.Screen name='FirstBoarding' component={FirstBoardingScreen} options={{ headerShown: false }} />
                <Stack.Screen name='LoginHome' component={LoginHomeScreen} options={loginHomeScreenOptions} />
                <Stack.Screen name='Auth' component={AuthNavigator} options={authOptions} />
                <Stack.Screen name='Onboarding' component={OnboardingScreen} />
                <Stack.Screen name='Home' component={HomeNavigator} options={HomeScreenOptions} />
                <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={PrivacyPolicyOptions} />
                <Stack.Screen name='TermsOfUse' component={TermsOfUse} options={TermsOfUseOptions} />
                <Stack.Screen name='Tags' component={Tags} options={TagsOptions} />
                <Stack.Screen name='CreatePost' component={CreatePost} />
                <Stack.Screen name='AccountSettings' component={AccountSettings} options={AccountSettingsOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;