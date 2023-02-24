import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import { Products } from './Products';

describe('Given a component Products', () => {
    describe('When rendered', () => {
        test("Then it should show a heading with the text 'List of Products'", () => {
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <Products />
                    </Provider>
                </BrowserRouter>
            );

            const expectedHeading = screen.getByRole('heading', {
                name: 'LIST OF PRODUCTS',
            });

            expect(expectedHeading).toBeInTheDocument();
        });
    });
});
