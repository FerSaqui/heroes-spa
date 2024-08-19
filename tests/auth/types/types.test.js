import { types } from "../../../src/auth/types/types";

describe('Pruebas en "Types.js"', () => {
    test('Debe de regresar los types del auth', () => {
        expect(types).toEqual({
            login:  "[Auth] Login",
            logout: "[Auth] Logout"
        });
    });
});