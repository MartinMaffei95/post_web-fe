import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import MakeAComment from '../../Components/MakeAComment/MakeAComment';
import Post from '../../Components/Post/Post';
import useFetchPost from '../../Hooks/useFetchPost';

const PostPage = () => {
  let { postId } = useParams();
  const { post } = useFetchPost(postId);
  const [renderPost, setRenderPost] = useState();
  useEffect(() => {
    setRenderPost(post);
    console.log(renderPost);
  }, [post]);

  return (
    <>
      <Header />
      <MakeAComment />
      <div className="Posts_Container postPage">
        {renderPost && <Post postData={renderPost} />}
      </div>
      <hr />
      {/* Coments */}
      <div>
        {renderPost?.comments?.map((c) => (
          <Post postData={c} />
          // <div key={c?.comment_id}>
          //   <hr />
          //   <span>{c?.author?.username}</span>
          //   <p>{c?.text}</p>
          // </div>
        ))}
      </div>
    </>
  );
};

export default PostPage;
