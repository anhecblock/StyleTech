import { useNavigate } from 'react-router-dom';
import logoHome from '../../assets/fondo.jpeg';
import './HomePage.css';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <img className="fondo" src={logoHome} alt=" screen" width={300} />
            <h1 className="title">Welcome To StyleTech!</h1>
            <h2 className="intro">
                “Second hand products adapts for you” Clothing and technology
            </h2>
            <button className="btn" onClick={() => navigate('/products')}>
                Discover More
            </button>
        </div>
    );
};
