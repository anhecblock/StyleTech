import { screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import ArticleForm from './ArticleForm';

import { ToastContainer } from 'react-toastify';

describe('Article Form', () => {
    test('Should change input values on edit and submit form', async () => {
        renderWithProviders(
            <MemoryRouter>
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="light"
                />
                <ArticleForm />
            </MemoryRouter>,
            {
                preloadedState: {
                    user: { isLogged: true, uid: '123' },
                    articles: [],
                },
            }
        );

        // should change Title
        const nameField = screen.getByLabelText('Name');
        fireEvent.change(nameField, { target: { value: 'cap' } });
        expect(nameField).toHaveValue('cap');

        // should change image url
        const imageField = screen.getByLabelText('Image Url');
        fireEvent.change(imageField, {
            target: {
                value: 'https://www.tfasports.com/image/cache/catalog/products/GorraSnapbackNegraAmarillaBeechfield-1200x1200.jpg',
            },
        });
        expect(imageField).toHaveValue(
            'https://www.tfasports.com/image/cache/catalog/products/GorraSnapbackNegraAmarillaBeechfield-1200x1200.jpg'
        );

        // should change Description
        const descField = screen.getByLabelText('Description');
        fireEvent.change(descField, {
            target: { value: 'The best cap on the market' },
        });
        expect(descField).toHaveValue('The best cap on the market');

        // should change Price
        const priceField = screen.getByLabelText('Price');
        fireEvent.change(priceField, {
            target: { value: 100 },
        });
        expect(priceField).toHaveValue(100);

        // should change Cateogry
        const cateogryField = screen.getByLabelText('Cateogry');
        fireEvent.change(cateogryField, {
            target: { value: 'Clothing' },
        });
        expect(cateogryField).toHaveValue('Clothing');

        // should submit form with success
        fireEvent.click(screen.getByRole('button'));

        const toastText = await screen.findByText(
            /Articles created successfully/i
        );
        expect(toastText).toBeInTheDocument();
    });
});
