import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService';
import { ICategory } from '../interfaces/ICategory';

interface IState {
    categories: ICategory[] | [];
    userCategories: string[] | [];
};

const initialState: IState = {
    categories: [],
    userCategories: []
};

export const getAllCategories = createAsyncThunk('categories/getAllCategories', async () => {
    const response = await categoryService.getAllCategories();
    return response;
});

export const getUserCategories = createAsyncThunk('categories/getUserCategories', async () => {
    const response = await categoryService.getUserCategories();
    return response;
});

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategories(state, action: PayloadAction<string>) {
            let newCategoriesArr = [...state.userCategories];
            if (state.userCategories.some(cat => cat === action.payload)) {
                const index = newCategoriesArr.indexOf(action.payload);
                newCategoriesArr.splice(index, 1);
            } else {
                newCategoriesArr.push(action.payload);
            };
            state.userCategories = newCategoriesArr;
        },
        resetState(state) {
            state.categories = [];
            state.userCategories = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
                state.categories = action.payload
            })
            .addCase(getUserCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.userCategories = action.payload;
            })
    }
});

export const { setSelectedCategories, resetState } = categorySlice.actions;
export default categorySlice.reducer;