import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import PinScreen from '../screens/PinScreen';
import BackArrow from '../../../components/BackArrow';
import VerificationPinScreen from '../screens/VerificationPinScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';

export type AuthStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
    CreateAccount: undefined;
    Pin: undefined;
    VerificationPin: undefined;
    NewPassword: undefined;
};

const Stack = createStackNavigator();

export const authOptions = {
    headerLeft: () => <BackArrow />,
    title: '',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
    }
};

const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} />
            <Stack.Screen name='Pin' component={PinScreen} />
            <Stack.Screen name='VerificationPin' component={VerificationPinScreen} />
            <Stack.Screen name='NewPassword' component={NewPasswordScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;