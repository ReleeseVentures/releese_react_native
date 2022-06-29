import React, { forwardRef, useState } from 'react';
import { TextInput, View, StyleSheet, Text, Pressable, Image, Platform } from 'react-native';

const FormInput = forwardRef((props: any, ref) => {

    const { icon, error, onPress, errorMsg, isEye, ...otherProps } = props;
    const validationColor = error ? '#ee5779' : 'black';
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <View>
            <View style={[styles.form, { borderColor: validationColor }, { borderColor: `${isFocus && !error ? '#4ec5dd' : validationColor}` }]}>

                <View>
                    <Text style={[styles.placeholderText, isFocus ? styles.placeholderPadd : {}]}>{isFocus && !error ? props.placeholder : ''}</Text>
                </View>

                <View>
                    <Text style={[styles.errorText, error ? styles.errPadd : {}]}>{error}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <TextInput onFocus={() => setIsFocus(true)} style={{ fontFamily: 'mulish-regular' }} underlineColorAndroid='transparent' {...otherProps} ref={ref} />
                </View>

                {
                    isEye
                        ? <Pressable onPress={() => onPress ? onPress() : {}} >
                            <View>
                                <Image style={{ width: 24, height: 24 }} source={require('../../assets/icons/eye.png')} />
                            </View>
                            {/* <Entypo name={icon} /> */}
                        </Pressable>
                        : <View></View>
                }


            </View>

            {/* input error msg */}
            {errorMsg &&
                <View>
                    <Text style={styles.errorMsg}>{errorMsg}</Text>
                </View>
            }
        </View>
    );
});


const styles = StyleSheet.create({
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 16,
        marginBottom: 16,
        fontFamily: 'mulish-regular',
    },

    errorText: {
        color: '#ee5779',
        position: 'absolute',
        top: Platform.OS === 'ios' ? -37 : -41,
        backgroundColor: '#ffffff',
        fontSize: 12,
        fontFamily: 'mulish-regular'
    },

    /* input error msg style */
    errorMsg: {
        fontSize: 12,
        marginTop: -12,
        marginBottom: 16,
        marginLeft: 16,
        color: '#ee5779',
        padding: 0,
        fontFamily: 'mulish-regular'
    },

    errPadd: {
        padding: 3
    },

    placeholderText: {
        color: '#4ec5dd',
        position: 'absolute',
        top: Platform.OS === 'ios' ? -37 : -41,
        backgroundColor: '#ffffff',
        padding: 0,
        fontSize: 12,
        fontFamily: 'mulish-regular'
    },

    placeholderPadd: {
        padding: 3
    }
});
export default FormInput;