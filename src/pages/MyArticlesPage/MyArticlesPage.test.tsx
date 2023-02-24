import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import { MyArticlesPage } from './MyArticles';

describe('Given a component MyArticles', () => {
    describe('When rendered', () => {
        test("Then it should show a heading with the text 'My Articles'", () => {
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <MyArticlesPage />
                    </Provider>
                </BrowserRouter>
            );

            const expectedHeading = screen.getByRole('heading', {
                name: 'My Articles',
            });

            expect(expectedHeading).toBeInTheDocument();
        });
    });
});
