import axios from 'axios';
import { useCallback } from 'react';
import { useAppDispatch } from '../app/hooks';
import { loadArticlesActionCreator } from '../store/articles/articlesSlice';

export const useArticles = () => {
    const dispatch = useAppDispatch();
    const getData = useCallback(
        async (url: string) => {
            try {
                const response = await axios.get(url);

                dispatch(loadArticlesActionCreator(response.data));
            } catch (error) {}
        },
        [dispatch]
    );

    return { getData };
};
