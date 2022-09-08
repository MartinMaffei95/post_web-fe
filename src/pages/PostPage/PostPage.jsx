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
    console.log(Date.parse(Date()));
  }, [post]);

  return (
    <>
      <Header />
      <MakeAComment />
      <div className="Posts_Container postPage">
        {renderPost?.post && <Post postData={renderPost?.post} />}
      </div>
      <hr />
      {/* Coments */}
      <div>
        {renderPost?.comments?.map((c) => (
          <Post postData={c} key={c?._id} />
        ))}
      </div>
    </>
  );
};

export default PostPage;
