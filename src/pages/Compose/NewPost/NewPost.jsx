import React from 'react';
import ComposeHeader from '../../../Components/ComposeHeader/ComposeHeader';
import MakePost from '../../../Components/MakePost/MakePost';
const NewPost = () => {
  return (
    <div>
      <ComposeHeader>
        <button className="btn primary" type="submit" form="composePost">
          POSTEAR!
        </button>
      </ComposeHeader>
      <MakePost />
    </div>
  );
};

export default NewPost;
