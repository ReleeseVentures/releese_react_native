import { BaseService } from '../app/baseService';

class CategoryService extends BaseService {
    private url: string;

    constructor() {
        super();
        this.url = '/category';
    };

    getAllCategories = async () => {
        return await super.get(this.url);
    };

    getUserCategories = async () => {
        const url = `${this.url}/user`;
        return await super.get(url);
    };
};

const categoryService = new CategoryService();

export default categoryService;