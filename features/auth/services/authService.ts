import { BaseService } from '../../../app/baseService';
import { ILoginBody, IRegisterBody, IResetPasswordBody } from '../interfaces';

class AuthService extends BaseService {
    private url: string;

    constructor() {
        super();
        this.url = '/membership';
    };

    login = async (data: ILoginBody) => {
        const url = `${this.url}/login`;
        return await super.put(url, data);
    };

    register = async (data: IRegisterBody) => {
        const url = `${this.url}/register`;
        return await super.post(url, data);
    };

    requestResetPassword = async (email: string) => {
        const url = `${this.url}/request-reset-password`;
        return await super.post(url, { email });
    };

    resetPassword = async (data: IResetPasswordBody) => {
        const url = `${this.url}/reset-password`;
        return await super.put(url, data);
    };
};

const authService = new AuthService();

export default authService;