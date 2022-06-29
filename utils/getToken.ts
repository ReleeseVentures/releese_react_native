import { store, RootState } from '../app/store';

export function getToken() {
    const state = store.getState();
    return state.auth.token;
};