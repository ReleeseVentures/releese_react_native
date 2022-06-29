import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../app/components/CustomButton';
import FormInput from '../../../app/components/FormInput';
import BackArrow from '../../../components/BackArrow';
import Tag from '../../../app/components/Tag';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../app/AppNavigator';
import LineStepper from '../../../components/LineStepper';
import { setupUser, getUser } from '../../../slices/userSlice';
import { setSelectedCategories } from '../../../slices/categorySlice';
import { getAllPosts } from '../../../slices/postsSlice';
import { avatars } from '../../../assets/avatars/index';

type onboardingScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const ValidationSchema = Yup.object().shape({
    username: Yup.string().required('Required')
});

const OnboardingScreen: React.FC = () => {
    const navigation = useNavigation<onboardingScreenProp>();
    const dispatch = useAppDispatch();
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [selectedUsername, setSelectedUsername] = useState<string>('');
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');
    const categories = useAppSelector(state => state.categories.categories);
    const avatarsArr = useAppSelector(state => state.avatars.avatars);
    const userId = useAppSelector(state => state.auth.user?.id);
    const selectedCategories = useAppSelector(state => state.categories.userCategories);
    const status = useAppSelector(state => state.user.status);

    const avatarImages = avatarsArr.map((item: any) => {
        let index = Object.keys(avatars).findIndex(x => x == item.fileName);
        return {
            id: item.id,
            img: Object.values(avatars)[index]
        };
    });

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: ValidationSchema,
        initialValues: { username: '' },
        onSubmit: values => {
            if (currentPosition < 2) {
                if (currentPosition === 0 && userId) {
                    setSelectedUsername(values.username);
                };
                setCurrentPosition(currentPosition + 1);
            } else {
                const data = {
                    username: selectedUsername,
                    imageId: selectedAvatar,
                    category: selectedCategories,
                    userId: userId ? userId : ''
                };
                dispatch(setupUser(data));
            }
        }
    });

    const { username } = values;

    let disabledButton = false;

    if (currentPosition === 0 && username === '' || currentPosition === 1 && !selectedAvatar || currentPosition === 2 && selectedCategories.length < 2) {
        disabledButton = true;
    };

    const handleStepPress = () => {
        setCurrentPosition(currentPosition + 1);
    };

    const onBackButtonPress = () => {
        if (currentPosition === 0) {
            return;
        } else {
            setCurrentPosition(currentPosition - 1);
        }
    };

    const onTagPress = (id: string) => {
        dispatch(setSelectedCategories(id));
    };

    const selectAvatarHandler = (id: string) => {
        setSelectedAvatar(id);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <BackArrow onPress={() => onBackButtonPress()} />
            ),
            title: '',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: 'white'
            }
        })
    });

    useEffect(() => {
        if (status === 'setup-success' && userId) {
            dispatch(getUser(userId));
            dispatch(getAllPosts());
        } else if (status === 'getUser-success') {
            navigation.navigate('Home', { screen: 'SocialWall' });
        };
    }, [status]);

    return (
        <View style={styles.container}>
            <View>
                <LineStepper currentStep={currentPosition} />
            </View>
            {currentPosition === 0 ?
                <View style={styles.stepOneContainer}>
                    <Text style={styles.titlePrimary}>Choose your safe name</Text>
                    <View style={{ width: '100%' }}>
                        <FormInput
                            name='username '
                            placeholder='Username'
                            returnKeyType='go'
                            error={errors.username}
                            touched={touched.username}
                            onChangeText={handleChange('username')}
                            onSubmitEditing={() => handleSubmit()}
                            onBlur={handleBlur('username')}
                            value={username}
                            isEye={false}
                        />
                    </View>
                </View>
                : currentPosition === 1 ?
                    <View style={styles.stepTwoContainer}>
                        <Text style={styles.titlePrimary}>Choose your avatar</Text>
                        <FlatList
                            data={avatarImages}
                            renderItem={({ item, index }) => (
                                <Pressable onPress={() => selectAvatarHandler(item.id)}>
                                    <View >
                                        {/* styles.imgSelected when img is selected */}
                                        <Image
                                            style={[styles.img, selectedAvatar === item.id ? styles.imgSelected : null]}
                                            source={item.img}
                                        />
                                    </View>
                                </Pressable>
                            )}
                            numColumns={4}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    :
                    <View style={{ flex: 1, marginBottom: 16 }}>
                        <Text style={styles.titleSecondary}>What are you facing right now?</Text>
                        <Text style={styles.titleTerc}>You can always change your mind or add some later. For now pick at least 3.</Text>
                        {/* <FlatList
                            data={tags}
                            renderItem={({ item, index }) => (
                                <Tag key={index} tag={item} onPress={onTagPress} />
                            )}
                            numColumns={3}
                        /> */}
                        <ScrollView>
                            <View style={styles.flexWrap}>
                                {categories.map((item, index) => (
                                    <Tag backgroundColor='#ffbdcc' textColor='#ed0036' borderColor='#ed0036' key={index} tag={item} onPress={onTagPress} marginRight={16} />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
            }
            {currentPosition === 1 && <Text style={styles.textSm} >You can change this at any time</Text>}
            <View style={styles.btnWrapper}>
                <CustomButton pressHandler={() => handleSubmit()} txtStyle={styles.btnPrimary} label={currentPosition === 2 ? 'Confirm' : 'Next'} disabled={disabledButton} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16
    },

    btnWrapper: {
        padding: 14,
        marginBottom: 40,
        backgroundColor: '#4ec5dd',
        width: '100%',
        borderRadius: 8
    },

    btnPrimary: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'mulish-bold'
    },

    stepOneContainer: {
        alignItems: 'center',
        flex: 1
    },

    stepTwoContainer: {
        flex: 1
    },

    titlePrimary: {
        alignSelf: 'flex-start',
        fontSize: 24,
        marginTop: 24,
        marginBottom: 32,
        fontFamily: 'mulish-semibold'
    },

    titleSecondary: {
        fontSize: 24,
        marginTop: 24,
        marginBottom: 8,
        fontFamily: 'mulish-semibold'
    },

    titleTerc: {
        fontSize: 14,
        marginBottom: 32,
        fontFamily: 'mulish-regular',
        opacity: 0.8
    },

    img: {
        width: 70,
        height: 70,
        marginRight: 16,
        marginBottom: 16
    },

    /* when img is selected */
    imgSelected: {
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 500
    },

    textSm: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 8,
        fontFamily: 'mulish-regular',
        opacity: 0.8
    },

    flexWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});

export default OnboardingScreen;