import {
    combineReducers,
    configureStore,
    PreloadedState,
} from '@reduxjs/toolkit';
import { articleReducer } from '../store/articles/articlesSlice';
import { favouriteReducer } from '../store/favouriteArticles/favouriteArticles';
import { uiDataReducer } from '../store/ui/uiSlice';
import { userReducer } from '../store/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        articles: articleReducer,
        favourites: favouriteReducer,
        ui: uiDataReducer,
    },
});

export const rootReducer = combineReducers({
    user: userReducer,
    articles: articleReducer,
    favourites: favouriteReducer,
    ui: uiDataReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type ReducerState = ReturnType<typeof rootReducer>;
