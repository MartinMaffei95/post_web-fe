import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  let navigate = useNavigate();

  const onSubmit = () => {
    fetch(`${process.env.REACT_APP_URI}auth/register`, {
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
    <div className="loginPage">
      <Helmet>
        <title>PostWeb | Registro</title>
      </Helmet>
      <h3>Registro</h3>
      <div className="formContainer">
        <form className="formContainer_form" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>Nombre de usuario:</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.username && touched.username && (
            <span className="error-message">{errors.username}</span>
          )}
          <div className="inputContainer">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
          <div className="inputContainer">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
          <input type="submit" />
        </form>
        <Link to="/login"> Ya tienes un cuenta?</Link>
      </div>
    </div>
  );
};

export default Register;
