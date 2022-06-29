import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Pressable, Platform } from 'react-native';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { RootStackParamList } from '../../../app/AppNavigator';
import Card from '../../../app/components/Card';
import { selectAvatarByUser } from '../../../slices/avatarsSlice';
import { IPost, getUserPosts, getUserPostsNumber, postLike, getAllPosts, getAllUserPostLikes, getPostsByCategory, deletePost } from '../../../slices/postsSlice';
import { getPreviewUser } from '../../../slices/userSlice';
import { avatars } from '../../../assets/avatars/index';

type profilePreviewScreenProp = StackNavigationProp<RootStackParamList, 'ProfilePreview'>

interface IProps {
    item: IPost;
    shownModal: string;
    setShownModal: Dispatch<SetStateAction<string>>;
    selectedCategory?: string;
};

const PostItem: React.FC<IProps> = ({ item, shownModal, setShownModal, selectedCategory }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<profilePreviewScreenProp>();
    const [isShown, setIsShown] = useState<boolean>(false);
    const createdTime = moment(item.createdAt).fromNow();
    const userAvatar = useAppSelector(state => selectAvatarByUser(state, item.user.imageId ? item.user.imageId : ''));
    const category = useAppSelector(state => state.categories.categories.find(cat => cat.id === item.categoryId));
    const userId = useAppSelector(state => state.user.user?.id);
    const avatarFileName = Object.keys(avatars).find((item: string) => item === userAvatar?.fileName);
    const avatarIndex = Object.keys(avatars).findIndex(item => item == avatarFileName);
    const avatarImg = Object.values(avatars)[avatarIndex];

    const profilePreviewHandler = () => {
        setShownModal('');
        dispatch(getPreviewUser(item.userId)).then(() => {
            dispatch(getUserPosts(item.userId)).then(() => {
                dispatch(getUserPostsNumber(item.userId)).then(() => {
                    dispatch(getAllUserPostLikes(item.userId)).then(() => {
                        navigation.navigate('ProfilePreview');
                    });
                });
            });
        });
    };

    const handleLike = () => {
        dispatch(postLike(item.id)).then(() => {
            if (!selectedCategory) {
                dispatch(getAllPosts());
            } else {
                dispatch(getPostsByCategory(selectedCategory));
            };
        });
    };

    const handleDeletePost = () => {
        setShownModal('');
        dispatch(deletePost(item.id)).then(() => {
            if (!selectedCategory) {
                dispatch(getAllPosts());
            } else {
                dispatch(getPostsByCategory(selectedCategory));
            };
        });
    };

    return (
        <Card>
            <View style={[styles.flexRow, styles.flexSpcBetween, styles.flexAlignCenter]}>
                <View style={[styles.flexRow, styles.flexAlignCenter, { marginBottom: 16 }]}>
                    <Image source={avatarImg ? avatarImg : {}} style={{ marginRight: 8, width: 38, height: 38 }} />

                    <View>
                        <View style={[styles.flexRow, styles.flexAlignCenter]}>
                            <Text style={{ fontSize: 14, fontFamily: 'mulish-semibold' }}>{item.user.username}</Text>
                            <Text style={{ color: '#000000', opacity: 0.5, marginLeft: 4 }}>@Together</Text>
                        </View>
                        <Text style={{ fontSize: 10, fontFamily: 'mulish-regular', opacity: 0.2 }}>{createdTime}</Text>
                    </View>
                </View>

                <View style={{ position: 'absolute', top: 0, right: 0 }}>
                    <TouchableOpacity style={[styles.flexRow, { padding: 16 }]} onPress={() => setShownModal(item.id)}>
                        <View style={{ backgroundColor: '#000000', opacity: 0.5, width: 4, height: 4, borderRadius: 50, marginRight: 4 }}></View>
                        <View style={{ backgroundColor: '#000000', opacity: 0.5, width: 4, height: 4, borderRadius: 50, marginRight: 4 }}></View>
                        <View style={{ backgroundColor: '#000000', opacity: 0.5, width: 4, height: 4, borderRadius: 50 }}></View>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={{ fontSize: 14, fontFamily: 'mulish-semibold', marginBottom: 8 }}>{item.title}</Text>

            <Text style={{ fontSize: 14, fontFamily: 'mulish-regular', marginBottom: 8, opacity: 0.5 }}>{item.note}</Text>

            <View style={[styles.flexRow, { marginBottom: 16 }]}>
                <Text style={{ color: '#4ec5dd', fontSize: 12, fontFamily: 'mulish-regular', marginRight: 10 }}>{`#${category?.name}`}</Text>
            </View>

            <Text style={{ width: '100%', height: 1, backgroundColor: '#000000', opacity: 0.1, marginBottom: 14 }}></Text>

            <View style={[styles.flexRow, styles.flexAlignCenter]}>
                {item.postLikeCount > 0 ?
                    <View style={{ flexDirection: 'row', alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start' }}>
                        <Text style={{ marginRight: 10, opacity: 0.5 }}>{item.postLikeCount}</Text>
                        <Pressable onPress={() => handleLike()}>
                            <Image source={require('../../../assets/icons/heart.png')} style={{ width: 24, height: 24 }} />
                        </Pressable>
                    </View>
                    :
                    <Pressable onPress={() => handleLike()}>
                        <Image source={require('../../../assets/icons/heart-empty.png')} style={{ width: 24, height: 24 }} />
                    </Pressable>
                }
            </View>
            {
                shownModal && shownModal === item.id
                    ? <View style={styles.modal}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../../assets/icons/user.png')} style={{ width: 24, height: 24, marginRight: 32, }} />
                            <Pressable onPress={() => profilePreviewHandler()}>
                                <Text style={{ fontSize: 14, fontFamily: 'mulish-regular' }}>View profile</Text>
                            </Pressable>
                        </View>

                        {userId && userId === item.userId &&
                            <View style={{ flexDirection: 'row', marginTop: 24 }}>
                                <Image source={require('../../../assets/icons/delete-post.png')} style={{ width: 24, height: 24, marginRight: 32, }} />
                                <Pressable onPress={() => handleDeletePost()}>
                                    <Text style={{ fontSize: 14, fontFamily: 'mulish-regular' }}>Delete post</Text>
                                </Pressable>
                            </View>
                        }
                    </View>
                    : <View></View>
            }
        </Card>
    );
};

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row'
    },
    flexSpcBetween: {
        justifyContent: 'space-between'
    },
    flexAlignCenter: {
        alignItems: 'center'
    },
    modal: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },

        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 7,
        backgroundColor: '#ffffff',
        marginBottom: 50,
        width: 216,
        justifyContent: 'center',
        padding: 16,
        borderRadius: 4,
        position: 'absolute',
        top: 26,
        right: 16
    }
});

export default PostItem;