import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const Card: React.FC<IProps> = (props) => {
    return <View style={styles.card}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 16,
        position: 'relative',

        shadowColor: "#000",
        shadowOffset: {
            width: Platform.OS === 'ios' ? 0 : 8,
            height: Platform.OS === 'ios' ? 2 : 1,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.12,
        shadowRadius: Platform.OS === 'ios' ? 3.84 : 2.22,

        elevation: 4,
        borderRadius: 4
    }
})

export default Card;