import moment from 'moment';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import userService from '../services/userService';

export interface ISetupUserBody {
    username: string;
    imageId: string;
    category: string[];
    userId: string;
};

interface IUpdateUserCategoriesBody {
    categories: string[];
    id: string;
};

interface IUser {
    id: string;
    email: string;
    username: string;
    imageId: string;
    usernameCode: number;
    createdAt: string;
};

interface IState {
    user: IUser | null;
    previewUser: IUser | null;
    status: string;
};

const initialState: IState = {
    user: null,
    previewUser: null,
    status: ''
};

export interface ISendUserAvatarProps {
    userId: string;
    imageId: string;
};

export interface ISendUsernameProps {
    userId: string;
    username: string;
};

export const getUser = createAsyncThunk('user/getUser', async (userId: string) => {
    const response = await userService.getUser(userId);
    return response;
});

export const sendUsername = createAsyncThunk('user/sendUsername', async (data: ISendUsernameProps) => {
    const response = await userService.sendUsername(data);
    return response;
});

export const sendUserAvatar = createAsyncThunk('user/sendUserAvatar', async (data: ISendUserAvatarProps) => {
    const response = await userService.sendUserAvatar(data);
    return response;
});

export const setupUser = createAsyncThunk('user/setupUser', async (data: ISetupUserBody) => {
    const response = await userService.setupUser(data);
    return response;
});

export const getPreviewUser = createAsyncThunk('user/getPreviewUser', async (userId: string) => {
    const response = await userService.getUser(userId);
    return response;
});

export const updateUserCategories = createAsyncThunk('user/updateUserCategories', async (data: IUpdateUserCategoriesBody) => {
    const { categories, id } = data;
    const response = await userService.updateUserCategories(categories, id);
    return response;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser(state) {
            state.user = null;
        },
        resetStatus(state) {
            state.status = '';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                if (action.payload.message) {

                } else {
                    const { id, email, imageId, username, usernameCode, createdAt } = action.payload;
                    const user = {
                        id,
                        email,
                        imageId,
                        username,
                        usernameCode,
                        createdAt: moment(createdAt).format('DD.MM.YYYY.')
                    };
                    state.status = 'getUser-success';
                    state.user = user;
                };
            })
            .addCase(getPreviewUser.fulfilled, (state, action) => {
                const { id, email, imageId, username, usernameCode, createdAt } = action.payload;
                const user = {
                    id,
                    email,
                    imageId,
                    username,
                    usernameCode,
                    createdAt: moment(createdAt).format('DD.MM.YYYY.')
                };
                state.previewUser = user;
                state.status = 'getPreviewUser-success';
            })
            .addCase(setupUser.fulfilled, (state, action) => {
                if (action.payload === '') {
                    state.status = 'setup-success';
                };
            })
    }
});

export const { resetUser, resetStatus } = userSlice.actions;

export default userSlice.reducer;