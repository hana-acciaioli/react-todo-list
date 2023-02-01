import { useState, useEffect } from 'react';
import { getTodos } from '../services/todos.js';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(UserContext);
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
  }, [user]);

  return { todos, setTodos };
}
