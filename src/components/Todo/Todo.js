import React, { useState } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { createTodo, completeTodo, deleteTodo } from '../../services/todos.js';
import Button from '@mui/material/Button';
import { useTodosContext } from '../../context/TodosContext.js';

export default function Todo() {
  const { user } = useContext(UserContext);
  const { todos, setTodos, setCompleted } = useTodosContext();
  const [item, setItem] = useState('');

  const newTodoHandler = async () => {
    try {
      await createTodo(item);
      const newList = [...todos, { item }];
      setTodos(newList);
      setItem('');
    } catch (e) {
      console.error(e.message);
    }
  };
  const completeTodoHandler = async (todo) => {
    try {
      const updatedTodo = await completeTodo(todo);
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) => (prevTodo.id === item.id ? updatedTodo : prevTodo))
      );
      setCompleted(true);
    } catch (e) {
      console.error(e.message);
    }
  };

  const deleteTodoHandler = async (todo) => {
    try {
      const deletedTodo = await deleteTodo(todo);
      setTodos((todos) => todos.filter((prevTodo) => prevTodo.id !== deletedTodo.id));
    } catch (e) {
      console.error(e.message);
    }
  };

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return (
    <>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => completeTodoHandler(todo)}
            />
            {todo.item}
            <Button onClick={() => deleteTodoHandler(todo)}>🗑️</Button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="new item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        ></input>
        <Button className="add-new-todo-button" onClick={newTodoHandler}>
          Add
        </Button>
      </div>
    </>
  );
}
