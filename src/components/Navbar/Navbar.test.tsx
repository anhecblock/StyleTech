import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { Navbar } from './Navbar';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Navbar', () => {
    test('Should show sigin when logged out', () => {
        renderWithProviders(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('Should show Products, Create, My ArticlesLogout when already loggedin', () => {
        renderWithProviders(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
            {
                preloadedState: {
                    user: { isLogged: true },
                    articles: [],
                },
            }
        );
        expect(screen.getByText('Create')).toBeInTheDocument();
        expect(screen.getByText('My articles')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('Should add open class when clicked', () => {
        renderWithProviders(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
            {
                preloadedState: {
                    user: { isLogged: true },
                    articles: [],
                },
            }
        );

        const navContainer = screen.getByTestId('nav-container');

        expect(navContainer).toHaveClass('false');

        fireEvent.click(navContainer);

        expect(navContainer).toHaveClass('open');
    });

    test('Should add open class when clicked on bar container', () => {
        renderWithProviders(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
            {
                preloadedState: {
                    user: { isLogged: true },
                    articles: [],
                },
            }
        );

        const navContainer = screen.getByTestId('nav-toggle-container');

        expect(navContainer).toHaveClass('false');

        fireEvent.click(navContainer);

        expect(navContainer).toHaveClass('open');
    });
});
