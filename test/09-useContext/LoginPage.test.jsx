import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { LoginPage } from "../../src/09-useContext/LoginPage";
import { useContext } from "react";


describe('Pruebas en <LoginPage />', () => {


    test('debe de mostrar el componente sin el usuario', () => {

        render(
            <UserContext.Provider value={{ user: null }}>
                <LoginPage />
            </UserContext.Provider>
        ); // Como usa un UserContext hay que utilizarlo para el render

        const preTag = screen.getByLabelText('pre'); // aria-label
        expect(preTag.innerHTML).toBe('null');

        // screen.debug();

    });

    test('debe de llamar al setUser cuando se hace click en el boton', () => {

        const setUserMock = jest.fn();

        render(
            <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        ); // Como usa un UserContext hay que utilizarlo para el render

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect( setUserMock ).toHaveBeenCalledWith( {"email": "pepito123@google.com", "id": 123, "name": "Jose"} )


    });


})