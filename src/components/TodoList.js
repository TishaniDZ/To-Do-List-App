import React, { useState, useContext } from 'react';
import TodoContext from '../context/TodoContext';

// AddTodo Component for adding new todos
const AddTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addTodo({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Todo
      </button>
    </form>
  );
};

// EditTodo Component for editing existing todos
const EditTodo = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSave = () => {
    onSave({ ...todo, title, description });
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
        Save
      </button>
      <button onClick={onCancel} className="bg-gray-500 text-white p-2 rounded ml-2">
        Cancel
      </button>
    </div>
  );
};

// Main TodoList Component
const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = (updatedTodo) => {
    editTodo(updatedTodo);
    setEditingTodo(null);
  };

  return (
    <div>
      <AddTodo />
      {editingTodo ? (
        <EditTodo
          todo={editingTodo}
          onSave={handleSaveEdit}
          onCancel={() => setEditingTodo(null)}
        />
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="mb-4 p-4 border border-gray-200 rounded">
              <h3 className="text-xl font-bold">{todo.title}</h3>
              <p>{todo.description}</p>
              <button onClick={() => toggleTodo(todo.id)} className="bg-blue-500 text-white p-2 rounded mr-2">
                {todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
              </button>
              <button onClick={() => handleEdit(todo)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                Edit
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white p-2 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
