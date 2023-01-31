import { useState, useEffect } from 'react';
import { getTodos } from '../services/todos.js';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchTodos();
  }, []);
  return { todos, setTodos };
}
