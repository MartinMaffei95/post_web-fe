import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  let navigate = useNavigate();
  const { REACT_APP_URI } = process.env;

  const onSubmit = () => {
    fetch(`http://localhost:4000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'USER_CREATED') {
          return navigate('/', { replace: true });
        } else {
          // alert(data.)
          console.log(data.errors);
        }
      });
  };

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
    email: Yup.string()
      .email('Debe ser un email valido')
      .required(errorMessages.required),
    password: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;

  return (
    <div>
      <h3>Registro</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.username && touched.username && (
          <span className="error-message">{errors.username}</span>
        )}
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <input type="submit" />
      </form>
      <Link to="/login"> Ya tienes un cuenta?</Link>
    </div>
  );
};

export default Register;
