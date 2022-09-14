import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

import '../Header/styles.Header.css';

const ComposeHeader = ({ children }) => {
  // Recives in the children button to post a Post or Comment
  const navigate = useNavigate();

  return (
    <header className="header">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <MdArrowBackIosNew />
      </button>
      <div>
        <button className="btn primary" type="submit" form="composePost">
          POSTEAR!
        </button>
      </div>
    </header>
  );
};

export default ComposeHeader;
