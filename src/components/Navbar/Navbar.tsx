import { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-center .png';
import { useAppSelector } from '../../app/hooks';
import useUser from '../../hooks/useUser';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { isLogged } = useAppSelector((state) => state.user);
    const { logoutUser } = useUser();

    return (
        <div className="Navbar">
            <span className="nav-logo">
                <img src={logo} alt="logo"></img>
            </span>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`nav-items ${isOpen && 'open'}`}
            >
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                {isLogged && (
                    <>
                        <NavLink to="/create">Create</NavLink>
                        <NavLink to="/myarticles">My articles</NavLink>
                        <NavLink to={'/home'} onClick={logoutUser}>
                            Logout{' '}
                        </NavLink>
                    </>
                )}
                {!isLogged && (
                    <button className="login-button">
                        <NavLink className="nav-login" to="/login">
                            Login
                        </NavLink>
                    </button>
                )}
            </div>
            <div
                className={`nav-toggle ${isOpen && 'open'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="bar"></div>
            </div>
        </div>
    );
};
