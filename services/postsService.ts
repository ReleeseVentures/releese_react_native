import { BaseService } from '../app/baseService';
import { ICreatePostBody } from '../slices/postsSlice';

class PostsService extends BaseService {
    private url: string;

    constructor() {
        super();
        this.url = '/post';
    };

    getAllPosts = async () => {
        return await super.get(this.url);
    };

    getUserPosts = async (id: string) => {
        const url = `${this.url}/${id}`
        return await super.get(url);
    };

    getUserPostsNumber = async (id: string) => {
        const url = `${this.url}/number/${id}`;
        return await super.get(url);
    };

    createPost = async (data: ICreatePostBody) => {
        return await super.post(this.url, data);
    };

    getPostsByCategory = async (id: string) => {
        const url = `${this.url}/searchByCategory/${id}`;
        return await super.get(url);
    };

    searchPosts = async (search: string) => {
        const url = `${this.url}/searchByTitle`;
        const body = {
            title: search
        };
        return await super.post(url, body);
    };

    postLike = async (id:string) => {
        const url = `${this.url}/like/${id}`;
        return await super.put(url, {});
    };

    getAllUserPostLikes = async (id:string) => {
        const url = `${this.url}/userLikes/${id}`;
        return await super.get(url);
    };

    deletePost = async (id: string) => {
        const url = `${this.url}/${id}`;
        return await super.delete(url);
    };
};

const postsService = new PostsService();

export default postsService;