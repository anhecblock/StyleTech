import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../Interfaces/interfaces';
import { initialArticle } from '../../Utils/utils';

const articleSlice = createSlice({
    name: 'article',
    initialState: [initialArticle],
    reducers: {
        loadArticles: (previousState, action: PayloadAction<Product[]>) =>
            action.payload,

        deleteArticles: (previousState) => [],
    },
});

export const articleReducer = articleSlice.reducer;

export const {
    loadArticles: loadArticlesActionCreator,
    deleteArticles: deleteArticlesActionCreator,
} = articleSlice.actions;
