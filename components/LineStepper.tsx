import React from "react"
import { View, Text, StyleSheet } from "react-native";

interface IProps {
    currentStep: number;
}

const LineStepper: React.FC<IProps> = ({ currentStep }) => {

    return (
        <View style={styles.linesWrapper}>
            <View style={styles.lineActive}></View>
            <View style={currentStep === 1 || currentStep === 2 ? styles.lineActive : styles.lines}></View>
            <View style={currentStep === 2 ? styles.lineActive : styles.lines}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    linesWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 24,
        alignSelf: 'center',
    },

    /* line active treba ici na svaki line koji je proden */
    lineActive: {
        backgroundColor: '#4ec5dd',
        width: '31%',
        height: 4,
        borderRadius: 20,
        marginRight: 4
    },

    lines: {
        backgroundColor: 'lightgrey',
        width: '31%',
        height: 4,
        borderRadius: 20,
        marginRight: 4
    }
});

export default LineStepper;