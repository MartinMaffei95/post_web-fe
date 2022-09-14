import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MakeAComment from '../../../Components/MakeAComment/MakeAComment';
import useFetchPost from '../../../Hooks/useFetchPost';
import useFetchProfile from '../../../Hooks/useFetchProfile';
import ComposeHeader from '../../../Components/ComposeHeader/ComposeHeader';
const NewComment = ({}) => {
  let { postId } = useParams();
  const { post } = useFetchPost(postId);
  const [renderPost, setRenderPost] = useState(post?.post);

  const { profile, loading } = useFetchProfile(post?.post.author?.userID);
  const [renderProfile, setRenderProfile] = useState(profile);

  useEffect(() => {
    setRenderPost(post?.post);
    setRenderProfile(profile);
  }, [post, loading]);

  return (
    <div>
      <ComposeHeader>
        <button className="btn primary" type="submit" form="composePost">
          POSTEAR!
        </button>
      </ComposeHeader>
      <MakeAComment postInfo={renderPost} profile={renderProfile} />
    </div>
  );
};

export default NewComment;
