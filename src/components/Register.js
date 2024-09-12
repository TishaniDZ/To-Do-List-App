import React, { useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Define validation schema
const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 relative overflow-hidden">    
      {/* Centered box with transparency */}
      <div className="relative z-10 bg-white bg-opacity-20 p-10 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>
        
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await register(values.name, values.email, values.password);
              
              alert('Registration Successful');
              
              // Redirect to login page after successful registration
              navigate('/login');
              
            } catch (error) {
              setErrors({ general: error.message }); // Show error message from
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                ) : null}
              </div>
              <div className="mb-6">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                ) : null}
              </div>
              {errors.general && (
                <div className="text-red-500 text-sm mb-4">{errors.general}</div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
