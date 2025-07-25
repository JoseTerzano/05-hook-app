import { render, screen } from "@testing-library/react"
import { TodoApp } from "../../src/08-useReducer/TodoApp"
import { useTodo } from "../../src/Hooks/useTodo"

jest.mock('../../src/Hooks/useTodo');

describe('Pruebas en <TodoApp />', () => {

    useTodo.mockReturnValue({
        todos: [
            {id:1, desc: 'TODO #1', done: false},
            {id:2, desc: 'TODO #2', done: true}
        ], 
        todosCount: 2, 
        pendingTodosCount: 1, 
        handleNewTodo: jest.fn(), 
        handleDeleteTodo: jest.fn(), 
        handleToggleTodo: jest.fn()
    });


    test('debe de mostrar el componente correctamente', () => {

        render( <TodoApp /> );
        // screen.debug();
        expect( screen.getAllByText('TODO #1') ).toBeTruthy();
        expect( screen.getByText('TODO #2') ).toBeTruthy();
        expect( screen.getByRole('textbox') ).toBeTruthy();

        
    });

})