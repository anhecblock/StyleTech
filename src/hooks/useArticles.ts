import axios from 'axios';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ArticleFromDb, Product } from '../components/App/App';

import {
    deleteArticleByIdActionCreator,
    loadArticlesActionCreator,
} from '../store/articles/articlesSlice';
import {
    deleteFavouriteActionCreator,
    loadFavouritesActionCreator,
} from '../store/favouriteArticles/favouriteArticles';
import { toast } from 'react-toastify';
import {
    closeLoadingModalActionCreator,
    openLoadingModalActionCreator,
} from '../store/ui/uiSlice';

const apiUrl =
    'https://proyecto-final-bootcamp-18e38-default-rtdb.firebaseio.com/products.json';

const apiUrlDelete =
    'https://proyecto-final-bootcamp-18e38-default-rtdb.firebaseio.com/products/';
const publicApi = 'https://fakestoreapi.com/products';

export const useArticles = () => {
    const dispatch = useAppDispatch();
    const article = useAppSelector((state) => state.articles);

    const getData = useCallback(async () => {
        try {
            dispatch(openLoadingModalActionCreator());
            const { data } = await axios.get(publicApi);
            const firebaseResponse = await axios.get(apiUrl);
            dispatch(closeLoadingModalActionCreator());

            if (!firebaseResponse.data) {
                const products: ArticleFromDb[] = [];

                dispatch(
                    loadArticlesActionCreator({
                        public: data,
                        private: products as ArticleFromDb[],
                    })
                );

                if (article.length < 1) {
                    toast.success('Articles added');
                }
                throw new Error('Error with the data from firebase');
            }

            const products = Object.entries(firebaseResponse.data).map(
                (object) => ({
                    ...(object[1] as Product),
                    id: object[0],
                })
            );

            dispatch(
                loadArticlesActionCreator({
                    public: data,
                    private: products as ArticleFromDb[],
                })
            );
            if (article.length < 1) {
                toast.success('Articles added');
            }
        } catch (error) {
            toast.error('Articles not added');
        }
    }, [article.length, dispatch]);

    const createArticle = useCallback(
        async (author: string, article: Product) => {
            try {
                const articlefromDb: ArticleFromDb = {
                    ...article,
                    name: '',
                    autor: author,
                };

                const response = await axios.post(apiUrl, articlefromDb);

                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                toast.success('Articles created successfully');
                return true;
            } catch (error) {
                toast.error('Error with articles create');
                return false;
            }
        },
        []
    );

    const addFav = useCallback(async (article: Product, author: string) => {
        try {
            const articlefromDb: ArticleFromDb = {
                ...article,
                name: '',
                autor: `${author}`,
            };

            const response = await axios.post(apiUrl, articlefromDb);

            toast.success(response.statusText);
        } catch (error) {
            toast.error('error ');
        }
    }, []);

    const getFav = useCallback(
        async (autor: string) => {
            const { data } = await axios.get(apiUrl, {
                params: {
                    autor: autor,
                },
            });
            console.log(Object.entries(data));
            const favourites = Object.entries(data).map((object) => ({
                ...(object[1] as Product),
                id: object[0],
            }));
            dispatch(
                loadFavouritesActionCreator(favourites as ArticleFromDb[])
            );
        },
        [dispatch]
    );

    const deleteArticle = useCallback(
        async (id: string) => {
            try {
                const response = await axios.delete(
                    apiUrlDelete + id + '.json'
                );

                dispatch(deleteArticleByIdActionCreator(id));
                dispatch(deleteFavouriteActionCreator(id));
                toast.success(response.statusText);
            } catch (error) {
                toast.error('Error delete');
            }
        },
        [dispatch]
    );

    return { getData, getFav, createArticle, addFav, deleteArticle };
};
