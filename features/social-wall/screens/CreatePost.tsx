import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, BackHandler, Keyboard, Platform, KeyboardAvoidingView } from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../app/AppNavigator';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import Tag from '../../../app/components/Tag';
import BackArrow from '../../../components/BackArrow';
import PostButton from '../components/PostButton';
import { createPost } from '../../../slices/postsSlice';
import { getAllPosts } from '../../../slices/postsSlice';
import { selectAvatarByUser } from '../../../slices/avatarsSlice';
import { avatars } from '../../../assets/avatars/index';
import { SafeAreaView } from 'react-native-safe-area-context';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

const CreatePost: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<homeScreenProp>();
    const categories = useAppSelector(state => state.categories.categories);
    const status = useAppSelector(state => state.posts.status);
    const avatarId = useAppSelector(state => state.user.user?.imageId);
    const userAvatar = useAppSelector(state => selectAvatarByUser(state, avatarId ? avatarId : ''));
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const avatarFileName = Object.keys(avatars).find((item: string) => item === userAvatar?.fileName);
    const avatarIndex = Object.keys(avatars).findIndex(item => item == avatarFileName);
    const avatarImg = Object.values(avatars)[avatarIndex];

    const { handleChange, handleSubmit, values } = useFormik({
        initialValues: { title: '', note: '' },
        onSubmit: values => {
            const data = {
                title: values.title,
                note: values.note,
                categoryId: selectedCategory
            };
            dispatch(createPost(data));
        }
    });

    const backAction = () => {
        navigation.goBack();
        return true;
    };

    const onTagPress = (id: string) => {
        setSelectedCategory(id);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackArrow btnColor='#34d5eb' />,
            headerRight: () => <PostButton onPost={handleSubmit} />,
            title: 'Add post',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
                fontSize: 14,
                marginLeft: Platform.OS === 'ios' ? -150 : -16,
                fontFamily: 'mulish-semibold'
            }
        })
    });

    useEffect(() => {
        setSelectedCategory(categories[0].id);
    }, []);

    useEffect(() => {
        if (status === 'create-success') {
            dispatch(getAllPosts());
            navigation.navigate('Home', { screen: 'SocialWall' });
        }
    }, [status]);

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={avatarImg ? avatarImg : {}} style={{ marginRight: 16, width: 40, height: 40 }} />
                <Text style={{ fontFamily: 'mulish-semibold', fontSize: 14 }}>My Profile</Text>
            </View>

            <View style={styles.line}></View>

            <TextInput
                style={{ marginBottom: 16, fontSize: 16, fontFamily: 'mulish-semibold', color: '#000000' }}
                placeholder='Think of a title'
                value={values.title}
                onChangeText={handleChange('title')}
            />

            <View style={styles.line}></View>

            <TextInput
                multiline={true}
                numberOfLines={10}
                style={{ height: 200, textAlignVertical: 'top', fontFamily: 'mulish-regular', color: '#000000' }}
                placeholder='Tell your story'
                placeholderTextColor='lightgrey'
                value={values.note}
                onChangeText={handleChange('note')}
            />
            <View style={styles.keyboardTagsShown}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.tagWrapper}>
                        {categories.map((item, index) => (
                            <Tag backgroundColor='#ee5779' textColor='#ffffff' borderColor='#ee5779' key={index} tag={item} onPress={() => onTagPress(item.id)} marginRight={16} isSelected={selectedCategory === item.id} />
                        ))}
                    </View>
                </ScrollView>
            </View>

        </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16
    },

    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#e6e6e6',
        marginTop: 16,
        marginBottom: 16
    },

    keyboardTags: {
        display: 'none'
    },

    keyboardTagsShown: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        paddingLeft: 16,
        backgroundColor: '#ffffff',
        borderTopColor: '#e6e6e6',
        borderTopWidth: 1,
    },

    tagWrapper: {
        flexDirection: 'row',
        marginBottom: -8
    },
});

export default CreatePost;