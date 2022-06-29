import React from 'react';
import { StyleSheet, View, Image, TextInput, Pressable, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { searchPosts, getUserPosts, getUserPostsNumber, getAllUserPostLikes, getAllPosts } from '../../../slices/postsSlice';
import { selectAvatarByUser } from '../../../slices/avatarsSlice';
import { getPreviewUser } from '../../../slices/userSlice';
import { HomeStackParamList } from '../navigation/HomeNavigator';
import { avatars } from '../../../assets/avatars/index';


type profilePreviewScreenProp = StackNavigationProp<HomeStackParamList, 'ProfilePreview'>

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<profilePreviewScreenProp>();
    const avatarId = useAppSelector(state => state.user.user?.imageId);
    const userAvatar = useAppSelector(state => selectAvatarByUser(state, avatarId ? avatarId : ''));
    const userId = useAppSelector(state => state.user.user?.id);
    const avatarFileName = Object.keys(avatars).find((item: string) => item === userAvatar?.fileName);
    const avatarIndex = Object.keys(avatars).findIndex(item => item == avatarFileName);
    const avatarImg = Object.values(avatars)[avatarIndex];

    const handleAvatarPress = () => {
        if (userId) {
            dispatch(getPreviewUser(userId));
            dispatch(getUserPosts(userId));
            dispatch(getUserPostsNumber(userId));
            dispatch(getAllUserPostLikes(userId));
            navigation.navigate('ProfilePreview');
        };
    };

    const handleSearch = (search: string) => {
        if (search === '') {
            dispatch(getAllPosts());
        } else {
            dispatch(searchPosts(search));
        };
    };

    return (
        <View style={styles.header__top}>
            {avatarImg &&
                <Pressable onPress={() => handleAvatarPress()}>
                    <Image source={avatarImg} style={{ width: 40, height: 40 }} />
                </Pressable>
            }
            <View style={{ position: 'relative', width: '86%' }}>
                <TextInput
                    placeholder='Search'
                    placeholderTextColor='#cccccc'
                    style={{ width: '100%', padding: Platform.OS === 'ios' ? 10 : 5, paddingLeft: 45, borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 16, marginLeft: 8, fontFamily: 'mulish-regular', fontSize: 14 }}
                    keyboardType='default'
                    onChangeText={handleSearch}
                />
                <Image source={require('../../../assets/icons/search.png')} style={{ width: 24, height: 24, position: 'absolute', left: 25, top: '25%' }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header__top: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32
    }
});

export default Header;
