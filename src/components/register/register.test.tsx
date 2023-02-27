import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Register from './register';
import { store } from '../../app/store';

describe('Register component', () => {
    test('should register user on button click', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Provider>
        );

        const email = screen.getByLabelText('Email') as HTMLInputElement;
        const password = screen.getByLabelText('Password') as HTMLInputElement;

        fireEvent.change(email, { target: { value: 'test@test.com' } });
        fireEvent.change(password, { target: { value: 'password' } });
    });
});
