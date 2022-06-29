import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import avatarsService from '../services/avatarsService';
import { RootState } from '../app/store';

export interface IAvatar {
    id: string;
    fileName: string;
};

interface IState {
    avatars: IAvatar[];
    selectedAvatar: string | null;
};

export const avatars = [
    {
        id: 'fee3ca53-1a01-484b-9d34-ee4b13aed76d',
        fileName: 'user01a'
    },
    {
        id: '50045335-e50c-4cad-aaf7-c6b7b81c0732',
        fileName: 'user01b'
    },
    {
        id: 'faedf0ba-6c20-4c12-a8a4-d4e6a3df6e9e',
        fileName: 'user01c'
    },
    {
        id: '03d4e807-c788-44ca-abf1-52ee51485b20',
        fileName: 'user02a'
    },
    {
        id: '804e1be5-7ba5-4244-ba90-bab8774d1c9f',
        fileName: 'user02b'
    },
    {
        id: 'ffc4437f-bf3a-4649-aa66-a3278afeab34',
        fileName: 'user02c'
    },
    {
        id: 'a14b7ad8-b2d8-463e-b1bf-2cd28e545739',
        fileName: 'user03a'
    },
    {
        id: 'c105d14c-7aaf-4e08-8dac-0a19eb07f74c',
        fileName: 'user03b'
    },
    {
        id: '6c3bb84d-65d5-443e-92c8-2aacad76521e',
        fileName: 'user03c'
    },
    {
        id: '88cf5a02-f1ae-49d6-964d-e5108f21013f',
        fileName: 'user05a'
    },
    {
        id: '0fd89f40-c90c-457d-b959-7ff654fd37a6',
        fileName: 'user05b'
    },
    {
        id: '7229d6a3-7d8d-4f53-b463-f05b66ef8f1c',
        fileName: 'user05c'
    },
    {
        id: '9b64dc73-bd8e-4435-8080-5b77782b60f0',
        fileName: 'user06a'
    },
    {
        id: '61e5e57a-377b-472e-aade-065a2a6db94f',
        fileName: 'user06b'
    },
    {
        id: 'b8c9a656-e7bb-4998-8970-6e1516d04421',
        fileName: 'user06c'
    },
    {
        id: 'a3ef0af8-c526-4eea-b1da-8d74b5e32283',
        fileName: 'user07a'
    },
    {
        id: '839b29ad-7b3d-4af8-8b35-3fe37d22521d',
        fileName: 'user07b'
    },
    {
        id: 'ff07f019-ac78-43f9-b2e7-d94d711ca339',
        fileName: 'user07c'
    }
];

const initialState: IState = {
    avatars: avatars,
    selectedAvatar: null
};

const selectAllAvatars = (state: RootState) => state.avatars.avatars;

export const selectAvatarByUser = createSelector(
    [selectAllAvatars, (state: any, avatarId: string) => avatarId],
    (avatars, avatarId) => avatars.find(avatar => avatar.id === avatarId)
);

export const avatarsSlice = createSlice({
    name: 'avatars',
    initialState,
    reducers: {
        selectAvatar(state, action: PayloadAction<string>) {
            state.selectedAvatar = action.payload;
        },
        resetSelectedAvatar(state) {
            state.selectedAvatar = null;
        },
        setAvatars(state, action: PayloadAction<IAvatar[]>) {
            state.avatars = action.payload;
        }
    }
});

export const { selectAvatar, resetSelectedAvatar, setAvatars } = avatarsSlice.actions;

export default avatarsSlice.reducer;