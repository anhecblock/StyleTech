import React from 'react';
import ReactDOM from 'react-dom/client';
import SignUpComponent from './components/SignUpComponent/SignUpComponent';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <SignUpComponent />
    </React.StrictMode>
);
