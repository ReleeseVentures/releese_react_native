import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const EmptyState: React.FC = () => {
    return (
        <View style={styles.emptyState}>
            <Image source={require('../../../assets/img/empty-state.png')} />
            <Text style={styles.emptyStateTxt}>Nothing to see here...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    emptyStateTxt: {
        marginTop: 8,
        color: '#979797',
        fontSize: 16,
        fontFamily: 'mulish-semibold'
    }
});

export default EmptyState;