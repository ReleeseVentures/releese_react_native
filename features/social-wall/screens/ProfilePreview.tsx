import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useCallback, useState } from "react"
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, BackHandler, RefreshControl, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../app/AppNavigator";
import Footer from "../../../app/components/Footer";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectAvatarByUser } from "../../../slices/avatarsSlice";
import EmptyState from "../components/EmptyState";
import PostItem from '../components/UserPostItem';
import { getUserPosts } from '../../../slices/postsSlice';
import { avatars } from '../../../assets/avatars/index';

type accountSettingsScreenProp = StackNavigationProp<RootStackParamList, 'AccountSettings'>;
type createPostScreenProp = StackNavigationProp<RootStackParamList, 'CreatePost'>

const ProfilePreview: React.FC = () => {
    const dispatch = useAppDispatch();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [shownModal, setShownModal] = useState<string>('');
    const avatarId = useAppSelector(state => state.user.previewUser?.imageId);
    const userAvatar = useAppSelector(state => selectAvatarByUser(state, avatarId ? avatarId : ''));
    const user = useAppSelector(state => state.user.previewUser);
    const postsNumber = useAppSelector(state => state.posts.userPostsNumber);
    const posts = useAppSelector(state => state.posts.userPosts);
    const userPostLikes = useAppSelector(state => state.posts.userPostsLikes);
    const loggedinUserId = useAppSelector(state => state.auth.user?.id);
    const isLoggedinUser = loggedinUserId === user?.id ? true : false;
    const avatarFileName = Object.keys(avatars).find((item: string) => item === userAvatar?.fileName);
    const avatarIndex = Object.keys(avatars).findIndex(item => item == avatarFileName);
    const avatarImg = Object.values(avatars)[avatarIndex];

    const navigation = useNavigation<accountSettingsScreenProp>();
    const createPostNavigation = useNavigation<createPostScreenProp>();

    const handleAccountSettings = () => {
        navigation.navigate('AccountSettings');
    }

    const backAction = () => {
        navigation.goBack();
        return true;
    };

    const createPostGoBackHandler = () => {
        createPostNavigation.goBack();
        return true;
    };

    const createPostHandler = () => {
        BackHandler.addEventListener('hardwareBackPress', createPostGoBackHandler);
        createPostNavigation.navigate('CreatePost');
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getUserPosts(user ? user.id : '')).then(() => {
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <ScrollView
                    style={{ height: '100%', backgroundColor: '#ffffff', }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.container}>
                        <View style={[isLoggedinUser ? styles.myProfile : styles.profile, styles.header__background, styles.flexAlignCenter]}>
                            <Image source={require('../../../assets/img/logo-transparent.png')} />
                        </View>
                        <View style={isLoggedinUser ? styles.myProfile : styles.profile}>
                            <View style={styles.profile__header}>
                                <View style={styles.profile__header__top}>
                                    <Image style={styles.profile__img} source={avatarImg ? avatarImg : {}} />
                                    <View style={[styles.flexRow, styles.flexAlignCenter, { marginTop: 16, marginBottom: 8 }]}>
                                        <Text style={{ fontFamily: 'mulish-bold', fontSize: 14 }}>{user?.username}</Text>
                                        <Text style={{ color: '#000000', fontFamily: 'mulish-regular', opacity: 0.5 }}> {`#${user?.usernameCode}`}</Text>
                                    </View>
                                    <Text style={{ marginBottom: 32, fontSize: 12, fontFamily: 'mulish-regular' }}>Member since {user?.createdAt}</Text>
                                </View>
                                <View style={[
                                    styles.flexRow,
                                    styles.flexSpcBetween,
                                    styles.flexAlignCenter,
                                    {
                                        marginBottom: 24,
                                        paddingTop: 16,
                                        paddingBottom: 16,
                                        paddingLeft: 60,
                                        paddingRight: 60,
                                        backgroundColor: '#fff',

                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 2 : 25 },
                                        shadowOpacity: Platform.OS === 'ios' ? 0.25 : 5.2,
                                        shadowRadius: Platform.OS === 'ios' ? 3.84 : 5,
                                        elevation: Platform.OS === 'ios' ? 5 : 1.5,
                                        borderRadius: 4
                                    }]}>
                                    <View style={styles.flexAlignCenter}>
                                        <Text style={{ fontSize: 14, fontFamily: 'mulish-bold' }}>{postsNumber}</Text>
                                        <Text style={{ fontSize: 12, fontFamily: 'mulish-regular' }}>Posts</Text>
                                    </View>

                                    <View style={{ width: 1, height: 45, backgroundColor: '#000000', opacity: 0.2 }}></View>

                                    <View style={styles.flexAlignCenter}>
                                        <Text style={{ fontSize: 14, fontFamily: 'mulish-bold' }}>{userPostLikes}</Text>
                                        <Text style={{ fontSize: 12, fontFamily: 'mulish-regular' }}>Feels</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.content}>
                            {posts && posts.length > 0
                                ?
                                // <FlatList
                                //     data={posts}
                                //     renderItem={postItem}
                                //     keyExtractor={item => item.id}
                                // />
                                <View>
                                    {posts.map(item => (
                                        <PostItem key={item.id} item={item} shownModal={shownModal} setShownModal={setShownModal} isLoggedinUser={isLoggedinUser} />
                                    ))}
                                </View>
                                :
                                <EmptyState />
                            }
                        </View >
                        {isLoggedinUser &&
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, padding: 16 }} onPress={handleAccountSettings}>
                                <Image source={require('../../../assets/icons/settings.png')} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
                <Footer onClick={createPostHandler} />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingBottom: 56
    },

    header__background: {
        paddingTop: 17,
        paddingBottom: 52,
    },

    profile__header: {
        paddingLeft: 16,
        paddingRight: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 2 : 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    profile__header__top: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    profile__img: {
        marginTop: -35,
        width: 84,
        height: 84
    },

    flexRow: {
        flexDirection: 'row'
    },

    flexSpcBetween: {
        justifyContent: 'space-between'
    },

    flexAlignCenter: {
        alignItems: 'center'
    },

    flexJustifyCenter: {
        justifyContent: 'center'
    },

    content: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 16
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyStateTxt: {
        marginTop: 8,
        color: '#979797',
        fontSize: 16,
        fontFamily: 'mulish-semibold'
    },

    myProfile: {
        backgroundColor: '#fcc77f'
    },

    profile: {
        backgroundColor: '#ee5779'
    }

});

export default ProfilePreview;