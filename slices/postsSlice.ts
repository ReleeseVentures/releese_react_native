import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import postsService from '../services/postsService';

export interface IPost {
    id: string;
    title: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    categoryId: string;
    user: {
        imageId: string;
        username: string;
    };
    postLikeCount: number;
};

export interface ICreatePostBody {
    title: string;
    note: string;
};

interface IState {
    posts: IPost[] | [];
    userPostsNumber: number;
    userPosts: IPost[] | [];
    status: string;
    userPostsLikes: number;
};

const initialState: IState = {
    posts: [],
    userPostsNumber: 0,
    userPosts: [],
    userPostsLikes: 0,
    status: ''
};

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    const response = await postsService.getAllPosts();
    return response;
});

export const getUserPosts = createAsyncThunk('posts/getUserPosts', async (id: string) => {
    const response = await postsService.getUserPosts(id);
    return response;
});

export const getUserPostsNumber = createAsyncThunk('posts/getUserPostsNumber', async (id: string) => {
    const response = await postsService.getUserPostsNumber(id);
    return response;
});

export const createPost = createAsyncThunk('posts/createPost', async (data: ICreatePostBody) => {
    const response = await postsService.createPost(data);
    return response;
});

export const getPostsByCategory = createAsyncThunk('posts/getPostsByCategory', async (id: string) => {
    const response = await postsService.getPostsByCategory(id);
    return response;
});

export const searchPosts = createAsyncThunk('posts/searchPosts', async (search: string) => {
    const response = await postsService.searchPosts(search);
    return response;
});

export const postLike = createAsyncThunk('posts/postLike', async (id: string) => {
    const response = await postsService.postLike(id);
    return response;
});

export const getAllUserPostLikes = createAsyncThunk('posts/getAllUserPostLikes', async (id: string) => {
    const response = await postsService.getAllUserPostLikes(id);
    return response;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: string) => {
    const response = await postsService.deletePost(id);
    return response;
});

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = '';
        },
        resetPosts(state) {
            state.posts = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserPostsNumber.fulfilled, (state, action: PayloadAction<number>) => {
                state.userPostsNumber = action.payload;
                state.status = 'success';
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.userPosts = action.payload;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.status = 'allPosts-success';
                state.posts = action.payload;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.status = 'create-success';
            })
            .addCase(getPostsByCategory.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(getAllUserPostLikes.fulfilled, (state, action: PayloadAction<number>) => {
                state.userPostsLikes = action.payload;
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
    }
});

export const { resetStatus, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;