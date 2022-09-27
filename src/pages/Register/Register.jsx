import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Input from '../../Components/Input/Input';

// SWAL
import Swal from 'sweetalert2';

// LOADING
import { Backdrop, CircularProgress } from '@mui/material';
//REDUX
import { loading } from '../../Redux/actions/profilesActions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const Register = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  //  dispatch(loading(true));
  //  dispatch(loading(false));

  const [isloading, setIsLoading] = useState(false);

  const postLoading = useSelector((state) => state.postReducer.loading);
  const profileLoading = useSelector((state) => state.profileReducer.loading);

  useEffect(() => {
    if (postLoading || profileLoading) return setIsLoading(true);
    if (!postLoading && !profileLoading) return setIsLoading(false);
  }, [postLoading, profileLoading]);

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const onSubmit = () => {
    dispatch(loading(true));
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
        dispatch(loading(false));

        if (data.message === 'USER_CREATED') {
          return navigate('/', { replace: true });
        } else {
          if (data?.errors?.username) {
            switch (data?.errors?.username?.message) {
              case 'TAKEN_USERNAME':
                Swal.fire({
                  title: 'El usuario ya existe',
                  icon: 'error',
                  showCancelButton: true,
                  cancelButtonText: 'Ya tengo usuario',
                  focusConfirm: true,
                  confirmButtonText: 'Reintentar',
                  background: '#fff',
                  customClass: {
                    actions: 'test',
                    cancelButton: 'btn secondary',
                    confirmButton: 'btn primary',
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  if (result.isDismissed) {
                    navigate('/register', { replace: true });
                  }
                });
                break;

              default:
                break;
            }
          }
          if (data?.errors?.email) {
            switch (data?.errors?.email?.message) {
              case 'TAKEN_MAIL':
                Swal.fire({
                  title: 'La direccion de mail ya existe',
                  icon: 'error',
                  showCancelButton: true,
                  cancelButtonText: 'Ya tengo usuario',
                  focusConfirm: true,
                  confirmButtonText: 'Reintentar',
                  background: '#fff',
                  customClass: {
                    actions: 'test',
                    cancelButton: 'btn secondary',
                    confirmButton: 'btn primary',
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  if (result.isDismissed) {
                    navigate('/register', { replace: true });
                  }
                });
                break;

              default:
                break;
            }
          }
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="initialText">
        <h3>Creemos un usuario!</h3>
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
            autoFocus
            inputClassname={`${
              errors.username && touched.username && 'input-error'
            }`}
          />
          {errors.username && touched.username && (
            <span className="error-message">{errors.username}</span>
          )}
          <Input
            label={'Direccion de mail:'}
            type={'email'}
            name={'email'}
            value={values?.email}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassname={`${errors.email && touched.email && 'input-error'}`}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
          <Input
            label={'Contraseña:'}
            type={'password'}
            name={'password'}
            value={values?.password}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassname={`${
              errors.password && touched.password && 'input-error'
            }`}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
          <div className="inputContainer_submit">
            <input
              className="btn primary"
              value={'Quiero registrarme'}
              type="submit"
            />
          </div>
        </form>
        <div className="link">
          <Link to="/login"> Ya tienes un cuenta? Haz click aqui!</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
