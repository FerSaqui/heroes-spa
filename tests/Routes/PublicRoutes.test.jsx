import { render, screen } from '@testing-library/react'
import { PublicRoutes } from '../../src/Routes/PublicRoutes';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { PrivateRoutes } from '../../src/Routes/PrivateRoutes';

describe('Pruebas en <PublicRoutes/>', () => {
    test('Debe mostrar el children si no está autenticado', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoutes>
                    <h1>Ruta Pública</h1>
                </PublicRoutes>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Ruta Pública")).toBeTruthy();
    });

    test('Debe de navegar si esta autenticado', () => {
        const contextValue = {
            logged: true
          }
       
          const routesConfig = [
            {
              path: '/login',
              element: (
                <PublicRoutes>
                    <h1>Usuario no logeado</h1>
                </PublicRoutes>
              )
            },
            {
              path: '/marvel',
              element: (
                <PrivateRoutes>
                    <h1>MarvelPage</h1>
                </PrivateRoutes>
              )
            },
          ]
       
          const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/marvel'],
          })
       
          render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
          )
       
          expect(screen.getByText('MarvelPage')).toBeTruthy()
    });
});