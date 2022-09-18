import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { getMyProfileData } from '../../Redux/actions/profilesActions';
import { Helmet } from 'react-helmet';
import Input from '../../Components/Input/Input';
const Login = ({ getMyData }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  let navigate = useNavigate();

  const onSubmit = () => {
    console.log('ok');
    fetch(`${process.env.REACT_APP_URI}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'LOGIN_SUCCESS') {
          localStorage.setItem('token', data?.token);
          localStorage.setItem('username', data?.user?.username);
          localStorage.setItem('userID', data?.user?._id);
          getMyData(data?.user?._id, data?.token);

          return navigate('/', { replace: true });
        } else {
          alert(data.message);
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
        <title>PostWeb | Ingresá</title>
      </Helmet>
      <div className="initialText">
        <h3>Bienvenido!</h3>
        <span>
          Ingresa tus datos y comencemos a <span>escribir!</span>
        </span>
      </div>
      <div className="formContainer">
        <form className="formContainer_form" onSubmit={handleSubmit}>
          <Input
            label={'Nombre de usuario:'}
            type={'text'}
            name={'username'}
            value={values?.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <span className="error-message">{errors.username}</span>
          )}
          <Input
            label={'Contraseña:'}
            type={'password'}
            name={'password'}
            value={values?.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
          <div className="inputContainer_submit">
            <input className="btn primary" value={'Ingresar'} type="submit" />
          </div>
        </form>
        <div className="link">
          <Link to="/register">Aun no tienes cuenta? Registrate!</Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMyData(myProfileID, token) {
    dispatch(getMyProfileData(myProfileID, token));
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
