import { UiData } from '../../interfaces/interfaces';
import {
    closeLoadingModalActionCreator,
    openLoadingModalActionCreator,
    uiDataReducer,
} from './uiSlice';

describe('Given a uiReducer function', () => {
    describe("When is called with an action type 'ui/openLoadingModal' and a payload with true", () => {
        test('Then it should set to true the modal', () => {
            const modal: UiData = {
                isLoading: false,
            };

            const action = openLoadingModalActionCreator();

            const loading = uiDataReducer(modal, action);

            expect(loading.isLoading).toBe(true);
        });
    });

    describe("When is called with an action type 'ui/closeLoadingModal' and a payload with false", () => {
        test('Then it should set to true the modal', () => {
            const modal: UiData = {
                isLoading: true,
            };

            const action = closeLoadingModalActionCreator();

            const loading = uiDataReducer(modal, action);

            expect(loading.isLoading).toBe(false);
        });
    });
});
