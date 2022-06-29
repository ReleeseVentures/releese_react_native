import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    children?: JSX.Element | JSX.Element[];
    styles?: any;
};

const CustomHeader: React.FC<IProps> = ({ children, styles }) => {
    return (
        <View style={{ ...styles.header, ...styles }}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CustomHeader;