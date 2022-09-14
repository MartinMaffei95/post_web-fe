import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import { connect } from 'react-redux';
import { getInitPosts } from '../../Redux/actions/postsActions';
import { useResize } from '../../Hooks/useResize';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import Input from '../Input/Input';

import { useNavigate } from 'react-router-dom';

const MakePost = ({ reloadHomePage, myUser }) => {
  const initialValues = {
    username: localStorage.getItem('username'),
    userID: localStorage.getItem('userID'),
    // title: '',
    text: '',
  };
  const navigate = useNavigate();

  const { isPhone } = useResize();

  const onSubmit = () => {
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
      navigate(-1);
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
    <div>
      <div className="newPost postBox">
        <ProfileImage src={myUser?.image} />
        <form onSubmit={handleSubmit} id="composePost">
          <div className="newPostForm">
            <Input
              type={'textarea'}
              name={'text'}
              placeholder={'¿Que esta pasando?'}
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  reloadHomePage() {
    dispatch(getInitPosts());
  },
});
const mapStateToProps = (state) => ({
  myUser: state.profileReducer.myProfileInformation,
});

export default connect(mapStateToProps, mapDispatchToProps)(MakePost);
