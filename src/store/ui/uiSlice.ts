import { createSlice } from '@reduxjs/toolkit';
import { UiData } from '../../interfaces/interfaces';

const uiDataInitialState: UiData = {
    isLoading: false,
};

const uiDataSlice = createSlice({
    name: 'uiData',
    initialState: uiDataInitialState,
    reducers: {
        openLoadingModal: (previousUiData: UiData) => ({
            ...previousUiData,
            isLoading: true,
        }),

        closeLoadingModal: (previousUiData: UiData) => ({
            ...previousUiData,
            isLoading: false,
        }),
    },
});

export const uiDataReducer = uiDataSlice.reducer;

export const {
    openLoadingModal: openLoadingModalActionCreator,
    closeLoadingModal: closeLoadingModalActionCreator,
} = uiDataSlice.actions;
