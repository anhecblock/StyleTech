import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { Login } from './login';

// Mocked react router dom
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    signInWithEmailAndPassword: (
        auth: unknown,
        email: string,
        password: string
    ) => {
        return Promise.resolve(mockUser);
    },
}));

describe('Login', () => {
    test('Render required text', () => {
        renderWithProviders(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        expect(screen.getAllByText('Login')).toHaveLength(2);
        expect(
            screen.getByPlaceholderText('Enter your email')
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Enter your password')
        ).toBeInTheDocument();
    });

    test('should login user', async () => {
        renderWithProviders(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
            target: { value: 'abs.ilici@gmail.com' },
        });

        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/products');
        });
    });
});

const mockUser = {
    user: {
        uid: 'Y4ItE1Y7FYOZcD4Fj9tuSrGKfAT2',
        email: 'abs.ilici@gmail.com',
        emailVerified: false,
        isAnonymous: false,
        providerData: [
            {
                providerId: 'password',
                uid: 'abs.ilici@gmail.com',
                displayName: null,
                email: 'abs.ilici@gmail.com',
                phoneNumber: null,
                photoURL: null,
            },
        ],
        stsTokenManager: {
            refreshToken:
                'APJWN8dxmESzzkaxFwy4oH0joOsQABcA8OPYcg5Quhz3PAb4N4_A_YTeY8rYTiNNk9XJkBGPIrT9K3hhNRhl2PgqmYZ9dmm0U9Sz14Bln4lfETnuvW562WaxuJcc0bhy0crwXV4c8IrOxKUe8Y1Px9BxTaOwwewnFOXpDxgvkutsTTsA02fQaPPXf52rQvQqqSLvtPQBOj2SA6b08EDnlxZEHPGuDKEKjoakQuKZ0HJ_UT2cVYw64sog37V-_mcAlzWI_r9wdCiE',
            accessToken:
                'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1YzJiNDBhYTJmMzIyNzk4NjY2YTZiMzMyYWFhMDNhNjc3MzAxOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJveWVjdG8tZmluYWwtYm9vdGNhbXAtMThlMzgiLCJhdWQiOiJwcm95ZWN0by1maW5hbC1ib290Y2FtcC0xOGUzOCIsImF1dGhfdGltZSI6MTY3Njk2ODkwNywidXNlcl9pZCI6ImR5N2lVbkpaUllOZTBwYk9SUmlvdzV5RUkzdzIiLCJzdWIiOiJkeTdpVW5KWlJZTmUwcGJPUlJpb3c1eUVJM3cyIiwiaWF0IjoxNjc2OTY4OTA3LCJleHAiOjE2NzY5NzI1MDcsImVtYWlsIjoiYWxpX2toYW44N0BsaXZlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbGlfa2hhbjg3QGxpdmUuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.vurcDQ8J3SHnAfZ3C_d_FVua0AeLNmdt1ynbIGkrLAQUNUsgABn9WtrWkgZ1cyJ86C9np810pj1B_S0ubG4SpoOS1kaTra44ho6JSMOacz-U7L2yc-LYO1GmtBvLIAFf6ny4AczWqICvQZsgs2qVNdWkq_jYZKvxB844CsRVfVroyXaYWFKWUD7jkiti8BkMv_Ikd8O15DOMy-DKS1v83Ch_6JgLKTT5FXaV7oy39WuVKrGeL-bhMqXLLnYqxSqrzlPH5jGHNkYq9rTg8aOFFv9eGVBHJQiyllwaidgFIJg5N2FHS0EOSAeaATAoinKuMBMEvcm9o9PchvLHIc1JYg',
            expirationTime: 1676972508324,
        },
        createdAt: '1676957523695',
        lastLoginAt: '1676968804978',
        apiKey: process.env.REACT_APP_APIKEY,
        appName: '[DEFAULT]',
    },
    providerId: null,
    _tokenResponse: {
        kind: 'identitytoolkit#VerifyPasswordResponse',
        localId: 'Y4ItE1Y7FYOZcD4Fj9tuSrGKfAT2',
        email: 'abs.ilici@gmail.com',
        displayName: '',
        idToken:
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1YzJiNDBhYTJmMzIyNzk4NjY2YTZiMzMyYWFhMDNhNjc3MzAxOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJveWVjdG8tZmluYWwtYm9vdGNhbXAtMThlMzgiLCJhdWQiOiJwcm95ZWN0by1maW5hbC1ib290Y2FtcC0xOGUzOCIsImF1dGhfdGltZSI6MTY3Njk2ODkwNywidXNlcl9pZCI6ImR5N2lVbkpaUllOZTBwYk9SUmlvdzV5RUkzdzIiLCJzdWIiOiJkeTdpVW5KWlJZTmUwcGJPUlJpb3c1eUVJM3cyIiwiaWF0IjoxNjc2OTY4OTA3LCJleHAiOjE2NzY5NzI1MDcsImVtYWlsIjoiYWxpX2toYW44N0BsaXZlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbGlfa2hhbjg3QGxpdmUuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.vurcDQ8J3SHnAfZ3C_d_FVua0AeLNmdt1ynbIGkrLAQUNUsgABn9WtrWkgZ1cyJ86C9np810pj1B_S0ubG4SpoOS1kaTra44ho6JSMOacz-U7L2yc-LYO1GmtBvLIAFf6ny4AczWqICvQZsgs2qVNdWkq_jYZKvxB844CsRVfVroyXaYWFKWUD7jkiti8BkMv_Ikd8O15DOMy-DKS1v83Ch_6JgLKTT5FXaV7oy39WuVKrGeL-bhMqXLLnYqxSqrzlPH5jGHNkYq9rTg8aOFFv9eGVBHJQiyllwaidgFIJg5N2FHS0EOSAeaATAoinKuMBMEvcm9o9PchvLHIc1JYg',
        registered: true,
        refreshToken:
            'APJWN8dxmESzzkaxFwy4oH0joOsQABcA8OPYcg5Quhz3PAb4N4_A_YTeY8rYTiNNk9XJkBGPIrT9K3hhNRhl2PgqmYZ9dmm0U9Sz14Bln4lfETnuvW562WaxuJcc0bhy0crwXV4c8IrOxKUe8Y1Px9BxTaOwwewnFOXpDxgvkutsTTsA02fQaPPXf52rQvQqqSLvtPQBOj2SA6b08EDnlxZEHPGuDKEKjoakQuKZ0HJ_UT2cVYw64sog37V-_mcAlzWI_r9wdCiE',
        expiresIn: '3600',
    },
    operationType: 'signIn',
};
