import React from 'react';
import { Text, Pressable } from 'react-native';

interface IProps {
    onPost: () => void;
};

const PostButton: React.FC<IProps> = ({ onPost }) => {
    return (
        <Pressable onPress={onPost}>
            <Text style={{ marginRight: 16, color: '#4ec5dd', fontSize: 14, fontFamily: 'mulish-semibold' }}>Post</Text>
        </Pressable>
    );
};

export default PostButton;