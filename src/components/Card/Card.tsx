import { useAppSelector } from '../../app/hooks';
import { useArticles } from '../../hooks/useArticles';
import { ArticleFromDb, Product } from '../App/App';

import './Card.css';

interface CardProps {
    article: Product | ArticleFromDb;
}

export const Card = ({ article }: CardProps): JSX.Element => {
    const { isLogged, uid } = useAppSelector((state) => state.user);
    const { deleteArticle } = useArticles();

    return (
        <div className="card">
            <div className="product-image">
                <img src={article.image} alt="" />
            </div>
            <div className="product-info">
                <h4>{article.title}</h4>
                <h4>{article.category} </h4>
                <h4>{article.price} $</h4>
            </div>

            {isLogged && (
                <div className="button-container">
                    {(article as ArticleFromDb).autor === uid && (
                        <button
                            className="button-container__delete"
                            onClick={async () => deleteArticle(article.id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
