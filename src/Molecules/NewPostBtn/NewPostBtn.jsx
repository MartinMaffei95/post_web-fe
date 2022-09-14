import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import './styles.NewPostBtn.css';
import { useNavigate, useParams } from 'react-router-dom';

const NewPostBtn = () => {
  const navigate = useNavigate();

  return (
    <div
      className="newPostBtn"
      onClick={() => {
        navigate(`/compose/post`, {
          replace: false,
        });
        // makingComment(postData, profile?.profileData);
      }}
    >
      <BsFillPencilFill />
    </div>
  );
};

export default NewPostBtn;
