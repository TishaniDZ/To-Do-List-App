import React, {} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';   
import { TodoProvider } from './context/TodoContext';   
import Login from './components/Login';   
import Register from './components/Register';   
import TodoList from './components/TodoList'; 

function App() {
  return (
    <AuthProvider>  
      <TodoProvider>  
        <Router>  
          {/* Main container with full screen height and background */}
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 relative overflow-hidden">
            
            {/* Centered box with transparency */}
            <div className="relative z-10 bg-white bg-opacity-20 p-10 rounded-lg shadow-2xl w-full max-w-md">
              
              {/* App Title */}
              <h1 className="text-4xl font-bold text-white text-center mb-8">To-Do List</h1>

              {/* Routes */}
              <Routes> 
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/todoList" element={<TodoList />} />
                <Route path="*" element={<Navigate to="/register" />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;

