import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootStackParamList } from '../../../app/AppNavigator';
import FormInput from '../../../app/components/FormInput';
import CustomButton from '../../../app/components/CustomButton'
import { login, resetErrMSg } from '../slices/authSlice';
import SplashScreen from '../../../app/screens/SplashScreen';
import { getUser } from '../../../slices/userSlice';
import { getAllPosts } from '../../../slices/postsSlice';
import { getAllCategories, getUserCategories } from '../../../slices/categorySlice';

type forgotPasswordScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>
type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password should be 8 characters long').required('Required')
});


const LoginScreen = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation<forgotPasswordScreenProp>();
    const homeNavigation = useNavigation<homeScreenProp>();
    const passRef = useRef<any>(null);
    const token = useAppSelector(state => state.auth.token);
    const status = useAppSelector(state => state.auth.status);
    const error = useAppSelector(state => state.auth.error);
    const userId = useAppSelector(state => state.auth.user?.id);
    const user = useAppSelector(state => state.user.user);

    const pressHandler = () => {
        navigation.navigate('Auth', { screen: 'ForgotPassword' })
    };

    const { handleChange, handleSubmit, handleBlur, setFieldValue, values, errors, touched } = useFormik({
        validationSchema: LoginSchema,
        initialValues: { email: '', password: '' },
        onSubmit: values => {
            dispatch(login(values));
        }
    });

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e: string, field: string) => {
        setFieldValue(field, e);
        if (error) {
            dispatch(resetErrMSg());
        };
    };

    useEffect(() => {
        if (token && status !== 'error' && userId) {
            dispatch(getUser(userId));
            dispatch(getAllCategories());
        };
    }, [token]);

    useEffect(() => {
        if (user) {
            dispatch(getAllPosts());
            dispatch(getUserCategories());
            homeNavigation.navigate('Home', { screen: 'SocialWall' });
        };
    }, [user]);

    return (
        <KeyboardAvoidingView style={styles.wrapper}>
            {status === 'loading' ?
                <SplashScreen />
                :
                <View style={styles.container}>
                    <Text style={styles.titlePrimary}>Welcome back!</Text>
                    <Text style={styles.titleSecondary}>Sing in to your Releese account</Text>
                    <FormInput
                        icon=''
                        placeholder='Email'
                        keyboardType='email-address'
                        returnKeyType='next'
                        error={errors.email}
                        touched={touched.email}
                        onChangeText={(e: string) => handleInputChange(e, 'email')}
                        onSubmitEditing={() => passRef.current?.focus()}
                        onBlur={handleBlur('email')}
                        errorMsg={error && error.field === 'email' && error.message}
                        isEye={false}
                    />
                    <FormInput
                        ref={passRef}
                        icon='eye'
                        error={errors.password}
                        toucher={touched.password}
                        placeholder='Password'
                        returnKeyType='go'
                        onChangeText={(e: string) => handleInputChange(e, 'password')}
                        onSubmitEditing={() => handleSubmit()}
                        onBlur={handleBlur('password')}
                        secureTextEntry={showPassword}
                        onPress={showPasswordHandler}
                        autoCorrect={false}
                        errorMsg={error && error.field === 'password' && error.message}
                        isEye={true}
                    />
                    <View style={styles.btnForgotWrapper}>
                        <CustomButton pressHandler={pressHandler} txtStyle={styles.btnForgotPw} label='Forgot Password?' />
                    </View>

                    <View style={styles.btnPrimaryWrapper}>
                        <CustomButton pressHandler={handleSubmit} txtStyle={styles.btnPrimary} label='Sign in' />
                    </View>
                </View >
            }
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({

    wrapper: {
        flex: 1,
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 19,
    },

    titlePrimary: {
        color: '#000000',
        fontSize: 28,
        marginBottom: 8,
        fontFamily: 'mulish-semibold'
    },

    titleSecondary: {
        color: '#000000',
        opacity: 0.8,
        fontSize: 14,
        marginBottom: 32,
        fontFamily: 'mulish-regular',
    },

    btnForgotWrapper: {
        flex: 1
    },

    btnPrimaryWrapper: {
        padding: 14,
        marginBottom: 26,
        backgroundColor: '#4ec5dd',
        width: '100%',
        borderRadius: 8
    },

    btnForgotPw: {
        fontSize: 14,
        color: '#4ec5dd',
        textAlign: 'right',
        fontFamily: 'mulish-regular'
    },

    btnPrimary: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    }
});

export default LoginScreen;


