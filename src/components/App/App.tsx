import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../Login/login';
import { Navbar } from '../Navbar/Navbar';
import Register from '../Register/register';
import { Products } from '../../pages/Products';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Home } from '../../pages/Home/HomePage';

export interface Product {
    id: string;
    image: string;
    title: string;
    description: string;
    category: string;
    price: number;
}

export const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to={'/home'} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};
