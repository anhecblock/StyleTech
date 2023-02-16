import FavouritesList from '../../components/favouritesList/Favourites';
import './MyArticlesPage.css';

export const MyArticlesPage = () => {
    return (
        <div className="Myarticles">
            <h1> My Articles</h1>
            <FavouritesList />
        </div>
    );
};
