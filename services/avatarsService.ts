import { BaseService } from '../app/baseService';

class AvatarsService extends BaseService {
    private url: string;

    constructor() {
        super();
        this.url = '/image';
    };

    getAvatars = async () => {
        return await super.get(this.url);
    };
};

const avatarsService = new AvatarsService();

export default avatarsService;