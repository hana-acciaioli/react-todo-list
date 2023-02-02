import { useState, createContext, useContext, useEffect } from 'react';
import { getTodos } from '../services/todos.js';
import { UserContext } from '../context/UserContext.js';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState(false);

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

  //   useEffect(() => {
  //     const fetchUpdatedTodos = async () => {
  //       try {
  //         const data = await getTodos();
  //         setTodos(data);
  //       } catch (e) {
  //         console.error(e.message);
  //       }
  //     };
  //     fetchUpdatedTodos();
  //   }, [setCompleted]);

  //   return { todos, setTodos };
  return (
    <TodosContext.Provider value={{ todos, setTodos, completed, setCompleted }}>
      {children}
    </TodosContext.Provider>
  );
};
const useTodosContext = () => {
  const context = useContext(TodosContext);

  // setting up a dev error that throws when you try to access UserContext in a component not wrapped in UserProvider
  if (!context) {
    throw new Error('useTaskContext must be wrapped in a TaskProvider');
  }
  return context;
};

export { TodosProvider, useTodosContext };
