import {
    Navigate,
    NavLink,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Login } from './components/login/login';
import Register from './components/register/register';
import { logOutUserActionCreator } from './store/user/userSlice';

export const App = () => {
    const { email } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <Routes>
            <Route path="/" element={<Navigate to={'/home'} />} />
            <Route
                path="/home"
                element={
                    <div>
                        <h1>Home</h1>
                        {<span>{email ? `User: ${email}` : 'No logged'}</span>}
                        {email ? (
                            <button
                                onClick={() =>
                                    dispatch(logOutUserActionCreator())
                                }
                            >
                                logout
                            </button>
                        ) : (
                            <button onClick={() => navigate('/login')}>
                                login
                            </button>
                        )}
                    </div>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="*"
                element={
                    <div>
                        <h1>Página no encontrada</h1>{' '}
                        <NavLink to={'/'}>Go Home</NavLink>
                    </div>
                }
            />
        </Routes>
    );
};
