import React, { useState } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { useTodos } from '../../hooks/useTodos.js';
import { createTodo } from '../../services/todos.js';

export default function Todo() {
  const { user } = useContext(UserContext);
  const { todos, setTodos } = useTodos();
  const [item, setItem] = useState('');

  const newTodoHandler = async () => {
    try {
      await createTodo(item);
      setTodos((oldList) => [...oldList, { item }]);
      setItem('');
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
            <input type="checkbox" checked={todo.complete} />
            {todo.item}
            {todo.id}
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
        <button className="add-new-todo-button" onClick={newTodoHandler}>
          Add
        </button>
      </div>
    </>
  );
}
