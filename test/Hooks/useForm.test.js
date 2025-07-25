import { renderHook } from "@testing-library/react"
import { useForm } from "../../src/Hooks/useForm"
import { act } from "react";

describe('Pruebas en useForm()', () => {

    const initialForm = {
        name: 'Jose',
        email: 'josex@google.com'
    }

    test('debe de regresar los valores por defecto', () => {

        const { result } = renderHook(() => useForm(initialForm));
        // const {  } = result.current
        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any(Function),
            OnResetForm: expect.any(Function)
        });

    });

    test('debe de cambiar el nombre del Form', () => {

        const newValue = 'Juan';

        const { result } = renderHook(() => useForm(initialForm));
        const { onInputChange } = result.current

        act(() => {
            onInputChange({
                target: {
                    name: 'name',
                    value: newValue
                }
            });
        });

        expect(result.current.name).toBe(newValue);
        expect(result.current.formState.name).toBe(newValue);

    });

    test('debe de realizar el Reset del Form', () => {

        const newValue = 'Juan';

        const { result } = renderHook(() => useForm(initialForm));
        const { OnResetForm, onInputChange } = result.current

        act(() => {
            onInputChange({
                target: {
                    name: 'name',
                    value: newValue
                }
            });
            OnResetForm();
        });

        expect(result.current.name).toBe(initialForm.name);
        expect(result.current.formState.name).toBe(initialForm.name);

    });

})