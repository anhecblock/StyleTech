import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUserActionCreator } from '../store/user/userSlice';
import useUser from './useUser';
import { toast } from 'react-toastify';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('useUser hook', () => {
    const dispatch = jest.fn();
    const toastSuccessSpy = jest.spyOn(toast, 'success');
    const toastErrorSpy = jest.spyOn(toast, 'error');

    beforeEach(() => {
        (useDispatch as jest.Mock).mockReturnValue(dispatch);
        dispatch.mockClear();
        toastSuccessSpy.mockClear();
        toastErrorSpy.mockClear();
    });

    it('should log out user successfully', async () => {
        const { result } = renderHook(() => useUser());

        await result.current.logoutUser();

        expect(dispatch).toHaveBeenCalledWith(logOutUserActionCreator());
        expect(toastSuccessSpy).toHaveBeenCalledWith('Logged out.');
        expect(toastErrorSpy).not.toHaveBeenCalled();
        expect(useNavigate).toHaveBeenCalled();
    });

    it('should handle error with log out', async () => {
        dispatch.mockImplementation(() => {
            throw new Error('Something went wrong');
        });

        const { result } = renderHook(() => useUser());

        await result.current.logoutUser();

        expect(dispatch).toHaveBeenCalledWith(logOutUserActionCreator());
        expect(toastErrorSpy).toHaveBeenCalledWith('Error with the log out.');
        expect(toastSuccessSpy).not.toHaveBeenCalled();
        expect(useNavigate).toHaveBeenCalled();
    });
});
