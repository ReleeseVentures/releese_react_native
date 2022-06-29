import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import {
persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER
} from 'redux-persist';
import authReducer from '../features/auth/slices/authSlice';
import onboardingReducer from '../features/onboarding/slices/onboardingSlice';
import avatarsReducer from '../slices/avatarsSlice';
import userReducer from '../slices/userSlice';
import postsReducer from '../slices/postsSlice';
import categoryReducer from '../slices/categorySlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    onboarding: onboardingReducer,
    avatars: avatarsReducer,
    user: userReducer,
    posts: postsReducer,
    categories: categoryReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;