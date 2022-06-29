import React, { useEffect, useRef } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../app/AppNavigator'
import CustomButton from '../../../app/components/CustomButton';

type onboardingScreenProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const ValidationSchema = Yup.object().shape({
    code: Yup.string().required(),
    confirmCode: Yup.string().required().oneOf([Yup.ref('code'), null])
});

const PinScreen = () => {
    const navigation = useNavigation<onboardingScreenProp>();
    const handlePinConfirm = (pin: any) => {
    };

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: ValidationSchema,
        initialValues: { code: '', confirmCode: '' },
        onSubmit: values => {
            navigation.navigate('Onboarding');
        }
    });

    const codeRef = useRef<any>(null);
    const confirmCodeRef = useRef<any>(null);
    const { code, confirmCode } = values;

    if (confirmCode && confirmCode.length === 4 && errors.confirmCode && code !== confirmCode) {
        confirmCodeRef.current?.inputRef.current.clear();
        values.confirmCode = '';
    };

    useEffect(() => {
        setTimeout(() => {
            codeRef.current?.focus();
        }, 10)
    }, [codeRef]);

    useEffect(() => {
        if (code.length === 4) {
            setTimeout(() => {
                confirmCodeRef.current?.focus();
            }, 10)
        }
    }, [confirmCodeRef, code]);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={{ fontSize: 30 }}>Pick a pin.</Text>
            <Text style={{ fontSize: 15 }}>Make your info safe! You can always change it later or use other methods of security.</Text>
            <View>
                <Text style={{ fontSize: 30 }}>Pin code</Text>
                <SmoothPinCodeInput
                    ref={codeRef}
                    name='code'
                    value={code}
                    keyboardType='numeric'
                    returnKeyType='next'
                    error={errors.code}
                    touched={touched.code}
                    cellSize={60}
                    codeLength={4}
                    cellStyle={{ borderColor: '#34d5eb', borderWidth: 1 }}
                    cellSpacing={10}
                    maskDelay={0}
                    password={true}
                    restrictToNumbers={true}
                    onTextChange={handleChange('code')}
                    onSubmitEditing={() => confirmCodeRef.current?.focus()}
                />
                <Text style={{ fontSize: 30 }}>Confirm pin code</Text>
                <SmoothPinCodeInput
                    name='confirmCode'
                    value={confirmCode}
                    ref={confirmCodeRef}
                    keyboardType='numeric'
                    returnKeyType='go'
                    error={errors.confirmCode}
                    touched={touched.confirmCode}
                    cellSize={60}
                    cellStyle={errors.confirmCode ? { borderColor: 'red', borderWidth: 1 } : { borderColor: '#34d5eb', borderWidth: 1 }}
                    codeLength={4}
                    cellSpacing={10}
                    maskDelay={0}
                    password={true}
                    restrictToNumbers={true}
                    onTextChange={handleChange('confirmCode')}
                    onSubmitEditing={() => handleSubmit()}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 0, paddingBottom: 30 }}>
                <CustomButton btnStyle={{ backgroundColor: '#34d5eb', borderRadius: 10, height: 50, width: 350, paddingBottom: 10 }} pressHandler={handleSubmit} txtStyle={{ color: 'white', textAlign: 'center', fontSize: 20, padding: 5 }} label='Confirm' />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default PinScreen;