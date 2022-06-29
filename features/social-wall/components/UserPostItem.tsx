import React, { SetStateAction, Dispatch } from 'react';
import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { IPost } from '../../../slices/postsSlice';
import Card from '../../../app/components/Card';
import { selectAvatarByUser } from '../../../slices/avatarsSlice';
import { getPreviewUser } from '../../../slices/userSlice';
import { getUserPosts, getUserPostsNumber, getAllUserPostLikes, getAllPosts, postLike, getPostsByCategory, deletePost } from '../../../slices/postsSlice';
import { avatars } from '../../../assets/avatars/index';

interface IProps {
    item: IPost;
    shownModal: string;
    setShownModal: Dispatch<SetStateAction<string>>;
    isLoggedinUser: boolean;
};

const PostItem: React.FC<IProps> = ({ item, shownModal, isLoggedinUser, setShownModal }) => {
    const dispatch = useAppDispatch();
    const createdTime = moment(item.createdAt).fromNow();
    const user = useAppSelector(state => state.user.previewUser);
    const avatarId = useAppSelector(state => state.user.previewUser?.imageId);
    const userAvatar = useAppSelector(state => selectAvatarByUser(state, avatarId ? avatarId : ''));
    const category = useAppSelector(state => state.categories.categories.find(cat => cat.id === item.categoryId));
    const avatarFileName = Object.keys(avatars).find((item: string) => item === userAvatar?.fileName);
    const avatarIndex = Object.keys(avatars).findIndex(item => item == avatarFileName);
    const avatarImg = Object.values(avatars)[avatarIndex];

    const handleSelectUser = () => {
        dispatch(getPreviewUser(item.userId));
        dispatch(getUserPosts(item.userId));
        dispatch(getUserPostsNumber(item.userId));
        dispatch(getAllUserPostLikes(item.userId));
    };


    const handleLike = () => {
        dispatch(postLike(item.id)).then(() => {
            dispatch(getAllPosts());
            dispatch(getUserPosts(item.userId));
        });
    };

    const handleDeletePost = () => {
        setShownModal('');
        dispatch(deletePost(item.id)).then(() => {
            dispatch(getUserPosts(item.userId));
            dispatch(getAllPosts());
        });
    };

    return (
        <Card>
            <View style={[styles.flexRow, styles.flexSpcBetween, styles.flexAlignCenter]}>
                <View style={[styles.flexRow, styles.flexAlignCenter, { marginBottom: 16 }]}>
                    <Pressable onPress={() => handleSelectUser()}>
                        <Image source={avatarImg ? avatarImg : {}} style={{ marginRight: 8, width: 38, height: 38 }} />
                    </Pressable>
                    <View>
                        <View style={[styles.flexRow, styles.flexAlignCenter]}>
                            <Text style={{ fontSize: 14, fontFamily: 'mulish-semibold' }}>{user?.username}</Text>
                            <Text style={{ color: 'grey', opacity: 0.5, marginLeft: 4 }}>@Together</Text>
                        </View>
                        <Text style={{ fontSize: 10, fontFamily: 'mulish-regular', opacity: 0.2 }}>{createdTime}</Text>
                    </View>
                </View>

                {isLoggedinUser &&
                    <View style={{ position: 'absolute', top: 0, right: 0 }}>
                        <TouchableOpacity style={[styles.flexRow, { padding: 16 }]} onPress={() => setShownModal(item.id)}>
                            <View style={{ backgroundColor: '#000000', opacity: 0.5, width: 4, height: 4, borderRadius: 50, marginRight: 4 }}></View>
                            <View style={{ backgroundColor: '#000000', opacity: 0.5, width: 4, height: 4, borderRadius: 50, marginRight: 4 }}></View>
                            <View style={{ backgroundColor: '#000000', opacity: 0.5, width: 4, height: 4, borderRadius: 50 }}></View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <Text style={{ fontSize: 14, fontFamily: 'mulish-semibold', marginBottom: 8 }}>{item.title}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'mulish-regular', marginBottom: 8, opacity: 0.5 }}>{item.note}</Text>
            <View style={[styles.flexRow, { marginBottom: 16 }]}>
                <Text style={{ color: '#4ec5dd', fontSize: 12, fontFamily: 'mulish-regular', marginRight: 10 }}>{`#${category?.name}`}</Text>
            </View>
            <Text style={{ width: '100%', height: 1, backgroundColor: '#000000', opacity: 0.1, marginBottom: 14 }}></Text>
            {item.postLikeCount > 0 ?
                <View style={[styles.flexRow, styles.flexAlignCenter]}>
                    <Text style={{ marginRight: 10, opacity: 0.5 }}>{item.postLikeCount}</Text>
                    <Pressable onPress={() => handleLike()}>
                        <Image source={require('../../../assets/icons/heart.png')} style={{ width: 24, height: 24 }} />
                    </Pressable>
                </View>
                :
                <View style={[styles.flexRow, styles.flexAlignCenter]}>
                    <Text style={{ marginRight: 10, opacity: 0.5 }}>{item.postLikeCount}</Text>
                    <Pressable onPress={() => handleLike()}>
                        <Image source={require('../../../assets/icons/heart-empty.png')} style={{ width: 24, height: 24 }} />
                    </Pressable>
                </View>
            }
            {
                shownModal && shownModal === item.id
                    ?
                    <View style={styles.modal}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../../assets/icons/delete-post.png')} style={{ width: 24, height: 24, marginRight: 32, }} />
                            <Pressable onPress={() => handleDeletePost()}>
                                <Text style={{ fontSize: 14, fontFamily: 'mulish-regular' }}>Delete post</Text>
                            </Pressable>
                        </View>
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