import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAppDispatch } from '../../../app/hooks';
import CustomButton from '../../../app/components/CustomButton';
import { RootStackParamList } from '../../../app/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Stepper from '../../../components/Stepper';
import background from '../../../assets/img/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resetState } from '../../auth/slices/authSlice';
import { resetUser } from '../../../slices/userSlice';
import { setAvatars, avatars } from '../../../slices/avatarsSlice';

type loginHomeScreenProp = StackNavigationProp<RootStackParamList, 'LoginHome'>;

const FirstBoardingScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<loginHomeScreenProp>();
    const [currentPosition, setCurrentPosition] = useState<number>(0);

    const handleStepPress = () => {
        if (currentPosition < 3) {
            setCurrentPosition(currentPosition + 1);
        }
    };

    const handleButtonPress = () => {
        navigation.navigate('LoginHome');
    };

    const handleSwipeRight = () => {
        if (currentPosition > 0)
            setCurrentPosition(currentPosition - 1)
    }

    const handleSkipPress = () => {
        setCurrentPosition(3);
    };

    useFocusEffect(
        React.useCallback(() => {
            dispatch(resetUser());
            dispatch(resetState());
            dispatch(setAvatars(avatars));
            setCurrentPosition(0);
            return;
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <GestureRecognizer style={styles.container}
                    onSwipeLeft={() => handleStepPress()}
                    onSwipeRight={() => handleSwipeRight()}
                >
                    <Image source={background} style={styles.imageBackground}></Image>
                    {currentPosition !== 3 &&
                        <View style={styles.navBtn}>
                            <CustomButton label='Skip' txtStyle={styles.navSkip} pressHandler={() => handleSkipPress()} />
                        </View>
                    }
                    {currentPosition === 0 ?
                        <View style={styles.content}>
                            <Text style={title.titlePrimary}>Hello there!</Text>
                            <Text style={title.titleSecondary}>Before we get started, here is what you can do with Releese.</Text>

                            <View>
                                <Stepper currentStep={currentPosition} />
                            </View>
                        </View>
                        : currentPosition === 1 ?
                            <View style={styles.content}>
                                <Text style={title.titlePrimary}>Explore communities</Text>
                                <Text style={title.titleSecondary}>Dive into communities full of compasion and empathy with people that share stories and feel what you feel.</Text>

                                <View>
                                    <Stepper currentStep={currentPosition} />
                                </View>
                            </View>
                            : currentPosition === 2 ?
                                <View style={styles.content}>
                                    <Text style={title.titlePrimary}>Chat with others!</Text>
                                    <Text style={title.titleSecondary}>With complete anonymity you can feel safe and make your sharing easier.</Text>

                                    <View>
                                        <Stepper currentStep={currentPosition} />
                                    </View>
                                </View>
                                :
                                <View style={styles.content}>
                                    <View >
                                        <Text style={title.titlePrimary}>{'Connect & More'}</Text>
                                        <Text style={title.titleSecondary}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

                                        <View>
                                            <Stepper currentStep={currentPosition} />
                                        </View>
                                    </View>
                                </View>
                    }
                    {/* <View style={styles.swiper}>
                    <Stepper currentStep={currentPosition} />
                </View> */}
                    {currentPosition === 3 &&
                        <View style={styles.btnContainer}>
                            <CustomButton btnStyle={styles.btn} pressHandler={() => handleButtonPress()} txtStyle={styles.btnTxt} label='Lets go!' />
                        </View>}
                </GestureRecognizer>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 80
    },

    navBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 16
    },
    navSkip: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'mulish-semibold'
    },

    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 30,
        paddingLeft: 18,
        paddingRight: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btn: {
        width: '100%',
        backgroundColor: '#4ec5dd',
        borderRadius: 10,
        padding: 14,
    },

    btnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        padding: 2,
        fontFamily: 'mulish-bold'
    },

    imageBackground: {
        width: '100%',
        flex: 1
    }
});

const title = StyleSheet.create({
    titlePrimary: {
        textAlign: 'center',
        fontSize: 32,
        color: '#000000',
        marginBottom: 32,
        fontFamily: 'mulish-semibold'
    },

    titleSecondary: {
        fontSize: 14,
        color: '#000000',
        opacity: 0.5,
        textAlign: 'center',
        width: 290,
        height: 70,
        fontFamily: 'mulish-regular'
    }
});

export default FirstBoardingScreen;