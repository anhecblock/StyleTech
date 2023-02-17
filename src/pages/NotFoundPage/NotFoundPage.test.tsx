import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import { NotFoundPage } from './NotFoundPage';

describe('Given a NotfFoundComponent function', () => {
    describe('when the page is rendered', () => {
        beforeEach(() => {
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <NotFoundPage />
                    </Provider>
                </BrowserRouter>
            );
        });

        it('should display the error image', () => {
            const errorImage = screen.getByAltText(/error/i);
            expect(errorImage).toBeInTheDocument();
        });

        it('should display the error message', () => {
            const errorMessage = screen.getByText(/PAGE NOT FOUND/i);
            expect(errorMessage).toBeInTheDocument();
        });

        it('should display the "Go Home" link with the correct URL', () => {
            const goHomeLink = screen.getByRole('link', { name: /go home/i });
            expect(goHomeLink).toHaveAttribute('href', '/home');
        });
    });
});
