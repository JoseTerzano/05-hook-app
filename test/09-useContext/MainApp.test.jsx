import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { MainApp } from "../../src/09-useContext/MainApp"

describe('Pruebas en <MainApp />', () => {

    test('debe de mostrar el HomePage', () => {

        render(
            <MemoryRouter>
                <MainApp />
            </MemoryRouter>
        );

        expect( screen.getAllByText('HomePage') ).toBeTruthy();

        // screen.debug();

    });

    test('debe de mostrar el loginPage', () => {

        render(
            <MemoryRouter initialEntries={['/login']}>
                <MainApp />
            </MemoryRouter>
        );

        expect( screen.getAllByText('LoginPage') ).toBeTruthy();

        // screen.debug();

    });

     test('debe de mostrar el aboutPage', () => {

        render(
            <MemoryRouter initialEntries={['/about']}>
                <MainApp />
            </MemoryRouter>
        );

        expect( screen.getAllByText('AboutPage') ).toBeTruthy();

        // screen.debug();

    })


})