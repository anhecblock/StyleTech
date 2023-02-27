import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import Register from './register';

// Mocked react router dom
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    createUserWithEmailAndPassword: (
        auth: unknown,
        email: string,
        password: string
    ) => {
        return Promise.resolve(mockUser);
    },
}));

describe('Register', () => {
    test('Render required text', () => {
        renderWithProviders(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        expect(screen.getAllByText('Login')).toHaveLength(1);
        expect(
            screen.getByPlaceholderText('Enter your email')
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Enter your password')
        ).toBeInTheDocument();
    });

    test('should register user', async () => {
        renderWithProviders(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
            target: { value: 'absm_ilici@hotmail.com' },
        });

        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
        });
    });
});

const mockUser = {
    user: 'absm_ilici@hotmail.com',
};
