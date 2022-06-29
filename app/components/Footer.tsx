import React, { useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNavigator';

interface IProps {
    onClick?: () => void;
};

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Footer: React.FC<IProps> = (props) => {
    const navigation = useNavigation<homeScreenProp>();

    const handleHomePress = () => {
        navigation.navigate('Home', { screen: 'SocialWall' });
    };


    return (
        <View style={{ position: 'absolute', bottom: 0 }}>
            <View style={styles.footer}>
            </View>
            <Image source={require('../../assets/img/footer.png')} style={{ width: width, }} />
            <TouchableOpacity style={styles.footer__add} onPress={props.onClick}>
                <Image source={require('../../assets/img/plus.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <Pressable onPress={() => handleHomePress()} style={{ position: 'absolute', bottom: 16, left: 16 }} >
                <Image style={{ width: 24, height: 24 }} source={require('../../assets/icons/home.png')} />
            </Pressable>
            <Image style={{ position: 'absolute', bottom: 16, left: '25%', width: 24, height: 24 }} source={require('../../assets/icons/groups.png')} />
            <Image style={{ position: 'absolute', bottom: 16, right: '25%', width: 24, height: 24 }} source={require('../../assets/icons/chat.png')} />
            <Image style={{ position: 'absolute', bottom: 16, right: 16, width: 24, height: 24 }} source={require('../../assets/icons/notification.png')} />
        </View>
    )
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        // height: 56,
        position: 'absolute',
        top: height - 88,
        width: '100%',

    },
    footer__add: {
        top: -17,
        left: '51.4%',
        transform: [
            {
                translateX: -30
            }],
        position: 'absolute',
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: '#4ec5dd',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Footer;