export interface ILoginBody {
    email: string;
    password: string;
};

export interface IRegisterBody extends ILoginBody {
    confirmPassword: string;
};

export interface IResetPasswordBody {
    code: string;
    newPassword: string;
};