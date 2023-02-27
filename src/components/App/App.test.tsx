import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { App } from './App';

describe('App component', () => {
    describe('when isLoading is false', () => {
        it('renders the header', () => {
            renderWithProviders(
                <BrowserRouter>
                    <App />
                </BrowserRouter>,
                {
                    preloadedState: { ui: { isLoading: false } },
                }
            );
            const headerElement = screen.getByRole('heading', {
                name: 'Welcome To StyleTech!',
            });
            expect(headerElement).toBeInTheDocument();
        });
    });

    describe('when isLoading is true', () => {
        it('renders the loader', () => {
            renderWithProviders(
                <BrowserRouter>
                    <App />
                </BrowserRouter>,
                {
                    preloadedState: { ui: { isLoading: true } },
                }
            );
            const loaderElement = screen.getByTestId('spinner');
            expect(loaderElement).toBeInTheDocument();
        });
    });
});
