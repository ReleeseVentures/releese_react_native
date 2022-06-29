import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { ITag } from '../../../interfaces/ITag';

interface IState {
    tags: ITag[] | [];
};

const initialState: IState = {
    tags: []
};

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setTags(state, action: PayloadAction<ITag[]>) {
            state.tags = action.payload;
        },
        setTagSelected(state, action: PayloadAction<string>) {
            state.tags.forEach(tag => {
                if (tag.id === action.payload) {
                    tag.isActive = !tag.isActive;
                };
            })
        }
    }
});

export const { setTags, setTagSelected } = onboardingSlice.actions;
export default onboardingSlice.reducer;