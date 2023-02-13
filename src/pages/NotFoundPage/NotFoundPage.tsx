import { NavLink } from 'react-router-dom';
import './NotFoundPage.css';
import error from '../../assets/error.svg';

export const NotFoundPage = () => {
    return (
        <div className="errorPage">
            <img src={error} alt="error" width={300} />
            <h2 className="title">PAGE NOT FOUND</h2>
            <NavLink to={'/home'}>Go Home</NavLink>
        </div>
    );
};
