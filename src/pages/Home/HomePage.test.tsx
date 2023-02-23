import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Home } from './HomePage';

describe('Home component', () => {
    let store: MockStoreEnhanced<unknown>;

    beforeEach(() => {
        const mockStore = configureStore([]);
        store = mockStore({});
    });

    it('should render the title and introduction', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('Welcome To StyleTech!')).toBeInTheDocument();
        expect(
            screen.getByText(
                '“Second hand products adapts for you” Clothing and technology'
            )
        ).toBeInTheDocument();
    });

    it('should navigate to /products when the button is clicked', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );
        const button = screen.getByRole('button', { name: /discover more/i });
        fireEvent.click(button);
    });
});
