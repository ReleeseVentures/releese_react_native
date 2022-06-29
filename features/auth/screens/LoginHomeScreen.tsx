import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch } from '../../../app/hooks';
import { RootStackParamList } from '../../../app/AppNavigator'
import CustomButton from '../../../app/components/CustomButton'
import BackArrow from '../../../components/BackArrow';
import { resetStatus } from '..//../../slices/userSlice';
import { resetPosts } from '../../../slices/postsSlice';

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;

export const screenOptions = {
    headerLeft: () => <BackArrow btnColor='white' />,
    title: '',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#34d5eb'
    }
};

const LoginHomeScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<loginScreenProp>();

    const pressHandler = () => {
        navigation.navigate('Auth', { screen: 'CreateAccount' });
    };

    const signInHandler = () => {
        navigation.navigate('Auth', { screen: 'Login' });
    };

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(resetPosts());
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style={'auto'} />
            <View style={styles.imgContainer}>
                <Image style={{ width: 190, resizeMode: 'contain' }} source={require('../../../assets/Logo.png')} />
            </View>
            <View style={styles.btnContainer}>
                <CustomButton btnStyle={styles.btnSignIn} pressHandler={signInHandler} txtStyle={styles.btnSignInTxt} label='Sign in' />
                <CustomButton btnStyle={styles.btnCreateAccount} pressHandler={pressHandler} txtStyle={styles.btnCreateAccountTxt} label='Create account' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34d5eb',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 19
    },

    imgContainer: {
        top: 0,
        position: 'absolute'
    },

    btnContainer: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 40,
        width: '100%',
        padding: 18
    },

    btnSignIn: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 14,
        width: '100%',
        marginBottom: 30,
    },

    btnSignInTxt: {
        color: '#34d5eb',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    },

    btnCreateAccountTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    },

    btnCreateAccount: {
        backgroundColor: '#34d5eb',
    }
});

export default LoginHomeScreen;

