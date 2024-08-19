import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { Navbar } from "../../../src/ui/components/Navbar"
import { AuthContext } from "../../../src/auth/context/AuthContext"
import { fireEvent, render, screen } from "@testing-library/react"

const mockedUseNavigate = jest.fn()
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))
 
describe('Pruebas en <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: {
        id: 1,
        name: 'Juan Carlos',
    },
    logout: jest.fn(),
  }
 
  const routesConfig = [
    {
      path: '/',
      element: <Navbar />,
    },
    {
      path: '/login',
      element: <h1>Navega a /login</h1>,
    },
  ]
 
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/'],
  })
 
  beforeEach(() => jest.clearAllMocks())
 
  test('debe de mostrar el nombre del usuario', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    )
 
    expect(screen.getByText('Juan Carlos')).toBeTruthy()
  })
 
  test('debe de llamar el logout y navigate cuando se hace clic en el botón', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    )
 
    const logoutBtn = screen.getByRole('button')
    fireEvent.click(logoutBtn)
 
    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})