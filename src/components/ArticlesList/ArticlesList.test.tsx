import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { articulos } from '../../utils/utils';
import ArticlesList from './ArticlesList';

describe('ArticlesList', () => {
    test('articlesList', () => {
        renderWithProviders(<ArticlesList />, {
            preloadedState: { articles: articulos },
        });

        const expectedList = screen.getAllByRole('listitem');

        expect(expectedList.length).toBe(articulos.length);
    });
});
