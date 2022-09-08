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
  const postConatiner = useRef();
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
    postDate = Date.parse(postDate);
    actualDate = Date.parse(actualDate);
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
      <div className="userImage">
        <img className="userImage_image" src={profile?.profileData?.image} />
      </div>
      <div ref={profileName} className="post_user">
        <span
          onClick={goToProfile}
          className="post_user_span"
          data-user-id={renderPost?.author?.userID}
        >
          {renderPost?.author?.username}
        </span>
      </div>
      <span className="post_timeLast">{toMinutes(renderPost?.updatedAt)}</span>
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
              <AiOutlineMessage className="messageIcon" />
            </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
