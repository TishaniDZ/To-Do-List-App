import React, { useContext, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Login = () => {
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const [errorMessage, setErrorMessage] = useState(null); // State to handle login errors
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 relative overflow-hidden">

    
      <div className="relative z-10 bg-white bg-opacity-20 p-10 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
        
        <Formik
          initialValues={{ email: '', password: '' }} // Initial form values
          validationSchema={LoginSchema} // Form validation rules
          onSubmit={async (values, { setSubmitting }) => {
            console.log('Form Values:', values); // Debug: Log form values

            try {
              const success = await login(values.email, values.password); // Await the login function
              console.log('Login Success:', success); // Debug: Log login result

              if (success) {
                setErrorMessage(null); // Clear error if login is successful
                navigate('/todoList'); 
              } else {
                setErrorMessage('Invalid email or password');
              }
            } catch (error) {
              console.error('Login Error:', error); // Debug: Log any errors
              setErrorMessage('An error occurred during login. Please try again.');
            } finally {
              setSubmitting(false); // Set submitting state to false once the process is complete
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-white">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                ) : null}
              </div>

              <div>
                <label className="block text-white">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                ) : null}
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
