import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react"
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native"
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { RootStackParamList } from "../../../app/AppNavigator";
import CustomButton from "../../../app/components/CustomButton";
import Tag from "../../../app/components/Tag";
import BackArrow from "../../../components/BackArrow";
import { setSelectedCategories } from "../../../slices/categorySlice";
import { updateUserCategories } from "../../../slices/userSlice";

export const TagsOptions = {
    headerLeft: () => <BackArrow btnColor='#34d5eb' />,
    title: 'Tags',
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
};

type createAccountScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

const Tags: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<createAccountScreenProp>();
    const userId = useAppSelector(state => state.user.user?.id);
    const categories = useAppSelector(state => state.categories.categories);
    const userCategories = useAppSelector(state => state.categories.userCategories);
    const numberOfUserCategories = userCategories.length;

    const onTagPress = (id: string) => {
        dispatch(setSelectedCategories(id));
    };

    const handleSubmit = () => {
        if (numberOfUserCategories > 2 && userId) {
            const dataToSend = {
                categories: [...userCategories],
                id: userId
            };
            dispatch(updateUserCategories(dataToSend));
            navigation.navigate('Home', { screen: 'SocialWall' });
        } else {
            return;
        };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titlePrimary}>What are you facing right now?</Text>

            <ScrollView style={{ marginBottom: 24 }}>
                <View style={[styles.flexWrap, { flex: 1 }]}>
                    {categories.map((item, index) => (
                        <Tag backgroundColor='#ffbdcc' textColor='#ed0036' borderColor='#ed0036' key={index} tag={item} onPress={onTagPress} marginRight={15} />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.btnWrapper}>
                <CustomButton pressHandler={handleSubmit} txtStyle={styles.btnPrimary} label='Save' disabled={numberOfUserCategories < 2} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16
    },

    titlePrimary: {
        fontSize: 24,
        color: '#000000',
        fontFamily: 'mulish-semibold',
        marginTop: 16,
        marginBottom: 24
    },

    flexWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row'
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
    }
});

export default Tags;