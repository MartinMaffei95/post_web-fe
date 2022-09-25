import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { BiEdit } from 'react-icons/bi';

import useFetchProfile from '../../Hooks/useFetchProfile';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  getPostFromHome,
  handleWriteComment,
  getPostsWithProfile,
  makeToast,
} from '../../Redux/actions/postsActions';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import { useResize } from '../../Hooks/useResize';

import './style.Post.css';

// SWAL
import Swal from 'sweetalert2';
import { getMyProfileData } from '../../Redux/actions/profilesActions';

const Post = ({
  postData,
  reloadFunction,
  makingComment,
  fetchUserProfile,
  onPostPage,
  onCommentPage,
  handleToast,
  userData,
  getMyData,
}) => {
  const { profile } = useFetchProfile(postData?.author?.userID);
  const navigate = useNavigate();
  const location = useLocation();
  const profileName = useRef();
  const postConatiner = useRef();
  const moreOption = useRef();
  const moreOption_container = useRef();
  const moreOption_list = useRef();
  const [clickPosition, setClickPosition] = useState({
    top: 0,
    left: 0,
    orientation: 'bottom',
  });

  const goToProfile = (e) => {
    navigate(`/profile/${e.target.getAttribute('data-user-id')}`, {
      replace: true,
    });
  };
  const ToEditPost = (e) => {
    navigate(`/compose/${renderPost?._id}/editPost`, {
      replace: false,
    });
  };

  const { isPhone } = useResize();
  const [renderPost, setRenderPost] = useState(postData);
  const [moreOptActive, setMoreOptActive] = useState(false);
  const myID = localStorage.getItem('userID');

  // Functions
  const likePost = () => {
    axios(`${process.env.REACT_APP_URI}post/${renderPost?._id}/like_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => setRenderPost(res.data.post));
  };

  const unlikePost = () => {
    axios(`${process.env.REACT_APP_URI}post/${renderPost?._id}/unlike_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => setRenderPost(res.data.post));
  };

  const favoritePost = () => {
    axios(`${process.env.REACT_APP_URI}post/${renderPost?._id}/save_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) =>
      getMyData(localStorage.getItem('userID'), localStorage.getItem('token'))
    );
  };

  const unFavoritePost = () => {
    axios(`${process.env.REACT_APP_URI}post/${renderPost?._id}/unsave_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) =>
      getMyData(localStorage.getItem('userID'), localStorage.getItem('token'))
    );
  };

  //SWAL CONFIG

  const deleteBtn = () => {
    Swal.fire({
      title: 'Deseas eliminar el post?',
      showCancelButton: true,
      cancelButtonText: 'Canclear',
      confirmButtonText: 'Eliminar post',
      background: '#fff',
      customClass: {
        actions: 'test',
        cancelButton: 'btn secondary',
        confirmButton: 'btn danger',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost();
      }
    });
  };

  const deletePost = () => {
    console.log(location.pathname);
    axios(`${process.env.REACT_APP_URI}post/${renderPost?._id}`, {
      method: 'DELETE',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => {
      if (res.data.message === 'POST_DELETED') {
        fetchUserProfile(localStorage.getItem('userID'));
        handleToast('success', 'Tu post fue eliminado');
        setMoreOptActive(false);
        if (location?.pathname?.includes('profile'))
          return navigate(`/profile/${myID}`, {
            replace: true,
          });
        else navigate(location);
      }
    });
  };

  const toPost = (e) => {
    let tar = e.target.className;
    if (
      tar.includes('postData') ||
      tar.includes('postBox') ||
      tar.includes('userImage') ||
      tar.includes('post_text')
    ) {
      navigate(`/post/${renderPost?._id}`, { replace: false });
    }
  };

  const toMinutes = (postDate) => {
    let actualDate = new Date();
    //Parsing the dates
    postDate = new Date(postDate);
    actualDate = new Date(actualDate);
    //diferences between
    const diference = actualDate - postDate;
    // returning the diference in minutes
    const x = (actualDate - postDate) / 1000 / 60;
    let date = Math.round(x);
    // RETURN MINUTES or HOURS or DATE
    if (date <= 1) return 'Ahora';
    if (date >= 2880) return `${actualDate.getDate()}-${actualDate.getMonth()}`;
    if (date >= 1440) return `Ayer`;
    if (date >= 60) return `${Math.floor(date / 60)} h`;
    if (date > 1) return `${date} m`;
  };

  useEffect(() => {
    setRenderPost(postData);
  }, [postData, userData]);

  return (
    <div className="Post postBox gridPost" onClick={toPost} ref={postConatiner}>
      <ProfileImage src={profile?.profileData?.image} />
      <div ref={profileName} className="post_user">
        <span
          onClick={goToProfile}
          className="post_user_span"
          data-user-id={renderPost?.author?.userID}
        >
          {renderPost?.author?.username}
          {postData?.createdAt !== postData?.updatedAt && (
            <span className="edited"> · editado</span>
          )}
        </span>
      </div>
      <span className="post_timeLast">
        {onPostPage ? (
          <span>{Date(renderPost?.updatedAt)}</span>
        ) : (
          <span>{toMinutes(renderPost?.updatedAt)}</span>
        )}
      </span>
      <div ref={moreOption} className={`moreOptions_Post`}>
        <div
          className={`backgroundModal ${moreOptActive ? 'active' : ''}`}
          onClick={() => {
            setMoreOptActive(false);
          }}
        ></div>
        <span
          onClick={(e) => {
            setMoreOptActive(true);
          }}
        >
          <AiOutlineMore className={`rotate`} />
        </span>
        <div
          ref={moreOption_container}
          onClick={() => {
            setMoreOptActive(false);
          }}
          className={`contextMenu_Post ${moreOptActive ? 'active' : ''}`}
        >
          <ul
            ref={moreOption_list}
            style={{ top: clickPosition?.top, left: clickPosition?.left }}
          >
            {localStorage.getItem('userID') === postData?.author?.userID ? (
              <>
                <li onClick={deleteBtn}>
                  <AiOutlineDelete />
                  Eliminar post
                </li>
                <li onClick={ToEditPost}>
                  <BiEdit />
                  Editar
                </li>
              </>
            ) : (
              <>
                <li>No me interesa esto</li>
                <li>
                  Dejar de ver publicaciones de: {postData?.author?.username}
                </li>
                <li></li>
              </>
            )}

            <span
              className="btn secondary closeBtn"
              onClick={() => {
                setMoreOptActive(false);
              }}
            >
              X Cancelar
            </span>
          </ul>
        </div>
      </div>
      <pre className="post_text">{renderPost?.text}</pre>
      {!onCommentPage && (
        <div className="postFooter">
          <ul className="postFooter_list">
            <li>
              {/* if is phone  */}
              {isPhone ? (
                <div
                  className="icon"
                  onClick={() => {
                    navigate(`/compose/${renderPost?._id}/comment`, {
                      replace: false,
                    });
                    // makingComment(postData, profile?.profileData);
                  }}
                >
                  <AiOutlineMessage className="messageIcon" />
                </div>
              ) : (
                <div
                  className="icon"
                  onClick={() => {
                    // makingComment(postData, profile?.profileData);
                    console.log('abrir modal');
                  }}
                >
                  <AiOutlineMessage className="messageIcon" />
                </div>
              )}

              <span>
                {renderPost?.repliesLength ? renderPost?.repliesLength : 0}
              </span>
            </li>
            <li>
              {renderPost?.likes?.includes(myID) ? (
                <>
                  <div
                    className="icon heart reaction_active heartIcon"
                    onClick={unlikePost}
                  >
                    <AiFillHeart />
                  </div>
                  <span>{renderPost?.likes?.length}</span>
                </>
              ) : (
                <>
                  <div className="icon heartIcon" onClick={likePost}>
                    <AiOutlineHeart />
                  </div>
                  <span>{renderPost?.likes?.length}</span>
                </>
              )}
            </li>

            <li>
              {userData?.favoritePosts?.includes(renderPost?._id) ? (
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  userData: state.profileReducer.myProfileInformation,
});
const mapDispatchToProps = (dispatch) => ({
  makingComment(postData, profile) {
    dispatch(getPostFromHome(postData, profile));
    dispatch(handleWriteComment(true));
  },
  fetchUserProfile(profileID) {
    dispatch(getPostsWithProfile(profileID));
  },
  handleToast(status, msg) {
    dispatch(makeToast(status, msg));
  },
  getMyData(profileID, token) {
    dispatch(getMyProfileData(profileID, token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
