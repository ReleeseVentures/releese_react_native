import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootStackParamList } from '../../../app/AppNavigator';
import FormInput from '../../../app/components/FormInput';
import CustomButton from '../../../app/components/CustomButton'
import { register, setRegisterData, login, resetRegisterState, resetErrMSg } from '../slices/authSlice';
import { resetSelectedAvatar } from '../../../slices/avatarsSlice';
import { getAllCategories, resetState } from '../../../slices/categorySlice';

type createAccountScreenProp = StackNavigationProp<RootStackParamList, 'Onboarding'>
type privacyPolicyScreenProp = StackNavigationProp<RootStackParamList, 'PrivacyPolicy'>
type termsOfUseScreenProp = StackNavigationProp<RootStackParamList, 'TermsOfUse'>


const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password should be 8 characters long').required('Required'),
    repeatPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const LoginScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<createAccountScreenProp>();
    const navigationPrivacyPolicy = useNavigation<privacyPolicyScreenProp>();
    const navigationTermsOfUse = useNavigation<termsOfUseScreenProp>();
    const [showPassowrd, setShowPassword] = useState(true);
    const [showRepeatPassword, setShowRepeatPassword] = useState(true);
    const error = useAppSelector(state => state.auth.error);
    const token = useAppSelector(state => state.auth.token);
    const status = useAppSelector(state => state.auth.status);

    const pressHandler = () => {
        navigation.navigate('Auth', { screen: 'ForgotPassword' })
    };

    const privacyPolicyHandler = () => {
        navigationPrivacyPolicy.navigate('PrivacyPolicy')
    }

    const termsOfUseHandler = () => {
        navigationTermsOfUse.navigate('TermsOfUse')
    }

    const { handleChange, handleSubmit, handleBlur, resetForm, setFieldValue, values, errors, touched } = useFormik({
        validationSchema: ValidationSchema,
        initialValues: { email: '', password: '', repeatPassword: '' },
        onSubmit: values => {
            const dataToSend = {
                email: values.email,
                password: values.password,
                confirmPassword: values.repeatPassword
            };
            dispatch(resetState());
            dispatch(setRegisterData({ email: values.email, password: values.password }));
            dispatch(register(dataToSend));
        }
    });

    const passRef = useRef<any>(null);
    const repeatPassRef = useRef<any>(null);

    const showPasswordHandler = () => {
        setShowPassword(!showPassowrd);
    };

    const showRepeatPasswordHandler = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const handleEmailChange = (e: string) => {
        setFieldValue('email', e.trim());
        if (error) {
            dispatch(resetErrMSg());
        };
    };

    useEffect(() => {
        dispatch(resetSelectedAvatar());
    }, []);

    useEffect(() => {
        if (status === 'register-success') {
            dispatch(login({ email: values.email, password: values.password }));
        };
    }, [status]);

    useEffect(() => {
        if (token) {
            navigation.navigate('Onboarding');
            dispatch(resetRegisterState());
            dispatch(getAllCategories());
            resetForm({});
        }
    }, [token])

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={{ fontSize: 24, marginTop: 8, marginBottom: 8, fontFamily: 'mulish-semibold' }}>Create your new account.</Text>
            <Text style={{ fontSize: 14, marginBottom: 32, fontFamily: 'mulish-regular' }}>Put your info in and let's go!</Text>
            <FormInput
                value={values.email}
                name='email'
                icon=''
                placeholder='Email'
                keyboardType='email-address'
                returnKeyType='next'
                error={errors.email}
                touched={touched.email}
                onChangeText={(e: string) => handleEmailChange(e)}
                onSubmitEditing={() => passRef.current?.focus()}
                onBlur={handleBlur('email')}
                errorMsg={error}
                isEye={false}
            />
            <FormInput
                value={values.password}
                name='password'
                ref={passRef}
                icon='eye'
                error={errors.password}
                touched={touched.password}
                placeholder='Password'
                returnKeyType='next'
                onChangeText={handleChange('password')}
                onSubmitEditing={() => repeatPassRef.current?.focus()}
                onBlur={handleBlur('password')}
                secureTextEntry={showPassowrd}
                onPress={showPasswordHandler}
                autoCorrect={false}
                isEye={true}
            />
            <FormInput
                value={values.repeatPassword}
                name='repeatPassword'
                ref={repeatPassRef}
                icon='eye'
                error={errors.repeatPassword}
                touched={touched.repeatPassword}
                placeholder='Repeat password'
                returnKeyType='go'
                onChangeText={handleChange('repeatPassword')}
                onSubmitEditing={() => handleSubmit()}
                onBlur={handleBlur('repeatPassword')}
                secureTextEntry={showRepeatPassword}
                onPress={showRepeatPasswordHandler}
                autoCorrect={false}
                isEye={true}
            />
            <View style={styles.termsWrapper}>
                <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'mulish-regular' }}>By continuing, you agree to Releese's <Text onPress={termsOfUseHandler} style={{ fontSize: 12, color: '#34d5eb', fontFamily: 'mulish-regular' }}>Terms And Conditions</Text> and <Text onPress={privacyPolicyHandler} style={{ fontSize: 12, color: '#34d5eb', fontFamily: 'mulish-regular' }}>Privacy Policy</Text>.</Text>
            </View>

            <View style={styles.btnWrapper}>
                <CustomButton pressHandler={handleSubmit} txtStyle={styles.btnPrimary} label='Create account' />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },

    termsWrapper: {
        marginTop: 16,
        width: 300,
        flex: 1,
        alignSelf: 'center',
    },

    btnWrapper: {
        padding: 14,
        marginBottom: 26,
        backgroundColor: '#4ec5dd',
        width: '100%',
        borderRadius: 8
    },

    btnPrimary: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    }
});

export default LoginScreen;


