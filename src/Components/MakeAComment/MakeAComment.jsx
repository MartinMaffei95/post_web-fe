import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  handleWriteComment,
  makeToast,
} from '../../Redux/actions/postsActions';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getInitPosts } from '../../Redux/actions/postsActions';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import { useNavigate } from 'react-router-dom';
import Post from '../Post/Post';
import Input from '../Input/Input';
import './styles.MakeAComment.css';
import { useRef } from 'react';

const MakeAComment = ({
  actualPost,
  writtingComment,
  handleWrittingComment,
  myUserImage,
  reloadHomePage,
  postInfo,
  profile,
  handleToast,
}) => {
  const [renderpost, setRenderPost] = useState({ postInfo, profile });
  const [isActive, setIsActive] = useState(writtingComment);
  const initialValues = {
    userID: localStorage.getItem('userID'),
    username: localStorage.getItem('username'),
    text: '',
  };
  const navigate = useNavigate();
  const onSubmit = () => {
    fetch(`${process.env.REACT_APP_URI}post/${postInfo?._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        text: values.text,
        author: {
          userID: localStorage.getItem('userID'),
          username: localStorage.getItem('username'),
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'POST_CREATED') {
          reloadHomePage();
          resetForm();
          handleToast('success', 'Tu comentario fue creado!');
          navigate(-1);
        } else {
          alert(data.message);
        }
      });
  };

  const profileImagePost = useRef();
  const profileImageComment = useRef();
  useEffect(() => {
    setIsActive(writtingComment);
    setRenderPost(postInfo);

    document.documentElement.style.setProperty(
      '--lineCommentsHeight',
      `${
        Math.round(
          profileImagePost?.current?.childNodes[0]?.getBoundingClientRect()
            ?.height
        ) || 50
      }px`
    );
  }, [postInfo, writtingComment]);

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
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

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--lineCommentsHeight',
      `${
        Math.round(
          profileImagePost?.current?.childNodes[0]?.getBoundingClientRect()
            ?.height
        ) || 50
      }px`
    );
  }, [
    renderpost,
    profileImagePost?.current?.childNodes[0]?.getBoundingClientRect()?.height,
  ]);
  return (
    //modal?
    <div className={`comment-modal ${isActive ? 'active' : ''}`}>
      {/* Post to make a comment */}
      <div
        className={'writeCommentContainer Posts_Container'}
        ref={profileImagePost}
      >
        <div className={'originalPost'}>
          <Post postData={renderpost} onCommentPage={true} />
        </div>
        {/* space to write a comment */}
        <div className={'Post postBox newComment'} ref={profileImageComment}>
          <ProfileImage src={myUserImage} />
          <form onSubmit={handleSubmit} id={'composePost'}>
            <Input
              // label={'Descripcion'}
              type={'textarea'}
              name={'text'}
              placeholder={'Escribe tu respuesta'}
              value={values?.biography}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  actualPost: state.postReducer.actualPost,
  writtingComment: state.postReducer.writtingComment,
  myUserImage: state.profileReducer.myProfileInformation.image,
});
const mapDispatchToProps = (dispatch) => ({
  handleWrittingComment(state) {
    dispatch(handleWriteComment(state));
  },
  reloadHomePage() {
    dispatch(getInitPosts());
  },
  handleToast(status, msg) {
    dispatch(makeToast(status, msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MakeAComment);
