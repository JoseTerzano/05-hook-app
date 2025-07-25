import { renderHook } from "@testing-library/react";
import { useCounter } from "../../src/Hooks/useCounter";
import { act } from "react";

describe('Pruebas en useCounter()', () => {

    test('debe de retornar los valores por defecto', () => {

        const { result } = renderHook(() => useCounter());
        const { counter, increment, decrement, reset } = result.current;

        expect(counter).toBe(10);
        expect(decrement).toEqual(expect.any(Function));
        expect(increment).toEqual(expect.any(Function));
        expect(reset).toEqual(expect.any(Function));

    });

    test('debe de generar el counter con el valor de 100', () => {

        const { result } = renderHook(() => useCounter(100));
        const { counter } = result.current;
        expect(counter).toBe(100);

    });

    test('debe de incrementar el contador', () => {

        const { result } = renderHook(() => useCounter());
        const { counter, increment } = result.current;

        act(() => {
            increment();
        });

        expect(result.current.counter).toBe(11);
        // expect(counter).toBe(11); No funciona porque se extrae y se queda con el valor inicial de arriba

    });

    test('debe de decrementar el contador', () => {

        const { result } = renderHook(() => useCounter());
        const { decrement } = result.current;

        act(() => {
            decrement();
        });

        expect(result.current.counter).toBe(9);

    });

    test('debe de resetear el contador', () => {

        const { result } = renderHook(() => useCounter());
        const { reset, decrement } = result.current;

        act(() => {
            decrement();
            reset();
        });

        expect(result.current.counter).toBe(10);

    });


})