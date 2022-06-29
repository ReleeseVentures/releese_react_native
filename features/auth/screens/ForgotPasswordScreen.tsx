import React, { useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FormInput from '../../../app/components/FormInput';
import { RootStackParamList } from '../../../app/AppNavigator'
import CustomButton from '../../../app/components/CustomButton'
import { requestResetPassword, resetErrMSg, setResetMail } from '../slices/authSlice';

type verificationPinScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
});

const ForgotPasswordScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<verificationPinScreenProp>();
    const error = useAppSelector(state => state.auth.error);
    const status = useAppSelector(state => state.auth.status);

    const { handleChange, handleSubmit, handleBlur, setFieldValue, values, errors, touched } = useFormik({
        validationSchema: ValidationSchema,
        initialValues: { email: '' },
        onSubmit: values => {
            dispatch(setResetMail(values.email));
            dispatch(requestResetPassword(values.email));
        }
    });

    const handleInputChange = (e: string) => {
        setFieldValue('email', e);
        if (error) {
            dispatch(resetErrMSg());
        };
    };

    useEffect(() => {
        if (status === 'request-reset-success') {
            navigation.navigate('Auth', { screen: 'VerificationPin' })
        }
    }, [status])

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.titlePrimary}>Can't remember?</Text>
            <Text style={styles.titleSecondary}>No worries let's get you a new one!</Text>
            <FormInput
                icon=''
                placeholder='Email'
                keyboardType='email-address'
                returnKeyType='go'
                error={errors.email}
                touched={touched.email}
                onChangeText={(e: string) => handleInputChange(e)}
                onBlur={handleBlur('email')}
                onSubmitEditing={handleSubmit}
                errorMsg={error}
            />
            <View style={{ flex: 1 }}></View>
            <View style={styles.btnContainer}>
                <CustomButton btnStyle={styles.btnPrimary} pressHandler={handleSubmit} txtStyle={styles.btnText} label='I want new password' />
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

    titlePrimary: {
        fontSize: 28,
        marginTop: 8,
        marginBottom: 8,
        fontFamily: 'mulish-semibold'
    },

    titleSecondary: {
        fontSize: 14,
        marginBottom: 32,
        fontFamily: 'mulish-regular',
        opacity: 0.5
    },

    btnContainer: {
        marginBottom: 40
    },

    btnPrimary: {
        backgroundColor: '#34d5eb',
        borderRadius: 10,
        padding: 14,
    },

    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    }
});

export default ForgotPasswordScreen;


