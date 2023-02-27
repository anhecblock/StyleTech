import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { Product } from '../App/App';
import { Card } from './Card';

describe('Card component', () => {
    test('siuu', () => {
        const article: Product = {
            category: 'test category',
            description: 'test description',
            id: 'test id',
            image: 'test image',
            price: 0,
            title: 'test title',
        };

        renderWithProviders(<Card article={article}></Card>);

        const headingTitle = screen.getByRole('heading', {
            name: article.title,
        });
        const headingCategory = screen.getByRole('heading', {
            name: article.category,
        });

        const image = screen.getByRole('img');

        expect(headingTitle).toBeInTheDocument();
        expect(headingCategory).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });
});
