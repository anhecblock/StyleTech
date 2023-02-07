import React from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import './App.css';

export const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to={'/home'} />} />
                <Route path="/home" element={<h1>Home</h1>} />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/register" element={<h1>Register</h1>} />
                <Route
                    path="*"
                    element={
                        <div>
                            <h1>Página no encontrada</h1>{' '}
                            <NavLink to={'/'}>Go Home</NavLink>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
};
