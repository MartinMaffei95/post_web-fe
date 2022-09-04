import { useEffect, useRef } from 'react';
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

const Post = ({ postData, reloadFunction }) => {
  const { profile } = useFetchProfile(postData?.author?.userID);
  const navigate = useNavigate();
  const profileName = useRef();
  const goToProfile = (e) => {
    navigate(`/profile/${e.target.getAttribute('data-user-id')}`, {
      replace: true,
    });
  };

  const myID = localStorage.getItem('userID');
  const likePost = () => {
    axios(`http://localhost:4000/post/${postData?._id}/like_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        id: myID,
      },
    }).then((res) => reloadFunction());
  };

  const unlikePost = () => {
    axios(`http://localhost:4000/post/${postData?._id}/unlike_post`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        id: myID,
      },
    }).then((res) => reloadFunction());
  };

  useEffect(() => {}, [postData]);

  return (
    <div className="Post postBox">
      <div className="userImage">
        <img className="userImage_image" src={profile?.profileData?.image} />
      </div>

      <div className="postData">
        <span
          ref={profileName}
          data-user-id={postData?.author?.userID}
          className="post_user"
          onClick={goToProfile}
        >
          {postData?.author?.username}
        </span>

        <p className="post_text">{postData?.text}</p>
        <div className="postFooter">
          <ul className="postFooter_list">
            <li>
              <div className="icon">
                <AiOutlineMessage />
              </div>
              <span>1352</span>
            </li>
            <li>
              {postData?.likes?.includes(myID) ? (
                <>
                  <div className="icon reaction_active" onClick={unlikePost}>
                    <AiOutlineHeart />
                  </div>
                  <span>{postData?.likes?.length}</span>
                </>
              ) : (
                <>
                  <div className="icon" onClick={likePost}>
                    <AiOutlineHeart />
                  </div>
                  <span>{postData?.likes?.length}</span>
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

export default Post;
