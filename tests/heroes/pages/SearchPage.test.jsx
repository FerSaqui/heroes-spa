import { screen, render } from '@testing-library/react'
import { SearchPage } from '../../../src/heroes/pages/SearchPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';

jest.mock('query-string', () => ({
    parse: jest.fn(() => ({ q: 'batman' })), //Especificar los query params
    stringify: jest.fn()
    // Add other methods you need to mock here
}));

describe('pruebas en <SearchPage />', () => {
    const contextValue = {
        logged: true,
        user: {
            id: 1,
            name: 'Juan Carlos',
        },
        logout: jest.fn(),
    };

    const routesConfig = [
        {
            path: '/search',
            element: <SearchPage />,
        }
    ];

    const router = createMemoryRouter(routesConfig, {
        initialEntries: ['/search'],
    });
     
    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        );

        expect( container ).toMatchSnapshot();
    });

    test('Debe de mostrar Batman y el input con el valor del queryString', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        );

        const inputValue = screen.getByRole("textbox");
        expect(inputValue.value).toBe("batman");

        const img = screen.getByRole("img");
        expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
    });
});