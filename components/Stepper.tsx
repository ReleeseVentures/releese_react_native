import React from "react"
import { View, Text, StyleSheet } from "react-native";

interface IProps {
    currentStep: number;
}

const Stepper: React.FC<IProps> = ({ currentStep }) => {

    return (
        <View style={styles.dotsWrapper}>
            <View style={currentStep === 0 ? styles.dotsActive : styles.dots}></View>
            <View style={currentStep === 1 ? styles.dotsActive : styles.dots}></View>
            <View style={currentStep === 2 ? styles.dotsActive : styles.dots}></View>
            <View style={currentStep === 3 ? styles.dotsActive : styles.dots}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    dotsWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 40,
        alignSelf: 'center',
    },

    dotsActive: {
        backgroundColor: '#000000',
        width: 8,
        height: 8,
        borderRadius: 20,
        marginRight: 8,
    },

    dots: {
        backgroundColor: '#000000',
        opacity: 0.2,
        width: 8,
        height: 8,
        borderRadius: 20,
        marginRight: 8
    }
});

export default Stepper;