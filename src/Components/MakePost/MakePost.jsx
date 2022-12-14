import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import { connect } from 'react-redux';
import { getInitPosts, makeToast } from '../../Redux/actions/postsActions';
import { useResize } from '../../Hooks/useResize';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import Input from '../Input/Input';

import { useNavigate } from 'react-router-dom';
import './styles.MakePost.css';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const MakePost = ({
  isModal,
  // THIS IS FOR EDIT A POST
  postValue,
  editPost,
  postId,
  // REDUX
  reloadHomePage,
  myUser,
  handleToast,
}) => {
  const initialValues = {
    username: localStorage.getItem('username'),
    userID: localStorage.getItem('userID'),
    text: postValue || '',
  };

  const navigate = useNavigate();

  const { isPhone } = useResize();

  const onSubmit = () => {
    console.log('asd');

    if (editPost) {
      axios(`${process.env.REACT_APP_URI}post/${postId}`, {
        method: 'PUT',
        headers: {
          contentType: 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
          text: values.text,
        },
      }).then((res) => {
        handleToast('success', 'Tu post fue editado!');
        reloadHomePage();
        resetForm();
        navigate(-1);
      });
    } else {
      axios(`${process.env.REACT_APP_URI}post`, {
        method: 'POST',
        headers: {
          contentType: 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        data: {
          text: values.text,
          author: {
            username: values.username,
            userID: values.userID,
          },
        },
      }).then((res) => {
        handleToast('success', 'Tu post fue creado!');
        reloadHomePage();
        resetForm();
        if (isPhone) navigate(-1);
      });
    }
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
    <div
      className={`${!isPhone ? 'desktopView' : ''} ${
        !isModal ? 'openable' : ''
      }`}
    >
      <ToastContainer autoClose={2000} />
      <div className={`newPost postBox`}>
        <ProfileImage src={myUser?.image} />
        <form onSubmit={handleSubmit} id="composePost">
          <div className="newPostForm">
            <Input
              type={'textarea'}
              name={'text'}
              placeholder={'??Que esta pasando?'}
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus={isPhone && true}
            />
          </div>
          {!isPhone || isModal ? (
            <div className="ComposePost_footer">
              <button className="btn primary" type="submit">
                {editPost ? 'Editar' : 'Postear'}
              </button>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  reloadHomePage() {
    dispatch(getInitPosts());
  },
  handleToast(status, msg) {
    dispatch(makeToast(status, msg));
  },
});
const mapStateToProps = (state) => ({
  myUser: state.profileReducer.myProfileInformation,
});

export default connect(mapStateToProps, mapDispatchToProps)(MakePost);
