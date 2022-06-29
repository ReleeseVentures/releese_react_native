import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Image, BackHandler, RefreshControl, Pressable } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Tag from '../../../app/components/Tag';
import Footer from '../../../app/components/Footer';
import { RootStackParamList } from '../../../app/AppNavigator';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import { resetStatus } from '../../../slices/userSlice';
import PostItem from '../components/PostItem';
import { resetStatus as resetPostsStatus, getPostsByCategory, getAllPosts } from '../../../slices/postsSlice';
import { ICategory } from '../../../interfaces/ICategory';

type tagsScreenProp = StackNavigationProp<RootStackParamList, 'Tags'>
type createPostScreenProp = StackNavigationProp<RootStackParamList, 'CreatePost'>

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [shownModal, setShownModal] = useState<string>('');
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const tagsNavigation = useNavigation<tagsScreenProp>();
    const createPostNavigation = useNavigation<createPostScreenProp>();
    const userCategories = useAppSelector(state => state.categories.userCategories);
    const categories = useAppSelector(state => state.categories.categories.filter((cat: ICategory) => {
        if (userCategories.some((x: string) => x === cat.id)) {
            return cat;
        };
    }));
    const posts = useAppSelector(state => state.posts.posts);

    const tagsHandler = () => {
        tagsNavigation.navigate('Tags');
    }

    const createPostHandler = () => {
        createPostNavigation.navigate('CreatePost');
    };

    const onTagPress = (id: string) => {
        if (id !== selectedCategory) {
            setSelectedCategory(id);
            dispatch(getPostsByCategory(id));
        } else {
            setSelectedCategory('');
            dispatch(getAllPosts());
        };
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getAllPosts()).then(() => {
            setSelectedCategory('');
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(resetPostsStatus());
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{ height: '100%', backgroundColor: '#f2f6fa' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Pressable onPressOut={() => setShownModal('')}>
                    {/* <StatusBar backgroundColor='#ffffff' /> */}
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Header />

                            <View style={styles.header__bot}>
                                <View style={{ marginTop: 8 }}>
                                    <TouchableOpacity onPress={tagsHandler}>
                                        <Image style={{ marginRight: 16, width: 24, height: 24 }} source={require('../../../assets/icons/plus.png')} />
                                    </TouchableOpacity>
                                </View>

                                <View >
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={[styles.tagWrapper, { paddingRight: 38 }]}>
                                            {categories.map((item, index) => (
                                                <Tag backgroundColor='#ee5779' textColor='#ffffff' borderColor='#ee5779' key={index} tag={item} onPress={onTagPress} marginRight={8} isSelected={selectedCategory === item.id} />
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.titlePrimary}>Posts</Text>
                            {posts && posts.length > 0
                                ?
                                // <FlatList
                                //     data={posts}
                                //     renderItem={({ item }) => <PostItem item={item} shownModal={shownModal} setShownModal={setShownModal} />}
                                //     keyExtractor={item => item.id}
                                // />
                                <View>
                                    {posts.map(item => (
                                        <PostItem key={item.id} item={item} shownModal={shownModal} setShownModal={setShownModal} selectedCategory={selectedCategory} />
                                    ))}
                                </View>
                                :
                                <EmptyState />
                            }
                        </View >
                    </View>
                </Pressable>
            </ScrollView>
            <Footer onClick={createPostHandler} />
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f6fa',
        // paddingBottom: 256,
        paddingBottom: 60,
        position: 'relative',
        // height: Dimensions.get('window').height,
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

    header: {
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingBottom: 8,
        marginBottom: 24,
        paddingTop: 8,

        shadowColor: '#000',
        shadowOffset: { width: 8, height: -8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },

    header__top: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32
    },

    header__bot: {
        flexDirection: 'row'
    },

    tagWrapper: {
        flexDirection: 'row'
    },

    content: {
        paddingLeft: 16,
        paddingRight: 16,
        position: 'relative',
    },

    titlePrimary: {
        fontSize: 16,
        fontFamily: 'mulish-semibold',
        marginBottom: 16,
        opacity: 0.7
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
    },

    emptyStateTxt: {
        marginTop: 8,
        color: '#979797',
        fontSize: 16,
        fontFamily: 'mulish-semibold'
    }

});

export default Home;