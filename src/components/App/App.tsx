import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Navbar } from '../Navbar/Navbar';
import Register from '../register/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Home } from '../../pages/Home/HomePage';
import { Products } from '../../pages/ProductPage/Products';
import ArticleForm from '../../components/Form/ArticleForm';

import { useAppSelector } from '../../app/hooks';
import Loader from '../Navbar/loader/Loader';
import { MyArticlesPage } from '../../pages/MyArticlesPage/MyArticles';

export interface Product {
    id: string;
    image: string;
    title: string;
    description: string;
    category: string;
    price: number;
}

export interface ArticleFromDb extends Product {
    name: string;
    autor: string;
}

export const App = () => {
    const { isLoading } = useAppSelector((state) => state.ui);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
            />
            {isLoading && <Loader />}

            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to={'/home'} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/create" element={<ArticleForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/myarticles" element={<MyArticlesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};
