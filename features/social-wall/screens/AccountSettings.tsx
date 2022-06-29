import React from 'react';
import { View, StyleSheet, Text, Image, Pressable, Platform } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch } from '../../../app/hooks';
import BackArrow from '../../../components/BackArrow';
import { resetState } from '../../auth/slices/authSlice';
import { resetUser } from '../../../slices/userSlice';
import { RootStackParamList } from '../../../app/AppNavigator';

type loginHomeScreenProp = StackNavigationProp<RootStackParamList, 'LoginHome'>;

export const AccountSettingsOptions = {
    headerLeft: () => <BackArrow btnColor='#34d5eb' />,
    title: 'Account settings',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#ffffff',
    },
    headerTitleStyle: {
        fontSize: 14,
        marginLeft: Platform.OS === 'ios' ? -150 : -16,
        fontFamily: 'mulish-semibold'
    }
};

const AccountSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<loginHomeScreenProp>();
    const handleLogout = () => {
        dispatch(resetState());
        dispatch(resetUser());
        navigation.navigate('LoginHome');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titlePrimary}>Switch account</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <Image source={require('../../../assets/icons/logout.png')} style={{ width: 24, height: 24, marginRight: 16 }} />
                <Pressable onPress={() => handleLogout()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16
    },

    titlePrimary: {
        color: '#000000',
        opacity: 0.5,
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        marginTop: 8,
    },

    logoutText: {
        color: '#ee5779',
        fontSize: 14,
        fontFamily: 'mulish-semibold'
    }
});

export default AccountSettings;