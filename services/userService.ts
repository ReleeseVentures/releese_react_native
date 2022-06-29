import { BaseService } from '../app/baseService';
import { ISendUsernameProps, ISendUserAvatarProps, ISetupUserBody } from '../slices/userSlice';
class UserService extends BaseService {
    private url: string;

    constructor() {
        super();
        this.url = '/user';
    };

    getUser = async (userId: string) => {
        const url = `${this.url}/${userId}`;
        return await super.get(url);
    };

    sendUsername = async (data: ISendUsernameProps) => {
        const { userId, username } = data;
        const url = `${this.url}/${userId}/username`;
        return await super.put(url, { username: username });
    };

    sendUserAvatar = async (data: ISendUserAvatarProps) => {
        const { userId, imageId } = data;
        const url = `${this.url}/${userId}/image`;
        return await super.put(url, { imageId: imageId });
    };

    setupUser = async (data: ISetupUserBody) => {
        const { username, imageId, category, userId } = data;
        const dataToSend = {
            username,
            imageId,
            category
        };
        const url = `${this.url}/${userId}/setupUser`;
        return await super.put(url, dataToSend);
    };

    updateUserCategories = async (data: string[], id: string) => {
        const url = `${this.url}/${id}/category`;
        return await super.put(url, { category: data });
    };
};

const userService = new UserService();

export default userService;