import { useAppSelector } from '../../app/hooks';
import { Product } from '../../Interfaces/interfaces';

import './Card.css';

interface CardProps {
    article: Product;
}

export const Card = ({ article }: CardProps): JSX.Element => {
    const { isLogged } = useAppSelector((state) => state.user);
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
                    <button>Añadir</button>
                    <button>Eliminar</button>
                    <button>Editar</button>
                </div>
            )}
        </div>
    );
};
