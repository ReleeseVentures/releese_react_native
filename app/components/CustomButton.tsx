import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = (props: any) => {
    const { label, btnStyle, pressHandler, txtStyle, ...otherProps } = props;
    return (
        <TouchableOpacity style={btnStyle} onPress={() => pressHandler()} {...otherProps}>
            <Text style={txtStyle}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;