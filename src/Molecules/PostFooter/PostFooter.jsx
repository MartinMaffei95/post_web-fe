import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AiFillLike,
  AiOutlineLike,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineStar,
  AiFillStar,
  AiOutlineMore,
  AiOutlineDelete,
} from 'react-icons/ai';
import axios from 'axios';

// REDUX
import { connect } from 'react-redux';
import { getMyProfileData } from '../../Redux/actions/profilesActions';
import {
  makeToast,
  getPostFromHome,
  handleWriteComment,
  loading,
} from '../../Redux/actions/postsActions';
import { useDispatch } from 'react-redux';
import { IS_COMMENT, LOADING } from '../../Redux/actions/actions';

const PostFooter = ({
  postID,
  onCommentPage,
  isPhone,
  likes,
  iLiked,
  comments,
  isOnFavorites,
  renderPost,
  setRenderPost,
  getMyData,

  // REDUX DISPATCH
  makingComment,
  handleModal,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  dispatch(loading(true));
  //   dispatch(loading(false));

  // Functions
  const likePost = () => {
    dispatch(loading(true));
    axios(`${process.env.REACT_APP_URI}post/${postID}/like_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        dispatch(loading(false));
        setRenderPost(res.data.post);
      })
      .catch((err) => {
        dispatch(loading(false));
        alert(err.message);
      });
  };

  const unlikePost = () => {
    dispatch(loading(true));
    axios(`${process.env.REACT_APP_URI}post/${postID}/unlike_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        dispatch(loading(false));
        setRenderPost(res.data.post);
      })
      .catch((err) => {
        dispatch(loading(false));
        alert(err.message);
      });
  };

  const favoritePost = () => {
    dispatch(loading(true));
    axios(`${process.env.REACT_APP_URI}post/${postID}/save_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        dispatch(loading(false));
        getMyData(
          localStorage.getItem('userID'),
          localStorage.getItem('token')
        );
      })
      .catch((err) => {
        dispatch(loading(false));
        alert(err.message);
      });
  };

  const unFavoritePost = () => {
    dispatch(loading(true));
    axios(`${process.env.REACT_APP_URI}post/${postID}/unsave_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        dispatch(loading(false));
        getMyData(
          localStorage.getItem('userID'),
          localStorage.getItem('token')
        );
      })
      .catch((err) => {
        dispatch(loading(false));
        alert(err.message);
      });
  };

  return (
    <>
      {!onCommentPage && (
        <div className="postFooter">
          <ul className="postFooter_list">
            <li>
              {/* if is phone  */}
              {isPhone ? (
                <div
                  className="icon"
                  onClick={() => {
                    navigate(`/compose/${postID}/comment`, {
                      replace: false,
                    });
                  }}
                >
                  <AiOutlineMessage className="messageIcon" />
                </div>
              ) : (
                <div
                  className="icon"
                  onClick={() => {
                    makingComment(renderPost);
                    handleModal();
                  }}
                >
                  <AiOutlineMessage className="messageIcon" />
                </div>
              )}

              <span>{comments ? comments : 0}</span>
            </li>
            <li>
              {iLiked ? (
                <>
                  <div
                    className="icon heart reaction_active heartIcon"
                    onClick={unlikePost}
                  >
                    <AiFillHeart />
                  </div>
                  <span>{likes ? likes : 0}</span>
                </>
              ) : (
                <>
                  <div className="icon heartIcon" onClick={likePost}>
                    <AiOutlineHeart />
                  </div>
                  <span>{likes ? likes : 0}</span>
                </>
              )}
            </li>

            <li>
              {isOnFavorites ? (
                <>
                  <div
                    className="icon star reaction_active"
                    onClick={unFavoritePost}
                  >
                    <AiFillStar className="starIcon " />
                  </div>
                </>
              ) : (
                <>
                  <div className="icon " onClick={favoritePost}>
                    <AiOutlineStar className="starIcon" />
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.profileReducer.myProfileInformation,
});
const mapDispatchToProps = (dispatch) => ({
  makingComment(postData, profile) {
    dispatch(getPostFromHome(postData, profile));
  },
  handleModal() {
    dispatch(handleWriteComment(true, IS_COMMENT));
  },
  handleToast(status, msg) {
    dispatch(makeToast(status, msg));
  },
  getMyData(profileID, token) {
    dispatch(getMyProfileData(profileID, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PostFooter);
