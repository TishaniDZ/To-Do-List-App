import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the Todo
const TodoContext = createContext();

// Key for local storage
const LOCAL_STORAGE_KEY = 'todos';

// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
};

// Function to save todos to local storage
const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

// TodoProvider component to provide the context values
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  // Function to add a new todo
  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now(), completed: false }]);
  };

  // Function to edit an existing todo
  const editTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to toggle the completion status of a todo
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodo = () => {
  return useContext(TodoContext);
};

export default TodoContext;

