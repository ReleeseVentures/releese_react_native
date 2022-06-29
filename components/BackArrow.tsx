import React from 'react';
import { Pressable, View, StyleSheet, Image, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from './HeaderButton';

interface IProps {
    btnColor?: string;
    onPress?: () => void;
};

const BackArrow: React.FC<IProps> = (props) => {
    const { btnColor, onPress } = props;
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    }
    return (
        <Pressable onPress={() => handlePress()}>
            <View style={styles.headerContainer} >
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    {/* <Image width={10} height={10} source={require('../assets/icons/back.png')} /> */}
                    <AntDesign
                        name='left'
                        size={24}
                        color={btnColor ? btnColor : '#34d5eb'}
                        style={{ marginBottom: Platform.OS === 'ios' ? -10 : 0, marginTop: Platform.OS === 'ios' ? -10 : 0, }}
                    />
                </HeaderButtons>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 16,
    }
});

export default BackArrow;