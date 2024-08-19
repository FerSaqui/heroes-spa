import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer.js', () => {
    test('Debe de retornar el estado por defecto', () => {
        const action = {};

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ logged: false });
    });

    test('Debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: "Fernando Santiago Quijano"
        }

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ logged: true, user: action.payload });
    });

    test('Debe de (logout) borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout
        }

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ logged: false });
    });
});