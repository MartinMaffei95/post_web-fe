import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AiFillLike,
  AiOutlineLike,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineRetweet,
} from 'react-icons/ai';
import useFetchProfile from '../../Hooks/useFetchProfile';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  getPostFromHome,
  handleWriteComment,
} from '../../Redux/actions/postsActions';

const Post = ({ postData, reloadFunction, makingComment }) => {
  const { profile } = useFetchProfile(postData?.author?.userID);
  const navigate = useNavigate();
  const profileName = useRef();
  const goToProfile = (e) => {
    navigate(`/profile/${e.target.getAttribute('data-user-id')}`, {
      replace: true,
    });
  };

  const [renderPost, setRenderPost] = useState(postData);

  const myID = localStorage.getItem('userID');
  const likePost = () => {
    axios(`http://localhost:4000/post/${renderPost?._id}/like_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        id: myID,
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
      data: {
        id: myID,
      },
    }).then((res) => setRenderPost(res.data.post));
  };

  useEffect(() => {
    setRenderPost(postData);
  }, [postData]);
  return (
    <div className="Post postBox">
      <div className="userImage">
        <img className="userImage_image" src={profile?.profileData?.image} />
      </div>

      <div className="postData">
        <span
          ref={profileName}
          data-user-id={renderPost?.author?.userID}
          className="post_user"
          onClick={goToProfile}
        >
          {renderPost?.author?.username}
        </span>

        <p className="post_text">{renderPost?.text}</p>
        <div className="postFooter">
          <ul className="postFooter_list">
            <li>
              <div
                className="icon"
                onClick={() => {
                  makingComment(postData, profile?.profileData);
                }}
              >
                <AiOutlineMessage />
              </div>
              <span>{renderPost?.comments?.length}</span>
            </li>
            <li>
              {renderPost?.likes?.includes(myID) ? (
                <>
                  <div className="icon reaction_active" onClick={unlikePost}>
                    <AiFillHeart />
                  </div>
                  <span>{renderPost?.likes?.length}</span>
                </>
              ) : (
                <>
                  <div className="icon" onClick={likePost}>
                    <AiOutlineHeart />
                  </div>
                  <span>{renderPost?.likes?.length}</span>
                </>
              )}
            </li>

            <li>
              <div className="icon">
                <AiOutlineRetweet />
              </div>
              <span>1352</span>
            </li>
          </ul>
        </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
