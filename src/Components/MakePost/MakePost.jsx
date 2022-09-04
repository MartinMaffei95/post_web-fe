import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import { connect } from 'react-redux';
import { getInitPosts } from '../../Redux/actions/postsActions';

const MakePost = ({ reloadHomePage }) => {
  const initialValues = {
    username: localStorage.getItem('username'),
    userID: localStorage.getItem('userID'),
    // title: '',
    text: '',
  };

  const onSubmit = () => {
    console.log(values);
    axios(`http://localhost:4000/post/`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        // title: values.title,
        text: values.text,
        author: {
          username: values.username,
          userID: values.userID,
        },
      },
    }).then((res) => {
      resetForm();
      reloadHomePage();
    });
  };

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    // title: Yup.string().required(errorMessages.required),
    text: Yup.string().required(errorMessages.required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = formik;
  return (
    <div className="newPost postBox">
      <h3 className="title"> Escribamos algo!</h3>

      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={values.text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button type="submit">Postear!</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  reloadHomePage() {
    dispatch(getInitPosts());
  },
});
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MakePost);
