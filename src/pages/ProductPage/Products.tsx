import { useEffect } from 'react';
import ArticlesList from '../../components/ArticlesList/ArticlesList';

import { useArticles } from '../../hooks/useArticles';

import './Products.css';

export const Products = () => {
    const { getData } = useArticles();
    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, [getData]);

    return (
        <div className="articles">
            <h1> LIST OF PRODUCTS</h1>
            <ArticlesList />
        </div>
    );
};
