import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { handleWriteComment } from '../../Redux/actions/postsActions';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getInitPosts } from '../../Redux/actions/postsActions';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import { useNavigate } from 'react-router-dom';

const MakeAComment = ({
  actualPost,
  writtingComment,
  handleWrittingComment,
  myUserImage,
  reloadHomePage,
  postInfo,
  profile,
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
          resetForm();
          navigate(-1);
        } else {
          alert(data.message);
        }
      });
  };

  useEffect(() => {
    setIsActive(writtingComment);
    setRenderPost(postInfo);
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

  return (
    //modal?
    <div className={`comment-modal ${isActive ? 'active' : ''}`}>
      {/* Post to make a comment */}
      <div className={'writeCommentContainer Posts_Container'}>
        <div className={'Post postBox '}>
          <ProfileImage src={profile?.profileData?.image} />
          <div className="postData">
            <span>{renderpost?.author?.username}</span>
            <p className="post_text">{renderpost?.text}</p>
          </div>
        </div>
        <hr />

        {/* space to write a comment */}

        <div className={'Post postBox '}>
          <div className="userImage">
            <img className="userImage_image" src={myUserImage} />
          </div>
          <form onSubmit={handleSubmit} id={'composePost'}>
            <textarea
              name="text"
              className="yourComment"
              placeholder="Escribe tu comentario aqui..."
              value={values.text}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MakeAComment);
