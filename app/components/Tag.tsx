import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useAppSelector } from '../hooks';
import { ICategory } from '../../interfaces/ICategory';

interface IProps {
    tag: ICategory;
    onPress?: (id: string) => void;
    marginRight: number;
    isSelected?: boolean;
    notSelected?: boolean;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
};

const Tag: React.FC<IProps> = ({ tag, onPress, marginRight, isSelected, notSelected, backgroundColor, textColor, borderColor }) => {
    const { id, name } = tag;
    const isActive = notSelected ? false : isSelected !== undefined ? isSelected : useAppSelector(state => state.categories.userCategories.some(cat => cat === id));

    return (
        <Pressable onPress={() => onPress ? onPress(id) : {}} style={{ marginRight: marginRight, marginBottom: 16, flexWrap: 'wrap', }}>
            <View style={isActive ? [styles.selectedContainer, { backgroundColor: backgroundColor, borderColor: borderColor }] : styles.container}>
                <Text style={isActive ? [styles.tag, { color: textColor }] : styles.tag}>{name}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    selectedContainer: {
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#ffbdcc'
    },

    container: {
        borderColor: '#ed0036',
        borderWidth: 1,
        borderRadius: 20,
    },

    tag: {
        color: '#ed0036',
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        fontFamily: 'mulish-regular'
    }
})

export default Tag;