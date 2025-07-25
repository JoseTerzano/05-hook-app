import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe('Pruebas en <TodoItem />', () => {

    const todo = {
        id: 1,
        description: 'Piedra del Alma',
        done: false
    };
    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el Todo pendiente', () => {

        render(<TodoItem todo={todo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />);

        const liElement = screen.getByRole('listitem');
        // console.log('liElement👉', liElement.innerHTML);
        expect(liElement.className).toBe('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span'); // Hay que utilzar "aria-label" en el jsx
        expect(spanElement.className).toContain('align-self-center');
        expect(spanElement.className).not.toContain('text-decoration-line-through');

    });

    test('debe de mostrar el Todo completado', () => {

        todo.done = true;

        render(<TodoItem todo={todo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />);

        const spanElement = screen.getByLabelText('span'); // Hay que utilzar "aria-label" en el jsx
        expect(spanElement.className).toContain('text-decoration-line-through');

    });

    test('span debe de llamar al ToggleTodo cuando se hace click', () => {

        render(<TodoItem todo={todo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />);

        const spanElement = screen.getByLabelText('span'); // Hay que utilzar "aria-label" en el jsx
        fireEvent.click( spanElement );

        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id )

    });

     test('button debe de llamar al DeleteTodo cuando se hace click', () => {

        render(<TodoItem todo={todo} onToggleTodo={onToggleTodoMock} onDeleteTodo={onDeleteTodoMock} />);

        const buttonElement = screen.getByRole('button'); 
        fireEvent.click( buttonElement );

        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id )

    });

})