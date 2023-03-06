import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
    it('renders the spinner', () => {
        render(<Loader />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });
});
