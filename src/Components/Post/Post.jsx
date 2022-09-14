import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AiFillLike,
  AiOutlineLike,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineMore,
} from 'react-icons/ai';
import useFetchProfile from '../../Hooks/useFetchProfile';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  getPostFromHome,
  handleWriteComment,
  getPostsWithProfile,
} from '../../Redux/actions/postsActions';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import { useResize } from '../../Hooks/useResize';

import './style.Post.css';

const Post = ({
  postData,
  reloadFunction,
  makingComment,
  fetchUserProfile,
}) => {
  const { profile } = useFetchProfile(postData?.author?.userID);
  const navigate = useNavigate();
  const profileName = useRef();
  const postConatiner = useRef();

  const goToProfile = (e) => {
    navigate(`/profile/${e.target.getAttribute('data-user-id')}`, {
      replace: true,
    });
  };
  const goToComment = (e) => {
    navigate(`/compose/${e.target.getAttribute('data-user-id')}/comment`, {
      replace: true,
    });
  };

  const { isPhone } = useResize();
  const [renderPost, setRenderPost] = useState(postData);

  const myID = localStorage.getItem('userID');

  // Functions
  const likePost = () => {
    axios(`http://localhost:4000/post/${renderPost?._id}/like_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => setRenderPost(res.data.post));
  };

  const unlikePost = () => {
    axios(`http://localhost:4000/post/${renderPost?._id}/unlike_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => setRenderPost(res.data.post));
  };

  const deletePost = () => {
    axios(`http://localhost:4000/post/${renderPost?._id}`, {
      method: 'DELETE',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => {
      if (res.data.message === 'POST_DELETED') {
        fetchUserProfile(localStorage.getItem('userID'));
        reloadFunction();
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
    if (date >= 1440) return `Ayer`;
    if (date >= 60) return `${Math.floor(date / 60)} h`;
    if (date > 1) return `${date} m`;
  };

  useEffect(() => {
    setRenderPost(postData);
  }, [postData]);

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
        </span>
      </div>

      <span className="post_timeLast">
        <span>{toMinutes(renderPost?.updatedAt)}</span>

        <div className={`moreOptions_Post`}>
          <span>
            <AiOutlineMore />
          </span>
          <ul className={`contextMenu_Post`}>
            <li>
              <button onClick={deletePost}>ELIMINAR</button>
            </li>
            <li>
              <button
                onClick={() => {
                  console.log('editar');
                }}
              >
                Editar
              </button>
            </li>
          </ul>
        </div>
      </span>
      <p className="post_text">{renderPost?.text}</p>
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
                  className="icon reaction_active heartIcon"
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
            <div className="icon">
              <AiOutlineRetweet className="shareIcon" />
            </div>
            <span>1352</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
});
const mapDispatchToProps = (dispatch) => ({
  makingComment(postData, profile) {
    dispatch(getPostFromHome(postData, profile));
    dispatch(handleWriteComment(true));
  },
  fetchUserProfile(profileID) {
    dispatch(getPostsWithProfile(profileID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
