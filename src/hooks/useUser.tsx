import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../app/hooks';
import { auth } from '../firebase/firebase';
import {
    LoggedUser,
    loginUserActionCreator,
    logOutUserActionCreator,
} from '../store/user/userSlice';

const useUser = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userLogin = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user: LoggedUser = {
                ...userCredential.user,
                isLogged: false,
            };
            const token = await auth.currentUser?.getIdToken();

            dispatch(loginUserActionCreator(user));
            toast.success('Logged in.');
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            localStorage.setItem('token', token!);
            navigate('/products');
        } catch (error) {}
    };

    const userRegister = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            toast.success('Successful registration');
            console.log('usuario registrado', user);
            navigate('/login');
        } catch (error) {}
    };

    const logoutUser = useCallback(async () => {
        try {
            dispatch(logOutUserActionCreator());
            toast.success('Logged out.');
        } catch (error) {
            toast.error('Error with the log out.');
        }
    }, [dispatch]);

    return { userLogin, userRegister, logoutUser };
};

export default useUser;
