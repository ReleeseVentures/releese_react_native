import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, BackHandler } from 'react-native';
import Home from '../screens/Home';
import ProfilePreview from '../screens/ProfilePreview';

export type HomeStackParamList = {
    SocialWall: undefined;
    ProfilePreview: undefined;
};

const Stack = createStackNavigator();

export const screenOptions = {
    title: '',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: 0,
    },
    headerLeft: () => <View></View>
};

const HomeNavigator: React.FC = () => {

    const backHandler = () => {
        BackHandler.exitApp();
        return true;
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SocialWall' component={Home} listeners={() => ({
                focus: () => {
                    BackHandler.addEventListener('hardwareBackPress', backHandler);
                },
                blur: () => {
                    BackHandler.removeEventListener('hardwareBackPress', backHandler);
                }
            })} />
            <Stack.Screen name='ProfilePreview' component={ProfilePreview} />
        </Stack.Navigator>
    );
};

export default HomeNavigator;