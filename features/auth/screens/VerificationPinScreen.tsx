import React, { useEffect, useState, useRef } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootStackParamList } from '../../../app/AppNavigator';
import CustomButton from '../../../app/components/CustomButton'
import { setResetPassCode, resendResetRequest } from '../slices/authSlice';

type newPasswordScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const VerificationPinScreen = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<newPasswordScreenProp>();
    const resetMail = useAppSelector(state => state.auth.resetMail);

    const { handleChange, handleSubmit, resetForm, values, errors, touched } = useFormik({
        initialValues: { code: '' },
        onSubmit: values => {
            dispatch(setResetPassCode(values.code));
            navigation.navigate('Auth', { screen: 'NewPassword' });
        }
    });

    const handleResendCode = () => {
        dispatch(resendResetRequest(resetMail));
    };

    const codeRef = useRef<any>(null);

    useEffect(() => {
        setTimeout(() => {
            codeRef.current?.focus();
        }, 10)
    }, [codeRef]);

    const { code } = values;

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.titlePrimary}>Verification</Text>
            <Text style={styles.titleSecondary}>Please enter verification code we just sent you on your email adress.</Text>
            <View style={styles.pinWrapper}>
                <View>
                    <Text style={styles.pinText}>Code</Text>
                    <SmoothPinCodeInput
                        name='code'
                        ref={codeRef}
                        cellSize={60}
                        codeLength={4}
                        cellSpacing={16}
                        cellStyle={{ borderColor: '#34d5eb', borderWidth: 1, borderRadius: 8 }}
                        maskDelay={0}
                        password={true}
                        restrictToNumbers={false}
                        value={code}
                        onTextChange={handleChange('code')}
                        keyboardType='default'
                        returnKeyType='go'
                    />
                </View>
            </View>
            <View style={styles.btnWrapper}>
                <CustomButton btnStyle={styles.btnPrimary} pressHandler={handleSubmit} txtStyle={styles.btnPrimaryTxt} label='Confirm' />
                <CustomButton btnStyle={styles.btnSecondary} pressHandler={() => handleResendCode()} txtStyle={styles.btnSecondaryTxt} label='Resend code' />
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
        fontSize: 28,
        marginTop: 5,
        marginBottom: 8,
        fontFamily: 'mulish-semibold'
    },

    titleSecondary: {
        fontSize: 14,
        marginBottom: 32,
        fontFamily: 'mulish-regular',
        opacity: 0.5
    },

    pinWrapper: {
        alignItems: 'center',
        flex: 1
    },

    pinText: {
        marginBottom: 12,
        color: '#013A57',
        opacity: 0.7,
        fontSize: 14,
        fontFamily: 'mulish-semibold'
    },

    btnWrapper: {
        marginTop: Platform.OS === 'ios' ? 0 : 100,
        marginBottom: 53,
        width: '100%',
        borderRadius: 8
    },

    btnPrimary: {
        backgroundColor: '#34d5eb',
        borderRadius: 8,
        marginBottom: 30,
        padding: 14
    },

    btnPrimaryTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    },

    btnSecondaryTxt: {
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    },

    btnSecondary: {
        backgroundColor: 'white'
    }
});

export default VerificationPinScreen;