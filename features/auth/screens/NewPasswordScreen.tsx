import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FormInput from '../../../app/components/FormInput';
import CustomButton from '../../../app/components/CustomButton';
import { resetPassword } from '../slices/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../app/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type newPasswordScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const ValidationSchema = Yup.object().shape({
    password: Yup.string().min(2, 'Password is too short!').required('Required'),
    repeatPassword: Yup.string().min(2, 'Password is too short!').required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const NewPasswordScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<newPasswordScreenProp>();
    const [showPassword, setShowPassword] = useState(true);
    const [showRepeatPassword, setShowRepeatPassword] = useState(true);
    const repeatPassRef = useRef<any>(null);
    const code = useAppSelector(state => state.auth.resetPassCode);
    const status = useAppSelector(state => state.auth.status);

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: ValidationSchema,
        initialValues: { password: '', repeatPassword: '' },
        onSubmit: values => {
            const dataToSend = {
                code: code,
                newPassword: values.password
            };
            dispatch(resetPassword(dataToSend));
        }
    });

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };

    const showRepeatPasswordHandler = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    useEffect(() => {
        if (status === 'reset-pass-success') {
            navigation.navigate('Auth', { screen: 'Login' });
        };
    }, [status]);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.titlePrimary}>Choose your new password</Text>
            <Text style={styles.titleSecondary}>Make your new password easy to remember.</Text>
            <FormInput
                name='password'
                icon='eye'
                error={errors.password}
                touched={touched.password}
                placeholder='Password'
                returnKeyType='next'
                onChangeText={handleChange('password')}
                onSubmitEditing={() => repeatPassRef.current?.focus()}
                onBlur={handleBlur('password')}
                secureTextEntry={showPassword}
                onPress={showPasswordHandler}
                autoCorrect={false}
                isEye={true}
            />
            <FormInput
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
            <View style={{ flex: 1 }}></View>
            <View style={styles.btnWrapper}>
                <CustomButton btnStyle={styles.btnPrimary} pressHandler={handleSubmit} txtStyle={styles.btnPrimaryTxt} label='Confirm' />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16
    },

    titlePrimary: {
        fontSize: 24,
        marginBottom: 8,
        fontFamily: 'mulish-semibold'
    },

    titleSecondary: {
        fontSize: 14,
        marginBottom: 32,
        fontFamily: 'mulish-regular'
    },

    btnWrapper: {
        marginBottom: 40,
        width: '100%',
        borderRadius: 8
    },

    btnPrimary: {
        backgroundColor: '#34d5eb',
        borderRadius: 8,
        padding: 14
    },

    btnPrimaryTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    },
});

export default NewPasswordScreen;