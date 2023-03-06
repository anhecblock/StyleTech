import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import { LoginPage } from './LoginPage';

describe('Given a component LoginPage', () => {
    describe('When rendered', () => {
        test("Then it must show a heading withe the title 'Login'", () => {
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <LoginPage />
                    </Provider>
                </BrowserRouter>
            );

            const receivedHeading = screen.getByRole('heading', {
                name: 'Login',
            });

            expect(receivedHeading).toBeInTheDocument();
        });
    });
});
