import { useEffect } from 'react';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import { useArticles } from '../../Hooks/useArticles';

import './Products.css';

const apiUrl = 'https://fakestoreapi.com/products';

export const Products = () => {
    const { getData } = useArticles();
    useEffect(() => {
        (async () => {
            await getData(apiUrl);
        })();
    }, [getData]);

    return (
        <div className="articles">
            <h1> LIST OF PRODUCTS</h1>
            <ArticlesList />
        </div>
    );
};
