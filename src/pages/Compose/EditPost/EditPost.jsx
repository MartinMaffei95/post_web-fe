import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchPost from '../../../Hooks/useFetchPost';
import useFetchProfile from '../../../Hooks/useFetchProfile';
import ComposeHeader from '../../../Components/ComposeHeader/ComposeHeader';
import MakePost from '../../../Components/MakePost/MakePost';
import Skeleton from 'react-loading-skeleton';
const EditPost = () => {
  let { postId } = useParams();
  const { post } = useFetchPost(postId);
  const [renderPost, setRenderPost] = useState(post?.post?.text);

  useEffect(() => {
    setRenderPost(post?.post?.text);
    console.log(renderPost);
  }, [post]);
  const skeletonEditPost = (
    <div className={'Post postBox gridPost'} style={{ marginBlock: '1rem' }}>
      <Skeleton
        style={{ margin: ' .2rem .5rem' }}
        circle={true}
        width="4rem"
        height="4rem"
      />
      <Skeleton
        style={{ margin: ' .2rem 1rem' }}
        width="70vw"
        height="70vh"
        count={1}
      />
    </div>
  );

  return (
    <div>
      <ComposeHeader>
        <button className="btn primary" type="submit" form="composePost">
          Editar
        </button>
      </ComposeHeader>
      {(renderPost && (
        <MakePost postValue={renderPost} editPost={true} postId={postId} />
      )) ||
        skeletonEditPost}
    </div>
  );
};

export default EditPost;
