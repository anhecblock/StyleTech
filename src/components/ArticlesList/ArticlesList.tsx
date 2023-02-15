import { useAppSelector } from '../../app/hooks';
import { Card } from '../card/Card';
import './ArticlesList.css';

const ArticlesList = (): JSX.Element => {
    const articles = useAppSelector((state) => state.articles);
    return (
        <ul className="card-list">
            {articles.map((article) => (
                <li key={article.id}>
                    <Card article={article} />
                </li>
            ))}
        </ul>
    );
};

export default ArticlesList;
