import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples/MultipleCustomHooks"
import { useFetch } from "../../src/Hooks/useFetch"
import { useCounter } from "../../src/Hooks/useCounter";

jest.mock('../../src/Hooks/useFetch'); // Es para simular toda esa funcion
jest.mock('../../src/Hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => {

    const mockIncrement = jest.fn();
    const mockDecrement = jest.fn();

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement,
        decrement: mockDecrement
    });

    beforeEach(() => {
        jest.clearAllMocks()
    });

    const data = {
        name: 'bulbasaur',
        sprites: {
            front_default: 'url-front',
            front_shiny: 'url-front-shiny',
            back_default: 'url-back',
            back_shiny: 'url-back-shiny'
        }
    };

    test('debe de mostrar el componente por defecto', () => {

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        });

        render(<MultipleCustomHooks />);

        expect(screen.getByText('Cargando'));
        expect(screen.getByText('Informacion de Pokemon'));

        // const nextButton = screen.getByRole('button', {name: 'Siguiente'});

        // screen.debug();

    });

    test('debe de mostrar un pokemon', () => {

        useFetch.mockReturnValue({
            data: data,
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);

        expect(screen.getByText(`#1 - ${data.name}`))
        expect(screen.getAllByRole('img').length).toBe(4);


        // screen.debug();

    });

    test('debe de llamar a la funcion de incrementar', () => {

        useFetch.mockReturnValue({
            data: data,
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);
        const nextButton = screen.getByRole('button', { name: 'Siguiente' });

        fireEvent.click(nextButton);

        expect(mockIncrement).toHaveBeenCalled();

    });

    test('debe de llamar la funcion de decrementar si el contador es mayor a 1', () => {
        useCounter.mockReturnValue({
            counter: 5, // tiene que ser > 1 para que entre al if
            increment: mockIncrement,
            decrement: mockDecrement
        });

        useFetch.mockReturnValue({
            data: data,
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);
        const prevButton = screen.getByRole('button', { name: 'Anterior' });

        fireEvent.click(prevButton);

        expect(mockDecrement).toHaveBeenCalled();
    });



})