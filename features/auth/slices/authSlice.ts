import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { ILoginBody, IRegisterBody, IResetPasswordBody } from '../interfaces';

interface IError {
    message: string;
    field: string;
};

interface IState {
    token: string | null;
    user: {
        id: string
    } | null,
    status: string;
    error: IError | null;
    registerPass: string;
    registerMail: string;
    resetPassCode: string;
    resetMail: string;
};

const initialState: IState = {
    token: null,
    user: null,
    status: '',
    error: null,
    registerPass: '',
    registerMail: '',
    resetPassCode: '',
    resetMail: ''
};

export const login = createAsyncThunk('auth/login', async (data: ILoginBody) => {
    const response = await authService.login(data);
    return response;
});

export const register = createAsyncThunk('auth/register', async (data: IRegisterBody) => {
    const response = await authService.register(data);
    return response;
});

export const requestResetPassword = createAsyncThunk('auth/requestResetPassword', async (email: string) => {
    const response = await authService.requestResetPassword(email);
    return response;
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data: IResetPasswordBody) => {
    const response = await authService.resetPassword(data);
    return response;
});

export const resendResetRequest = createAsyncThunk('auth/resendResetRequest', async (email: string) => {
    await authService.requestResetPassword(email);
    return;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        resetState(state) {
            state.token = null;
            state.user = null;
            state.status = '';
            state.error = null;
        },
        resetErrMSg(state) {
            state.error = null;
        },
        setRegisterData(state, action: PayloadAction<{ email: string, password: string }>) {
            const { email, password } = action.payload;
            state.registerMail = email;
            state.registerPass = password;
        },
        resetRegisterState(state) {
            state.status = '';
            state.error = null;
            state.registerMail = '';
            state.registerPass = '';
        },
        setResetPassCode(state, action: PayloadAction<string>) {
            state.resetPassCode = action.payload;
        },
        setResetMail(state, action: PayloadAction<string>) {
            state.resetMail = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.message) {
                    if (action.payload.message === 'Wrong password.') {
                        state.error = {
                            message: action.payload.message,
                            field: 'password'
                        };
                    } else {
                        state.error = {
                            message: action.payload.message,
                            field: 'email'
                        };
                    };
                    state.status = 'error';
                } else {
                    const { token, user } = action.payload;
                    state.token = token;
                    state.user = user;
                    state.status = 'login-success'
                }
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload.message) {
                    state.error = action.payload.message;
                    state.status = 'error';
                } else {
                    state.status = 'register-success';
                }
            })
            .addCase(requestResetPassword.fulfilled, (state, action) => {
                if (action.payload.message) {
                    state.error = action.payload.message;
                    state.status = 'error';
                } else if (action.payload === '') {
                    state.status = 'request-reset-success';
                }
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                if (action.payload.messsage) {

                } else if (action.payload === '') {
                    state.status = 'reset-pass-success';
                }
            })
    }
});

export const { setToken, resetState, resetErrMSg, setRegisterData, resetRegisterState, setResetPassCode, setResetMail } = authSlice.actions;
export default authSlice.reducer;